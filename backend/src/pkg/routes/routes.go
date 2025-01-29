package routes

import (
	"cryptogen/src/pkg/handlers"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gin-gonic/gin"
)

func WrapGinHandler(handler gin.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		c, _ := gin.CreateTestContext(w)
		c.Request = r
		handler(c)
	}
}

func RegisterRoutes(r *mux.Router) {
	//USERS
	r.HandleFunc("/login", handlers.SignIn).Methods("POST").Name("login")

	r.HandleFunc("/register", handlers.SignUp).Methods("POST").Name("register")

	r.HandleFunc("/users", handlers.GetUsers).Methods("GET").Name("getUsers")

	r.HandleFunc("/user/{id}", handlers.GetUser).Methods("GET").Name("getUser")
	
	r.HandleFunc("/user/{id}", handlers.UpdateUser).Methods("PUT").Name("updateUser")

	//NFTS

	r.HandleFunc("/nft", handlers.CreateNft).Methods("POST").Name("createNft")

	r.HandleFunc("/nft/{id}", handlers.GetNft).Methods("GET").Name("getNft")

	r.HandleFunc("/nft", handlers.GetNfts).Methods("GET").Name("getNfts")

	r.HandleFunc("/nft/{id}", handlers.UpdateNft).Methods("PUT").Name("updateNft")

	r.HandleFunc("/nft/{id}", handlers.DeleteNft).Methods("DELETE").Name("deleteNft")

	//WALLETS

	r.HandleFunc("/wallet", WrapGinHandler(handlers.WalletAuth)).Methods("POST").Name("createWallet")

	r.HandleFunc("/wallet/{id}", WrapGinHandler(handlers.GetWallet)).Methods("GET").Name("getWallet")

	r.HandleFunc("/wallet", WrapGinHandler(handlers.GetWallets)).Methods("GET").Name("getWallets")

	r.HandleFunc("/wallet/{id}", WrapGinHandler(handlers.UpdateWallet)).Methods("PUT").Name("updateWallet")

	r.HandleFunc("/wallet/{id}", WrapGinHandler(handlers.DeleteWallet)).Methods("DELETE").Name("deleteWallet")

	r.HandleFunc("/auth/nonce", WrapGinHandler(handlers.GetNonce)).Methods("GET").Name("getNonce")

	//COLLECTIONS

	r.HandleFunc("/collection", handlers.CreateCollection).Methods("POST").Name("createCollection")

	r.HandleFunc("/collection/{id}", handlers.GetCollection).Methods("GET").Name("getCollection")

	r.HandleFunc("/userCollections/{id}", handlers.GetUserCollections).Methods("GET").Name("getUserCollections")

	r.HandleFunc("/collections", handlers.GetCollections).Methods("GET").Name("getCollections")

	r.HandleFunc("/collection/{id}", handlers.UpdateCollection).Methods("PUT").Name("updateCollection")

	r.HandleFunc("/collection/{id}", handlers.DeleteCollection).Methods("DELETE").Name("deleteCollection")

	//DROPS

	r.HandleFunc("/drop", handlers.CreateDrop).Methods("POST").Name("createDrop")

	r.HandleFunc("/drop/{id}", handlers.GetDrop).Methods("GET").Name("getDrop")

	r.HandleFunc("/drop", handlers.GetDrops).Methods("GET").Name("getDrops")

	r.HandleFunc("/drop/{id}", handlers.UpdateDrop).Methods("PUT").Name("updateDrop")

	r.HandleFunc("/drop/{id}", handlers.DeleteDrop).Methods("DELETE").Name("deleteDrop")
}