package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/json"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func CreateDrop(w http.ResponseWriter, r *http.Request) {
   w.Header().Set("Content-Type", "application/json")
	var drop models.Drop

	if err := json.NewDecoder(r.Body).Decode(&drop); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	drop.ID = uuid.New()

   if err := database.DB.Create(&drop).Error; err != nil {
      http.Error(w, "Erro ao criar drop", http.StatusInternalServerError)
      return
   }
	
   w.WriteHeader(http.StatusCreated)
   json.NewEncoder(w).Encode(drop)
}

func GetDrop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var drop models.Drop
	dropId := mux.Vars(r)["id"]

	if err := database.DB.First(&drop, "id = ?", dropId).Error; err != nil {
		http.Error(w, "Drop não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(drop)
}

func GetDrops(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var drops []models.Drop

	if err := database.DB.Find(&drops).Error; err != nil {
		http.Error(w, "Erro ao buscar drops", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(drops)
}

func UpdateDrop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	var updatedDrop models.Drop
	dropID := mux.Vars(r)["id"]

	if err := json.NewDecoder(r.Body).Decode(&updatedDrop); err != nil {
		http.Error(w, "Dados inválidos", http.StatusBadRequest)
		return
	}

	if err := database.DB.Model(&models.Drop{}).Where("id = ?", dropID).Updates(updatedDrop).Error; err != nil {
		http.Error(w, "Erro ao atualizar Drop", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(updatedDrop)
}

func DeleteDrop(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	dropID := mux.Vars(r)["id"]

	if err := database.DB.Delete(&models.Drop{}, "id = ?", dropID).Error; err != nil {
		http.Error(w, "Erro ao deletar Drop", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}