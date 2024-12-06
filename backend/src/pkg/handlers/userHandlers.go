package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strings"

	"crypto/ecdsa"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/secp256k1"
	"github.com/gorilla/mux"
	"golang.org/x/crypto/bcrypt"
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
		http.Error(w, "Usuário não encontrado", http.StatusInternalServerError)
		return
	}

	var updates map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&updates); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Atualizar apenas os campos enviados no JSON
	if err := database.DB.Model(&user).Updates(updates).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func ValidateSignature(walletAddress string, signature string) bool {
	//normalize the wallet address
	walletAddress = strings.ToLower(strings.TrimPrefix(walletAddress, "0x"))

	//decoding signature from hex
	sigBytes, err := hex.DecodeString(strings.TrimPrefix(signature, "0x"))
	if err != nil || len(sigBytes) != 65 {
		return false
	}

	v := sigBytes[64]
	if v < 27 {
		v += 27
	}
	sigBytes[64] = v - 27

	//define the message hash
	message := []byte("Your message or challenge string here")
	hash := crypto.Keccak256Hash([]byte("\x19Ethereum Signed Message:\n" + string(len(message)) + string(message)))

	//brings the public key of the wallet
	publicKeyBytes, err := secp256k1.RecoverPubkey(hash.Bytes(), sigBytes)
	if err != nil {
		return false
	}

	//convert the public key bytes to an ECDSA public key
	publicKey, err := crypto.UnmarshalPubkey(publicKeyBytes)
	if err != nil {
		return false
	}

	//convert the wallet public key to an Ethereum address
	recoveredAddress := crypto.PubkeyToAddress(*publicKey).Hex()

	//compares the address brought by the mother
	return strings.ToLower(recoveredAddress) == walletAddress
}

func WalletRegister(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if !ValidateSignature(payload.WalletAddress, payload.Signature) {
		http.Error(w, "Assinatura inválida", http.StatusUnauthorized)
		return
	}

	user := GetUserByWalletAddress(payload.WalletAddress)
	if user != nil {
		http.Error(w, "Usuário já registrado", http.StatusConflict)
		return
	}

	newUser := models.User{WalletAddress: payload.WalletAddress}
	if err := database.DB.Create(&newUser).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func GetUserByWalletAddress(walletAddress string) *models.User {
	var user models.User

	if err := database.DB.Where("wallet_address = ?", walletAddress).First(&user).Error; err != nil {
		return nil
	}

	return &user
}

func WalletLogin(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if !ValidateSignature(payload.WalletAddress, payload.Signature) {
		http.Error(w, "Assinatura inválida", http.StatusUnauthorized)
		return
	}


	user := GetUserByWalletAddress(payload.WalletAddress)
	if user == nil {
		http.Error(w, "Usuário não encontrado", http.StatusNotFound)
		return
	}

	json.NewEncoder(w).Encode(map[string]interface{}{"user": user})
}

