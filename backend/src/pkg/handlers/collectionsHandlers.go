package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type CollectionCredentials struct {
	Name string `json:"name"`
	Description string `json:"description"`
	ImageUrl string `json:"imageUrl"`
	Tags []string `json:"tags"`
	OwnerId uuid.UUID `json:"ownerId"`
	Blockchain string `json:"blockchain"`
	Category string  `json:"category"`
}

func CreateCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var creds CollectionCredentials
	var collection models.Collection

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var owner models.User
	if err := database.DB.First(&owner, "id = ?", creds.OwnerId).Error; err != nil {
		http.Error(w, "Usuário não encontrado", http.StatusNotFound)
		return
	}

	collection = models.Collection{
		Id: uuid.New(),
		Name: creds.Name,
		Description: creds.Description,
		ImageUrl: creds.ImageUrl,
		Tags: creds.Tags,
		Owner: owner,
		OwnerId: owner.Id, 
		Blockchain: creds.Blockchain,
		Category: creds.Category,
	}

	if err := database.DB.Create(&collection).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(collection)
}

func GetCollection(w http.ResponseWriter, r *http.Request) {
	var collection models.Collection

	if err := database.DB.First(&collection, mux.Vars(r)["id"]).Error; err != nil {
		http.Error(w, "Collection não encontrada", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(collection)
}

func GetCollections(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var collections []models.Collection

	if err := database.DB.Find(&collections).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(collections)
}

func UpdateCollection(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var creds CollectionCredentials
	var collection models.Collection

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := database.DB.First(&collection, mux.Vars(r)["id"]).Error; err != nil {
		http.Error(w, "Collection não encontrada", http.StatusNotFound)
		return
	}

	collection.Name = creds.Name
	collection.Description = creds.Description
	collection.ImageUrl = creds.ImageUrl
	collection.Tags = creds.Tags

	if err := database.DB.Save(&collection).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(collection)
}

func DeleteCollection(w http.ResponseWriter, r *http.Request) {
	var collection models.Collection

	if err := database.DB.First(&collection, mux.Vars(r)["id"]).Error; err != nil {
		http.Error(w, "Collection não encontrada", http.StatusNotFound)
		return
	}

	if err := database.DB.Delete(&collection).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}