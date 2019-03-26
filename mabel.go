package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/jmoiron/sqlx"
	"github.com/joho/godotenv"
	"github.com/lib/pq"
	_ "github.com/lib/pq"
	"github.com/microcosm-cc/bluemonday"
	"golang.org/x/crypto/bcrypt"
)

type Pathroot struct {
	Dir   string
	Bm    bluemonday.Policy
	Store sessions.CookieStore
	Skey  string
	Db    Db
}

type Db struct {
	host   string
	user   string
	dbname string
}

type Condition struct {
	code pq.ErrorCode
}

type RouteService interface {
	SignupHandler(http.ResponseWriter, *http.Request)
	SignupPostHandler(http.ResponseWriter, *http.Request)
	LoginHandler(http.ResponseWriter, *http.Request)
	LoginPostHandler(http.ResponseWriter, *http.Request)
}

type User struct {
	Email    string
	Password string
}

type NewUser struct {
	FirstName       string `db:"firstname"`
	LastName        string `db:"lastname"`
	BusinessName    string `db:"businessname"`
	BusinessAddress string `db:"businessaddress"`
	BusinessCity    string `db:"businesscity"`
	Email           string `db:"email"`
	PwdHash         string `db:"pwdhash"`
}

// id UUID PRIMARY KEY,
// firstname VARCHAR(50) NOT NULL,
// lastname VARCHAR(50) NOT NULL,
// businessname VARCHAR(50) NOT NULL,
// businessaddress VARCHAR(50) NOT NULL,
// businesscity VARCHAR(50) NOT NULL,
// lat NUMERIC(8, 5),
// lng NUMERIC(8, 5),
// email VARCHAR(50) NOT NULL,
// pwdhash VARCHAR(50) NOT NULL

// key := []byte("super-secret-key")
// store := sessions.NewCookieStore(key)

// func init() {
// 	loggedUserSession.Options = &sessions.Options{
// 		Domain:   "localhost",
// 		Path:     "/",
// 		MaxAge:   3600 * 3, // 3 hours
// 		HttpOnly: true,
// 	}
// }

// func login(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")

// 	// Authentication goes here
// 	// ...

// 	// Set user as authenticated
// 	session.Values["authenticated"] = true
// 	session.Save(r, w)
// }

// func logout(w http.ResponseWriter, r *http.Request) {
// 	session, _ := store.Get(r, "cookie-name")

// 	// Revoke users authentication
// 	session.Values["authenticated"] = false
// 	session.Save(r, w)
// }

// type authenticationMiddleware struct {
// 	tokenUsers map[string]string
// }

// func (amw *authenticationMiddleware) Populate() {
// 	amw.tokenUsers["00000000"] = "user0"
// 	amw.tokenUsers["aaaaaaaa"] = "userA"
// 	amw.tokenUsers["05f717e5"] = "randomUser"
// 	amw.tokenUsers["deadbeef"] = "user0"
// }

// func (amw *authenticationMiddleware) Middleware(next http.Handler) http.Handler {
// 	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
// 		token := r.Header.Get("X-Session-Token")

// 		session, err := loggedUserSession.Get(r, "authenticated-user-session")

// 		if user, found := amw.tokenUsers[token]; found {
// 			// We found the token in our map
// 			log.Printf("Authenticated user %s\n", user)
// 			// Pass down the request to the next middleware (or final handler)
// 			next.ServeHTTP(w, r)
// 		} else {
// 			// Write an error and stop the handler chain
// 			http.Error(w, "Forbidden", http.StatusForbidden)
// 		}
// 	})
// }

func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}

func redirect(w http.ResponseWriter, r *http.Request) {
	// proto := r.Header.Get("x-forwarded-proto")
	// if proto == "http" || proto == "HTTP" {
	target := "https://" + r.Host + r.URL.Path
	if len(r.URL.RawQuery) > 0 {
		target += "?" + r.URL.RawQuery
	}
	// http.Redirect(w, r, target, http.StatusTemporaryRedirect)
	// fmt.Println("inside redirect")
	http.Redirect(w, r, target, http.StatusMovedPermanently)
	// } else {
	// 	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	// 	dist := fmt.Sprintf("%s/client/dist/client", dir)
	// 	http.FileServer(http.Dir(dist))
	// }
}

func middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		proto := r.Header.Get("x-forwarded-proto")
		if proto == "http" || proto == "HTTP" {
			target := "https://" + r.Host + r.URL.Path
			if len(r.URL.RawQuery) > 0 {
				target += "?" + r.URL.RawQuery
			}
			http.Redirect(w, r, target, http.StatusMovedPermanently)
		}

		log.Println("Executing middlewareTwo")
		if r.URL.Path != "/" {
			return
		}
		next.ServeHTTP(w, r)
		log.Println("Executing middlewareTwo again")

	})
}

func setService() Pathroot {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	db := Db{host: os.Getenv("DB_HOST"), user: os.Getenv("DB_USER"), dbname: os.Getenv("DB_NAME")}
	sessionKey := os.Getenv("SESSION_KEY")
	var store = sessions.NewCookieStore([]byte(sessionKey))
	// s := r.PathPrefix("/static/").Subrouter()
	dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	policy := bluemonday.StrictPolicy()
	p := Pathroot{Dir: dir, Bm: *policy, Store: *store, Skey: sessionKey, Db: db}
	return p
}

func connect(h RouteService, dir string) {
	port := 80
	portSSL := 443
	r := mux.NewRouter()
	dist := fmt.Sprintf("%s/client/dist/client", dir)
	// s.HandleFunc("/", http.FileServer(http.Dir(dist)))
	r.PathPrefix("/static").Handler(http.StripPrefix("/static", http.FileServer(http.Dir(dist))))
	// r.PathPrefix("/").Handler(http.FileServer(http.Dir(dist)))
	r.HandleFunc("/login", h.LoginHandler).Methods("GET")
	r.HandleFunc("/login", h.LoginPostHandler).Methods("POST")
	r.HandleFunc("/signup", h.SignupHandler).Methods("GET")
	r.HandleFunc("/signup", h.SignupPostHandler).Methods("POST")
	r.Handle("/", http.FileServer(http.Dir(dist)))
	http.Handle("/", r)
	// http.Handle("/", r)
	go http.ListenAndServe(fmt.Sprintf(":%d", port), http.HandlerFunc(redirect))
	http.ListenAndServeTLS(fmt.Sprintf(":%d", portSSL), "cert.pem", "key.pem", nil)
}

// r := mux.NewRouter()
// port := 80
// portSSL := 443
// dir, _ := filepath.Abs(filepath.Dir(os.Args[0]))
// dist := fmt.Sprintf("%s/client/dist/client", dir)
// // r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir(dir))))
// // r.HandleFunc("/login", LoginPageHandler)
// r.PathPrefix("/").Handler(http.FileServer(http.Dir(dist)))
// fmt.Printf("listening on port %d", portSSL)
// go http.ListenAndServe(fmt.Sprintf(":%d", port), http.HandlerFunc(redirect))
// http.ListenAndServeTLS(fmt.Sprintf(":%d", portSSL), "cert.pem", "key.pem", nil)

func main() {
	p := setService()
	h := RouteService(p)
	connect(h, p.Dir)

	// b := make([]byte, 64)
	// rand.Read(b)
	// fmt.Println(b)
	// fmt.Println(base64.URLEncoding.EncodeToString(b))

	fmt.Println(filepath.Abs(filepath.Dir(os.Args[0])))

}

func authSession(store sessions.CookieStore, w http.ResponseWriter, r *http.Request) {
	session, err := store.Get(r, "sessionKey")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	session.Options = &sessions.Options{
		Path:     "/",
		MaxAge:   86400 * 7,
		HttpOnly: true,
	}
	session.Values["foo1"] = "bar1"
	session.Values[42] = 43
	session.Save(r, w)
}

// func renderSignup(w http.ResponseWriter, dir string, condition Condition) {
func renderSignup(w http.ResponseWriter, dir string, code pq.ErrorCode) {
	fmt.Println("rendersignup is being called")
	filepath := fmt.Sprintf("%s/templates/signup.gohtml", dir)
	fmt.Println(filepath)
	t := template.Must(template.New("signup.gohtml").ParseFiles(filepath))
	// err := t.Execute(w, condition)
	err := t.Execute(w, code)
	if err != nil {
		fmt.Println("execution failed: %s", err)
	}
}

