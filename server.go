package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	PORT := ":3000"
	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	dist := fmt.Sprintf("%s/client/dist/client", dir)
	http.Handle("/", http.FileServer(http.Dir(dist)))
	log.Println("listening on port", PORT)
	log.Fatal(http.ListenAndServe(PORT, nil))
}
