package main

import (
	// "fmt"
	"html/template"
	"log"
	"net/http"
)

func main() {
	mux := http.NewServeMux()

	staticFileServer := http.FileServer(http.Dir("./static/"))

	mux.Handle("/static/", http.StripPrefix("/static", staticFileServer))
	mux.HandleFunc("/", serve)

	log.Println("starting server at port:4000")
	err := http.ListenAndServe(":4000", mux)
	log.Fatal(err)
}

func serve(w http.ResponseWriter, r *http.Request) {
	template, err := template.ParseFiles("./index.html")
	ErrorCheck(w, err)

	err = r.ParseForm()
	ErrorCheck(w, err)

	// name := r.FormValue("name")
	// email := r.FormValue("email")

	err = template.Execute(w, r)
	ErrorCheck(w, err)
}

func ErrorCheck(w http.ResponseWriter, err error) {
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server error", 500)
	}
}
