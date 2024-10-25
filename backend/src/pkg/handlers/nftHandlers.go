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
	OwnerId uuid.UUID `json:"owner_id"`
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

	var owner models.User
	if err := database.DB.First(&owner, "id = ?", creds.OwnerId).Error;  err != nil {
		http.Error(w, "Usuário não encontrado", http.StatusBadRequest)
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
		http.Error(w, "Nft não encontrado", http.StatusNotFound)
		return 
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(nft)
}

func GetNfts(w http.ResponseWriter, r *http.Request) {
	var nfts []models.NFT

	if err := database.DB.Find(&nfts).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(nfts)
}

func UpdateNft(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		var nft models.NFT

		if err := database.DB.First(&nft, "id = ?", params["id"]).Error; err != nil {
			http.Error(w, "Nft não encontrado", http.StatusInternalServerError)
			return
		}

		var updates map[string]interface{}
		if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if err := database.DB.Model(&nft).Updates(updates).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(nft)
		}

	func DeleteNft(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		var nft models.NFT

		if err := database.DB.First(&nft, "id = ?", params["id"]).Error; err != nil {
			http.Error(w, "Nft não encontrado", http.StatusInternalServerError)
			return
		}

		if err := database.DB.Delete(&nft).Error; err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusNoContent)
	}