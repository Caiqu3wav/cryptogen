package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/hex"
	"encoding/json"
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/crypto/secp256k1"
	"github.com/gorilla/mux"
)

func GetNonce(c *gin.Context) {
	nonce := uuid.New().String()
	c.JSON(http.StatusOK, gin.H{"nonce": nonce})
}

func GetWalletsHandler(c *gin.Context) {
	userID := c.Param("userId")

	var user models.User
	if err := database.DB.Preload("Wallets").First(&user, "id = ?", userID).Error; err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return;
	}

	c.JSON(http.StatusOK, user.Wallets)
}

func WalletAuth(c *gin.Context) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
		Nonce         string `json:"nonce"`
		Chain 		  string `json:"chain"`
	}

	if err := c.BindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !ValidateSignature(payload.WalletAddress, payload.Signature) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
		return
	}

	var user models.User
	db := database.DB

	var wallet models.Wallet
	result := db.Where("address = ?", payload.WalletAddress).First(&wallet)

	if result.Error != nil {
		user = models.User{
			Wallets: []models.Wallet{
				{
					Name:  "Novo Usuário",
					Email: "",
				}
				db.Create(&user)

				wallet = models.Wallet{
					WalletAddress: payload.WalletAddress,
					Nonce:         payload.Nonce,
					Chain:         payload.Chain,
					UserID:        user.ID,
					Signature: payload.Signature,
					Verified: true,
				}
			},
		}
		db.Create(&user)
	} else {
		db.Preload("Wallets").Where("id = ?", wallet.UserId).First(&user)
	}

	c.JSON(http.StatusOK, gin.H{"user": user, "wallet": wallet})
}

func GetUserByWalletAddress(walletAddress string) *models.User {
	var user models.User

	if err := database.DB.Where("wallet_address = ?", walletAddress).First(&user).Error; err != nil {
		return nil
	}

	return &user
}


func ValidateSignature(walletAddress string, signature string, nonce string) bool {
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

	//define hash with nonce
	message := []byte("Login Verification: " + nonce)
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
	return strings.ToLower(recoveredAddress) == walletAddress
}


func UpdateWallet(c *gin.Context) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
		Chain 		  string `json:"chain"`
	}

	if err := c.BindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	var wallet models.Wallet
	db := database.DB

	if err := db.Where("address = ?", payload.WalletAddress).First(&wallet).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Failed to update wallet"})
		return
	}

	wallet.Chain = payload.Chain
	wallet.Signature = payload.Signature
	db.Save(&wallet)

	c.JSON(http.StatusOK, gin.H{"message": "Wallet updated successfully"})
}