package routes

import (
	"github.com/gorilla/mux"
	"cryptogen/src/pkg/handlers"
)

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/login", handlers.SignIn).Methods("POST").Name("login")

	r.HandleFunc("/register", handlers.SignUp).Methods("POST").Name("register")

	r.HandleFunc("/users", handlers.GetUsers).Methods("GET").Name("getUsers")

	r.HandleFunc("/user/{id}", handlers.GetUser).Methods("GET").Name("getUser")
	
	r.HandleFunc("/user/{id}", handlers.UpdateUser).Methods("PUT").Name("updateUser")

	r.HandleFunc("/nft", handlers.CreateNft).Methods("POST").Name("createNft")
}