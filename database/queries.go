package main

import (
	"fmt"
	"log"

	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

type Place struct {
	Schemaname string
	Tablename  string
	Tableowner string
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

// func insertSupplier(db *sqlx.DB) {
// 	geniuses := []Genius{}
// 	PERFORM create_mv('cs_session_page_requests_mv', my_query);
//     db.Select(&geniuses, "SELECT name, iq FROM genius WHERE nationality='English'")

//     for _, g := range geniuses {
//         fmt.Println("name:", g.Name, "IQ:", g.IQ)
//     }
// }

// type Genius struct {
//     Name        string `db:"name"`
//     IQ          int    `db:"iq"`
//     Nationality string `db:"nationality"`
// }

// func insertSupplier() {
// 	id SERIAL PRIMARY KEY,
// 	name VARCHAR(50) NOT NULL,
// 	address VARCHAR(50) NOT NULL,
// 	lat NUMERIC(8, 5),
// 	lng NUMERIC(8, 5)
// }

// db.MustExec("SELECT * FROM pg_catalog.pg_tables WHERE tableowner='adellehousker';")
// rows, err := db.Queryx("SELECT schemaname, tablename, tableowner FROM pg_catalog.pg_tables WHERE tableowner='adellehousker';")
// if err != nil {
// 	fmt.Println("PROBLEM!")
// 	log.Fatalln(err)
// }
// place := Place{}
// for rows.Next() {
// 	err := rows.StructScan(&place)
// 	if err != nil {
// 		log.Fatalln(err)
// 	}
// 	fmt.Printf("%#v\n", place)
// }
// fmt.Println(rows)
// return db
