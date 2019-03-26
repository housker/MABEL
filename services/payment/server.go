package main

import (
	"fmt"
	"payment/api"
	"payment/serviceprovider"
)

func main() {
	fmt.Println("pacakge main is being called!")
	w := serviceprovider.Service(x)
	a := api.API{W: w}
}
