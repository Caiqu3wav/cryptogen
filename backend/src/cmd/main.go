package main

import (
	"log"
	"net/http"
    "github.com/gorilla/mux"
	"cryptogen/src/pkg/database"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Erro ao carregar .env: %v", err)
	}

	err = database.ConnectDatabase()

	if err != nil {
		log.Fatalf("Falha ao conectar ao banco: %v", err)
	}

	database.AutoMigrate(database.DB)


	r := mux.NewRouter()

	corsOptions := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"}, 
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	handler := corsOptions.Handler(r)
	
	log.Println("iniciando servidor na porta 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
}
