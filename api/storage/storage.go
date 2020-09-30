package storage

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/jmoiron/sqlx"
)

type Starter struct {
	LastName  string `json:"lastname" db:"lastname"`
	FirstName string `json:"firstname" db:"firstname"`
	Stno      string `json:"stno" db:"stno"`
}

type Block struct {
	ID        int64     `json:"id" db:"id"`
	StartTime string    `json:"startTime" db:"startTime"`
	Starters  []Starter `json:"starters" db:"-"`
}

type Result struct {
	LastName  string `json:"lastname" db:"lastname"`
	FirstName string `json:"firstname" db:"firstname"`
	Netto     string `json:"netto" db:"netto"`
	Stno      string `json:"stno" db:"stno"`
}

func GetBlocks(db *sqlx.DB) ([]Block, error) {
	blocks := []Block{}
	if err := db.Select(&blocks, "SELECT id, startTime FROM blocks WHERE started=0 ORDER BY startTime ASC LIMIT 3"); err != nil {
		return nil, err
	}

	for i := range blocks {
		starters := []Starter{}
		if err := db.Select(&starters, "SELECT lastname, firstname, stno FROM starters WHERE block = ?", blocks[i].ID); err != nil {
			return nil, err
		}
		blocks[i].Starters = starters
	}

	return blocks, nil
}

func StartBlock(db *sqlx.DB, id string, timer *time.Duration) error {
	if _, err := db.Exec("UPDATE starters SET startTime := ? WHERE block = ?", CurrentTime(*timer), id); err != nil {
		return err
	}

	_, err := db.Exec("UPDATE blocks started=true WHERE id = ?", id)
	return err
}

func TopFinishers(db *sqlx.DB) (map[string]map[string][]Result, error) {
	tracks := []string{"21km", "11km", "7km"}
	genders := []string{"W", "M"}

	resultMap := make(map[string]map[string][]Result)

	for i := range tracks {
		resultMap[tracks[i]] = make(map[string][]Result)
		for j := range genders {
			results := make([]Result, 0, 3)
			if err := db.Select(
				&results,
				"SELECT lastname, firstname, netto FROM starters WHERE netto IS NOT NULL AND track=? AND sex=? ORDER BY netto ASC LIMIT 3",
				tracks[i],
				genders[j],
			); err != nil {
				return nil, err
			}
			resultMap[tracks[i]][genders[j]] = results
		}
	}

	return resultMap, nil
}

func LastFinishers(db *sqlx.DB) ([]Result, error) {
	results := make([]Result, 0, 10)

	if err := db.Select(
		&results,
		"SELECT lastname, firstname, netto, stno FROM starters WHERE netto IS NOT NULL ORDER BY updateTime DESC LIMIT 10",
	); err != nil {
		return nil, err
	}

	return results, nil
}

func SetTime(db *sqlx.DB, strTime string, stno string) error {
	t := CurrentTime(FromTime(strTime))

	if _, err := db.Exec(
		"UPDATE starters SET endTime = ?, netto = SEC_TO_TIME(TIME_TO_SEC(?)-TIME_TO_SEC(startTime)), updateTime = CURRENT_TIMESTAMP WHERE stno = ?",
		t, t, stno,
	); err != nil {
		return err
	}

	return nil
}

func CurrentTime(d time.Duration) string {
	d = d.Round(time.Second)
	h := d / time.Hour
	d -= h * time.Hour
	m := d / time.Minute
	d -= m * time.Minute
	s := d / time.Second

	return fmt.Sprintf(`"%02d:%02d:%02d"`, h, m, s)
}

func FromTime(str string) time.Duration {
	t := strings.Split(str, ":")
	h, _ := strconv.Atoi(t[0])
	m, _ := strconv.Atoi(t[1])
	s, _ := strconv.Atoi(t[2])

	return (time.Duration(h) * time.Hour) + (time.Duration(m) * time.Minute) + (time.Duration(s) * time.Second)
}
