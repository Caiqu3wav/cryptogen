package handlers

import (
	"cryptogen/src/pkg/database"
	"cryptogen/src/pkg/models"
	"encoding/hex"
	"net/http"
	"strings"
	"github.com/google/uuid"
	"github.com/gin-gonic/gin"
	"github.com/ethereum/go-ethereum/crypto"
)

func GetNonce(c *gin.Context) {
	nonce := uuid.New().String()
	c.JSON(http.StatusOK, gin.H{"nonce": nonce})
}

func GetWallet(c *gin.Context) {
	walletAddress := c.Param("walletAddress")

	var wallet models.Wallet
	if err := database.DB.Preload("User").First(&wallet, "wallet_address = ?", walletAddress).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Wallet not found"})
		return
	}

	c.JSON(http.StatusOK, wallet)
}

func GetWallets(c *gin.Context) {
	userID := c.Param("userId")

	var user models.User
	if err := database.DB.Preload("Wallets").First(&user, "id = ?", userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return;
	}

	c.JSON(http.StatusOK, user.Wallets)
}

func WalletAuth(c *gin.Context) {
	var payload struct {
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
		Nonce         string `json:"nonce"`
	}

	if err := c.BindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !ValidateSignature(payload.WalletAddress, payload.Signature, payload.Nonce) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
		return
	}

	db := database.DB
	var wallet models.Wallet

	tx := db.Begin()
	
	if err := tx.Where("wallet_address = ?", payload.WalletAddress).FirstOrCreate(&wallet, models.Wallet{
		Address: payload.WalletAddress,
		Nonce: payload.Nonce,
		Signature: payload.Signature,
		Verified: true,
	}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create wallet"})
		return
	}

	if wallet.UserId == uuid.Nil {
		newUser := models.User{
			Name:     "New User", // 🔹 Nome padrão (o usuário pode atualizar depois)
			Email:    "",         // 🔹 Email em branco até ser preenchido
		}

	
		if err := tx.Create(&newUser).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
			return
		}

		wallet.UserId = newUser.Id

		if err := tx.Save(&wallet).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update wallet"})
			return
		}
	}

	tx.Commit()

	c.JSON(http.StatusOK, gin.H{"user": wallet.User, "wallet": wallet})
}

func WalletToUser(c *gin.Context) {
	var payload struct {
		UserId        uuid.UUID `json:"userId"`
		WalletAddress string `json:"walletAddress"`
		Signature     string `json:"signature"`
		Nonce         string `json:"nonce"`
	}

	if err := c.BindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	if !ValidateSignature(payload.WalletAddress, payload.Signature, payload.Nonce) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid signature"})
		return
	}

	db := database.DB
	var user models.User

	var wallet models.Wallet

	tx := db.Begin()

	  // Verify if wallet already signed
	if err := tx.Where("wallet_address = ?", payload.WalletAddress).First(&wallet).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusConflict, gin.H{"error": "Wallet not found"})
		return
	
	} else {
		wallet = models.Wallet{
			Address: payload.WalletAddress,
			Nonce: payload.Nonce,
			Signature: payload.Signature,
			Verified: true,
		}

		if err := tx.Create(&wallet).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create wallet"})
			return
		}
		}

		tx.Commit()
		c.JSON(http.StatusOK, gin.H{"message": "Wallet linked to user", "user": user, "wallet": wallet})
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
	publicKey, err := crypto.SigToPub(hash.Bytes(), sigBytes)
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

func DeleteWallet(c *gin.Context) {
	walletAddress := c.Param("walletAddress")

	var wallet models.Wallet
	db := database.DB

	if err := db.Where("address = ?", walletAddress).First(&wallet).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Wallet not found"})
		return
	}

	db.Delete(&wallet)

	c.JSON(http.StatusOK, gin.H{"message": "Wallet deleted successfully"})
}