func (p Pathroot) SignupHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("the signup handler is being called")
	// renderSignup(w, p.Dir, Condition{code: ""})
	renderSignup(w, p.Dir, "")

	// filepath := fmt.Sprintf("%s/templates/signup.html", p.Dir)
	// fmt.Println(filepath)
	// t := template.Must(template.New("signup.html").ParseFiles(filepath))
	// err := t.Execute(w, nil)
	// if err != nil {
	// 	fmt.Println("execution failed: %s", err)
	// }
}

func (p Pathroot) SignupPostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("signup post handler is being called")
	hashedpw, err := bcrypt.GenerateFromPassword([]byte(p.Bm.Sanitize((r.FormValue("password2")))), 15)
	if err != nil {
		log.Println(err)
	}
	fmt.Println("hashedpw: ", string(hashedpw))

	// username := p.Bm.Sanitize(r.FormValue("username"))
	// password := p.Bm.Sanitize(r.FormValue("password"))
	//then bcrypt password
	//then set in databse
	// then return whether or not it was set successfully and either keep person on that page with instructions to redo address or redirect them to dashboard
	// fmt.Println(username)
	// fmt.Println(password)
	newUser := NewUser{
		FirstName:       p.Bm.Sanitize(r.FormValue("first")),
		LastName:        p.Bm.Sanitize(r.FormValue("last")),
		BusinessName:    p.Bm.Sanitize(r.FormValue("business")),
		BusinessAddress: p.Bm.Sanitize(r.FormValue("address")),
		BusinessCity:    p.Bm.Sanitize(r.FormValue("city")),
		Email:           p.Bm.Sanitize(r.FormValue("username")),
		PwdHash:         string(hashedpw),
	}
	fmt.Println("newUser: ", newUser)
	dberr := insertDB(p.Db, newUser)

	if dberr != "" {
		// renderSignup(w, p.Dir, Condition{code: dberr})
		renderSignup(w, p.Dir, dberr)
	} else {
		//cache and redirect to dashboard
		fmt.Println("no error from insertDB. Cache and redirect to dashboard")
	}

	fmt.Println("error from insertDB: ", err)
	// if err != nil {
	// 	target := "https://" + r.Host + r.URL.Path
	// 	if len(r.URL.RawQuery) > 0 {
	// 		target += "?" + r.URL.RawQuery
	// 	}
	// 	// http.Redirect(w, r, target, http.StatusTemporaryRedirect)
	// 	// fmt.Println("inside redirect")
	// 	http.Redirect(w, r, target, http.StatusMovedPermanently)

	// }
}

// --------------------------------------

