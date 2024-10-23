package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type NftCredentials struct {
	Name string `json:"name"`
	Description string `json:"description"`
	ImageUrl string `json:"imageUrl"`
	Tags []string `json:"tags"`
	OwnerId uuid.UUID `json:"ownerId"`
	Category string `json:"category"`
	Price float64 `json:"price"`
}

func CreateNft(w http.ResponseWriter, r *http.Request){
    var creds NftCredentials
	var nft models.NFT

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return 
	}


	nft = models.NFT{Name: creds.Name, Description: creds.Description, ImageUrl: creds.ImageUrl, Tags: creds.Tags, OwnerId:  creds.OwnerId, Category:  creds.Category, Price: creds.Price}

	if err := database.DB.Create(&nft).Error; err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(nft)
}

func GetNft(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var nft models.NFT

	if err := database.DB.First(&nft, "id = ?", params["id"]).Error; err != nil {
		http.Error(w, "Nft não encontrado", http.StatusInternalServerError)
		return 
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(nft)
}

