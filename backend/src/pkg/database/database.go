package database

import (
	"fmt"
	"log"
	"os"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"cryptogen/src/pkg/models"
)

var DB *gorm.DB

func ConnectDatabase() error {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")
	port := os.Getenv("DB_PORT")

	if host == "" || user == "" || password == "" || dbname == "" || port == "" {
		log.Fatalf("Variáveis de ambiente do banco de dados não foram definidas corretamente")
	}

	// Monta a string DSN (Data Source Name)
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		host, user, password, dbname, port,
	)
	
	log.Println("Conexão: ", dsn)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})


	if err != nil {
		log.Fatalf("Erro na conexão com banco de dados: %v", err)
		return err 
	}

	DB = db 
	log.Println("Conexão com o banco de dados estabelecida com sucesso!")
    return nil
}

func AutoMigrate(db *gorm.DB) {
	db.AutoMigrate(&models.User{}, &models.NFT{})
}