func insertDB(db Db, newUser NewUser) pq.ErrorCode {
	fmt.Println("insert DB is being called")
	t := "host=%s user=%s dbname=%s sslmode=disable"
	connectionString := fmt.Sprintf(t, db.host, db.user, db.dbname)
	dbconn := sqlx.MustConnect("postgres", connectionString)

	query := `INSERT INTO users(firstname, lastname, businessname, businessaddress, businesscity, email, pwdhash)
	    VALUES(:firstname, :lastname, :businessname, :businessaddress, :businesscity, :email, :pwdhash)`

	// query :=
	// `INSERT INTO users(firstname, lastname, businessname, businessaddress, businesscity, lat, lng, email, pwdhash)
	// VALUES(:firstname, :lastname, :businessname, :businessaddress, :businesscity, ST_Y(g.geomout)::numeric(8,5), ST_X(g.geomout)::numeric(8,5), :email, :pwdhash)
	// FROM geocode(:businessaddress, :businesscity, 1) AS g;`

	// `INSERT INTO users(firstname, lastname, businessname, businessaddress, businesscity, email, pwdhash)
	// VALUES(:firstname, :lastname, :businessname, :businessaddress, :businesscity, :email, :pwdhash);
	// // UPDATE users
	// // SET  (users.lng, users.lat) = ( ST_X(g.geomout)::numeric(8,5), ST_Y(g.geomout)::numeric(8,5) )
	// // FROM geocode(users.businessaddress, users.businesscity, 1) AS g;`
	// UPDATE users
	// FROM (SELECT
	// ST_X(g.geomout)::numeric(8,5) AS lon,
	// ST_Y(g.geomout)::numeric(8,5) AS lat)
	// FROM geocode('2198 Florida Ave NW, Washington, DC 20008', 1) AS g;

	// FROM (SELECT
	// ST_X(g.geomout)::numeric(8,5) AS lon,
	// ST_Y(g.geomout)::numeric(8,5) AS lat)
	// FROM geocode('2198 Florida Ave NW, Washington, DC 20008', 1) AS g;

	// FROM geocode(:businessaddress, :businesscity, 1) AS g;
	// 	FROM users
	// 	WHERE rating IS NULL ORDER BY addid LIMIT 3) As a
	// 	LEFT JOIN LATERAL geocode(a.address,1) As g ON true
	// WHERE a.addid = addresses_to_geocode.addid;`
	// `INSERT INTO users(firstname, lastname, businessname, businessaddress, businesscity, lat, lng, email, pwdhash)
	// VALUES(:firstname, :lastname, :businessname, :businessaddress, :businesscity, ST_X(g.geomout)::numeric(8,5), ST_Y(g.geomout)::numeric(8,5) :email, :pwdhash)
	// FROM geocode('31 - 37 Stewart Street, Boston, MA 02116',1) AS g;`

	_, err := dbconn.NamedExec(query, newUser)
	if err != nil {
		return err.(*pq.Error).Code
		// if err.(*pq.Error).Code == "23505" {
		// 	fmt.Println("This is a unique_violation")

		// }
		// fmt.Print(err.(*pq.Error).Code)
		// there are three kinds of errors
		// 1) Constraint violated / duplicate
		// 2) geocoordinate can't be found
		// 3) generic error with insert
	}
	return ""

	// q := "INSERT INTO genius (name, iq, nationality) VALUES ('%s', %d, '%s')"
	// command := fmt.Sprintf(t, g.Name, g.IQ, g.Nationality)
	// db.MustExec(command)
}

// --------------------------------------

func (p Pathroot) LoginHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("the login handler is being called")

	// authSession(p.Store, w, r)
	// session, err := p.Store.Get(r, p.Skey)
	// if err != nil {
	// 	http.Error(w, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	// session.Options = &sessions.Options{
	// 	MaxAge:   86400 * 7,
	// 	HttpOnly: true,
	// }
	// Set some session values.
	// session.Values["foo"] = "bar"
	// session.Values[42] = 43
	// // Save it before we write to the response/return from the handler.
	// session.Save(r, w)

	// value := session.Values["foo"]
	// fmt.Println("value: ", value)

	filepath := fmt.Sprintf("%s/templates/login.gohtml", p.Dir)
	fmt.Println(filepath)
	t := template.Must(template.New("login.gohtml").ParseFiles(filepath))
	err := t.Execute(w, nil)
	if err != nil {
		fmt.Println("execution failed: %s", err)
	}
}

func (p Pathroot) LoginPostHandler(w http.ResponseWriter, r *http.Request) {
	// username := p.Bm.Sanitize(r.FormValue("username"))
	// password := p.Bm.Sanitize(r.FormValue("password"))
	//then bcrypt password
	//then set in databse
	// then return whether or not it was set successfully and either keep person on that page with instructions to redo address or redirect them to dashboard
	// fmt.Println(username)
	// fmt.Println(password)

	hashedpw, err := bcrypt.GenerateFromPassword([]byte(r.FormValue("password")), 15)
	if err != nil {
		log.Println(err)
	}
	fmt.Println(hashedpw)

	// if err := r.ParseForm(); err != nil {
	// 	fmt.Println(err)
	// }
	// for key, value := range r.PostForm {
	// 	p := bluemonday.StrictPolicy()
	// 	key = p.Sanitize(key)
	// 	fmt.Println("key: ", key)
	// 	fmt.Println("value: ", p.Sanitize(value[0]))
	// }
}
