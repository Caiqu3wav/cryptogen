package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/json"
	"net/http"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
	"strings"
)


type Credentials struct {
	Name string `json:"name"`
	Email string `json:"email"`
	Password string `json:"password"`
	ProfileImage string `json:"profileImage"`
}

func SignIn(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := database.DB.Where("email = ?", creds.Email).First(&user).Error; err != nil {
		http.Error(w, "Usuário não encontrado", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password)); err != nil {
		http.Error(w, "Senha incorreta", http.StatusUnauthorized)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]interface{}{"user": user})
}


func hashPassword(password string) (string, error)  {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}


func SignUp(w http.ResponseWriter, r *http.Request) {
	var creds Credentials
	var user models.User

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	hashedPassword, err := hashPassword(creds.Password)
	if err != nil {
		http.Error(w, "Falha ao encriptar senha", http.StatusInternalServerError)
		return
	}

	user = models.User{Name: creds.Name, Email: creds.Email, Password: hashedPassword, ProfileImage: creds.ProfileImage}

	if err := database.DB.Create(&user).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func GetUsers(w http.ResponseWriter, r *http.Request) {
	var users []models.User

	if err := database.DB.Find(&users).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func GetUser(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		var user models.User

		if err := database.DB.First(&user, "id = ?", params["id"]).Error; err != nil {
			http.Error(w, "Usuário não encontrado", http.StatusInternalServerError)
		return
		}

		w.Header().Set("Content-Type,", "application/json")
		json.NewEncoder(w).Encode(user)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	var user models.User

    if err := database.DB.First(&user, "id = ?", params["id"]).Error; err != nil {
        http.Error(w, "User not found", http.StatusInternalServerError)
        return
    }

	var updates map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//validar senha se incluida
    if password, ok := updates["password"].(string); ok && password != "" {
        hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
        if err != nil {
            http.Error(w, "Error hashing password", http.StatusInternalServerError)
            return
        }
        updates["password"] = string(hashedPassword)
    }

	 // Handle wallet addition if provided
	 if wallets, ok := updates["wallets"].([]interface{}); ok {
        for _, wallet := range wallets {
            walletMap, ok := wallet.(map[string]interface{})
            if !ok {
                http.Error(w, "Invalid wallet data", http.StatusBadRequest)
                return
            }

            walletAddress, ok := walletMap["wallet_address"].(string)
            if !ok {
                http.Error(w, "Wallet address missing", http.StatusBadRequest)
                return
            }

            // Check if wallet already exists for this user
            for _, existingWallet := range user.Wallets {
                if strings.ToLower(existingWallet.Address) == strings.ToLower(walletAddress) {
                    http.Error(w, "Wallet already registered for this user", http.StatusConflict)
                    return
                }
            }

            // Add new wallet to the user
            newWallet := models.Wallet{
                Address: walletAddress,
                UserId:  user.Id,
            }
            if err := database.DB.Create(&newWallet).Error; err != nil {
                http.Error(w, "Failed to save wallet", http.StatusInternalServerError)
                return
            }
        }
    }

	//atualiza apenas os campos enviados no JSON
	if err := database.DB.Model(&user).Updates(updates).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}