package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/jmoiron/sqlx"
)

type StartTime struct {
	ID        int64  `json:"id" db:"id"`
	StartTime string `json:"startTime" db:"startTime"`
	Started   bool   `json:"started" db:"started"`
}

var timer *time.Duration = nil
var db *sqlx.DB
var wsConn *websocket.Conn

func main() {
	var err error
	db, err = sqlx.Open("mysql", "golang:gnalog@/geiseltalseelauf")
	if err != nil {
		panic(err)
	}

	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)

	r := mux.NewRouter()
	r.HandleFunc("/start-timer", startTimer)
	r.HandleFunc("/start-block", startBlock)
	r.HandleFunc("/get-block", getBlock)
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Add("Access-Control-Allow-Origin", "*")
			next.ServeHTTP(w, r)
		})
	})

	http.Handle("/", r)

	http.HandleFunc("/time", func(w http.ResponseWriter, r *http.Request) {
		var err error

		var upgrader = websocket.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		}

		wsConn, err = upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}
	})

	http.ListenAndServe(":8081", nil)
}

func startTimer(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()["offset"]
	var offset time.Duration
	if len(params) > 0 {
		t := strings.Split(params[0], ":")
		h, _ := strconv.Atoi(t[0])
		m, _ := strconv.Atoi(t[1])
		s, _ := strconv.Atoi(t[2])
		offset += (time.Duration(h) * time.Hour) + (time.Duration(m) * time.Minute) + (time.Duration(s) * time.Second)
	}

	beginTimer(offset)
	w.Write([]byte(string(offset)))
}

func getBlock(w http.ResponseWriter, r *http.Request) {
	startTimes := []StartTime{}
	if err := db.Select(&startTimes, "SELECT id, startTime, started FROM blocks"); err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"Hat nicht funktioniert: %s"`, err)))
	}

	decoder := json.NewEncoder(w)
	decoder.Encode(startTimes)
}

func startBlock(w http.ResponseWriter, r *http.Request) {
	params := r.URL.Query()["start-time"]
	if len(params) < 1 {
		w.Write([]byte(`"Startzeit nicht angegeben"`))
		w.WriteHeader(500)
		return
	}

	if _, err := db.Exec("UPDATE starters SET startTime := ?", params[0]); err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"Hat nicht funktioniert: %s"`, err)))
		return
	}

	w.Write([]byte(""))
}

func beginTimer(offset time.Duration) error {
	if timer != nil {
		// already started
		return nil
	}

	timer = &offset

	ticker := time.NewTicker(1 * time.Second)
	quit := make(chan struct{})
	go func() {
		for {
			select {
			case <-ticker.C:
				(*timer) += time.Second
				pushTime(*timer)
			case <-quit:
				ticker.Stop()
				return
			}
		}
	}()

	return nil
}

func pushTime(d time.Duration) {
	if wsConn == nil {
		return
	}

	d = d.Round(time.Second)
	h := d / time.Hour
	d -= h * time.Hour
	m := d / time.Minute
	d -= m * time.Minute
	s := d / time.Second

	t := fmt.Sprintf(`"%02d:%02d:%02d"`, h, m, s)
	if err := wsConn.WriteMessage(1, []byte(t)); err != nil {
		fmt.Println(err)
	}
}
