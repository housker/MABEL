package main

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type LIMI_ORDER struct {
	id SERIAL PRIMARY KEY,
	bid_ask:
	user_id INTEGER REFERENCES users(id),
	product_id INTEGER REFERENCES products(id),
	price MONEY,
	unit VARCHAR(50),
	quantity INTEGER,
	date DATE
}

func main() {
	connection := connectx()
	fmt.Println(connection)
	// insertWord(connection, "first", 50)
	insertWordUDF(connection, "first", 50)
}

func connectx() *sqlx.DB {
	var myEnv map[string]string
	myEnv, err := godotenv.Read("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	host := myEnv["DB_HOST"]
	dbname := myEnv["DB_NAME"]
	t := "postgresql://%s/%s?sslmode=disable"
	connectionString := fmt.Sprintf(t, host, dbname)
	db := sqlx.MustConnect("postgres", connectionString)
	return db
}

func selectBid(db *sqlx.DB, word string, number int) Row {
	statement := `SELECT * FROM bids`
	fmt.Println(statement)
	return db.MustExec(statement, word, number)

}

func selectAsk(db *sqlx.DB, word string, number int) {
	statement := `INSERT INTO practice (word, number) VALUES ($1, $2)`
	fmt.Println(statement)
	db.MustExec(statement, word, number)
}

func insertWord(db *sqlx.DB, word string, number int) {
	statement := `INSERT INTO practice (word, number) VALUES ($1, $2)`
	fmt.Println(statement)
	db.MustExec(statement, word, number)
}

func insertWordUDF(db *sqlx.DB, word string, number int) {

	statement := `SELECT insertWord($1, $2)`
	fmt.Println(statement)
	db.MustExec(statement, word, number)
}
