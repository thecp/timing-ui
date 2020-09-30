package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/jmoiron/sqlx"
	"github.com/thecp/timing-api/storage"
)

var timer *time.Duration = nil
var quitTimer chan struct{} = nil
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
	r.HandleFunc("/stop-timer", stopTimer)
	r.HandleFunc("/get-blocks", getBlocks)
	r.HandleFunc("/start-block/{id:[0-9]+}", startBlock)
	r.HandleFunc("/top-finishers", topFinishers)
	r.HandleFunc("/last-finishers", lastFinishers)
	r.HandleFunc("/set-finisher-time", setTime)

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
		offset += storage.FromTime(params[0])
	}

	if err := beginTimer(offset); err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	w.WriteHeader(204)
}

func stopTimer(w http.ResponseWriter, r *http.Request) {
	if quitTimer != nil {
		quitTimer <- struct{}{}
	}
	w.WriteHeader(204)
}

func getBlocks(w http.ResponseWriter, r *http.Request) {
	blocks, err := storage.GetBlocks(db)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	decoder := json.NewEncoder(w)
	decoder.Encode(blocks)
}

func startBlock(w http.ResponseWriter, r *http.Request) {
	if timer == nil {
		w.WriteHeader(500)
		w.Write([]byte(`"Timer nicht gestartet"`))
		return
	}

	vars := mux.Vars(r)
	id, ok := vars["id"]
	if !ok {
		w.WriteHeader(500)
		w.Write([]byte(`"Block ID nicht angegeben"`))
		return
	}

	if err := storage.StartBlock(db, id, timer); err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	w.WriteHeader(204)
}

func topFinishers(w http.ResponseWriter, r *http.Request) {
	resultMap, err := storage.TopFinishers(db)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	decoder := json.NewEncoder(w)
	decoder.Encode(resultMap)
}

func lastFinishers(w http.ResponseWriter, r *http.Request) {
	finishers, err := storage.LastFinishers(db)
	if err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	decoder := json.NewEncoder(w)
	decoder.Encode(finishers)
}

func setTime(w http.ResponseWriter, r *http.Request) {
	stnoParams := r.URL.Query()["stno"]
	if len(stnoParams) == 0 {
		w.WriteHeader(500)
		w.Write([]byte(`"Startnummer vergessen"`))
		return
	}

	timeParams := r.URL.Query()["time"]
	if len(timeParams) == 0 {
		w.WriteHeader(500)
		w.Write([]byte(`"Zeit vergessen"`))
		return
	}

	if err := storage.SetTime(db, timeParams[0], stnoParams[0]); err != nil {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf(`"%s"`, err)))
		return
	}

	w.WriteHeader(204)
}

func beginTimer(offset time.Duration) error {
	if timer != nil {
		// already started
		return nil
	}

	timer = &offset

	ticker := time.NewTicker(1 * time.Second)
	quitTimer = make(chan struct{})

	go func() {
		for {
			select {
			case <-ticker.C:
				(*timer) += time.Second
				pushTime(*timer)
			case <-quitTimer:
				timer = nil
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

	t := storage.CurrentTime(d)

	if err := wsConn.WriteMessage(1, []byte(t)); err != nil {
		fmt.Println(err)
	}
}
