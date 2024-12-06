package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strings"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/secp256k1"
	"github.com/gorilla/mux"
)

func AddWallet(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["userId"]

	var input struct {
		WalletAddress string `json:"wallet_address"`
		Signature     string `json:"signature"`
	}
	
	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	//check validation of the signature to the crypto wallet adress
	if !ValidateSignature(input.WalletAddress, input.Signature) {
		http.Error(w, "Invalid wallet signature", http.StatusBadRequest)
		return
	}

	//get the user from DB
	var user models.User
	if err := database.DB.Preload("Wallets").First(&user, "id = ?", userID).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	//check wallet existence
	for _, wallet := range user.Wallets {
		if strings.ToLower(wallet.Address) == strings.ToLower(input.WalletAddress) {
			http.Error(w, "Wallet already registered for this user", http.StatusConflict)
			return
		}
	}

	//create
		newWallet := models.Wallet{
			Address: input.WalletAddress,
			UserId:  user.Id,
		}

		//save wallet on DB
		if err := database.DB.Create(&newWallet).Error; err != nil {
			http.Error(w, "Failed to save wallet", http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "Wallet added successfully"})
}

func GetWalletsHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userID := vars["userId"]

	var user models.User
	if err := database.DB.Preload("Wallets").First(&user, "id = ?", userID).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user.Wallets)
}

func WalletRegister(w http.ResponseWriter, r *http.Request) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
		Chain         string `json:"chain"`
	}

	if err := json.NewDecoder(r.Body).Decode(&payload); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	//validate the signature with the wallet address
	if !ValidateSignature(payload.WalletAddress, payload.Signature) {
		http.Error(w, "Invalid signature", http.StatusUnauthorized)
		return
	}

	user := GetUserByWalletAddress(payload.WalletAddress)
    if user != nil {
        //return the user if the wallet already exists
        w.Header().Set("Content-Type", "application/json")
        json.NewEncoder(w).Encode(user)
        return
    }

	newUser := models.User{
    Wallets: []models.Wallet{{
        Address:   payload.WalletAddress,
        Chain:     payload.Chain,
        Signature: payload.Signature,
        Verified:  false, // Set to default
    }},
}
	if err := database.DB.Create(&newUser).Error; err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
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


func ValidateSignature(walletAddress string, signature string) bool {
	//normalize the wallet address
	walletAddress = strings.ToLower(strings.TrimPrefix(walletAddress, "0x"))

	//decoding signature from hex
	sigBytes, err := hex.DecodeString(strings.TrimPrefix(signature, "0x"))
	if err != nil || len(sigBytes) != 65 {
		return false
	}

	//adjust the recovery byte (v)
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
