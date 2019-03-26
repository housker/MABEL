package api

import (
	"fmt"
	"log"
	"net/http"
	"payment/serviceprovider"

	"github.com/gorilla/mux"
)

type API struct {
	W serviceprovider.Service
}

func (a API) setRoutes() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	fs := http.FileServer(http.Dir("client"))

	router.HandleFunc("/getItems", a.getItems).Methods("GET")
	// router.HandleFunc("addItems/{name}/{price}/{imageURI}", a.addItems).Methods("POST")
	router.HandleFunc("/addItems", a.addItems).Methods("POST")

	log.Fatal(http.ListenAndServe(":8080", router))
	return router

}

func getItems() {
	fmt.Println("getItems is being called")

}

func addItem(w http.ResponseWriter, r *http.Request) {
	fmt.Println("addItem is being called")
	body := mux.Body(r)
	fmt.Println(body)

}

func addSupplier() {

}

func addBuyer() {

}

func removeItem() {

}
