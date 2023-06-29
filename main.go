package main

import (
	"database/sql"
	_ "github.com/mattn/go-sqlite3"
	"html/template"
	"log"
	"net/http"
	"net/smtp"
)

type application struct {
	DB       *sql.DB
	Template *template.Template
}

func main() {
	// Opening a database
	log.Println("opening database")
	db, err := sql.Open("sqlite3", "./db/db.sqlite.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	log.Println("database opened successfully")

	// Parsing a template of the main landing page
	template, err := template.ParseFiles("./index-kz.html", "index-ru.html")
	if err != nil {
		log.Fatal(err)
	}

	// Making an app struct for handlers and the main server
	app := application{DB: db, Template: template}
	mux := http.NewServeMux()

	// Serving static files (CSS, JS)
	staticFileServer := http.FileServer(http.Dir("./static/"))

	// Handling routes
	mux.Handle("/static/", http.StripPrefix("/static", staticFileServer))
	mux.HandleFunc("/", app.home)
	mux.HandleFunc("/kz", app.serveKZ)
	mux.HandleFunc("/ru", app.serveRU)

	// Starting a server
	log.Println("starting server at port:4000")
	err = http.ListenAndServe(":4000", mux)
	log.Fatal(err)
}

func (app *application) home(w http.ResponseWriter, r *http.Request) {
	http.Redirect(w, r, "/kz", http.StatusSeeOther)
}

// Main handler which manages the landing page and its form (russian version)
func (app *application) serveRU(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		app.Template.ExecuteTemplate(w, "index-ru.html", nil)
	case "POST":
		err := r.ParseForm()
		name := r.FormValue("name")
		phone_num := r.FormValue("phone_num")

		cmd := `insert into responses(name, phone_number) values(?, ?);`
		_, err = app.DB.Exec(cmd, name, phone_num)
		ErrorCheck(w, err)
		sendEmail("Subject:" + name + " " + phone_num)

		log.Println("record added")
		http.Redirect(w, r, "/ru#sec-7", http.StatusSeeOther)
	}

}

// Main handler which manages the landing page and its form (kazakh version)
func (app *application) serveKZ(w http.ResponseWriter, r *http.Request) {

	switch r.Method {
	case "GET":
		app.Template.ExecuteTemplate(w, "index-kz.html", nil)
	case "POST":
		err := r.ParseForm()
		name := r.FormValue("name")
		phone_num := r.FormValue("phone_num")

		cmd := `insert into responses(name, phone_number) values(?, ?);`
		_, err = app.DB.Exec(cmd, name, phone_num)
		ErrorCheck(w, err)
		sendEmail("Subject:" + name + " " + phone_num)

		log.Println("record added")
		http.Redirect(w, r, "/kz#sec-7", http.StatusSeeOther)
	}

}

func sendEmail(message string) {
	auth := smtp.PlainAuth("", "galamat.del@gmail.com", "pleqqpxjgmxmvrvu", "smtp.gmail.com")
	ms := []byte(message)
	// var email []string = []string{"delconstruction.ala@gmail.com"}
	err := smtp.SendMail("smtp.gmail.com:587", auth, "galamat.del@gmail.com", []string{"maksatlego@gmail.com"}, ms)
	if err != nil {
		log.Fatal(err)
	}
}

// Checking for errors just in case
func ErrorCheck(w http.ResponseWriter, err error) {
	if err != nil {
		log.Println(err.Error())
		http.Error(w, "Internal Server error", 500)
	}
}
