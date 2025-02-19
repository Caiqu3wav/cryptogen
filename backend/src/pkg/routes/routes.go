package routes

import (
	"cryptogen/src/pkg/handlers"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/mux"
	"github.com/ulule/limiter/v3"
	"github.com/ulule/limiter/v3/drivers/middleware/stdlib"
	"github.com/ulule/limiter/v3/drivers/store/memory"
)

func WrapGinHandler(handler gin.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		c, _ := gin.CreateTestContext(w)
		c.Request = r
		handler(c)
	}
}

func RegisterRoutes(r *mux.Router) {

	// Brute force protection
	rate := limiter.Rate{Period: 60 * time.Second, Limit: 10}
	middleware := stdlib.NewMiddleware(limiter.New(memory.NewStore(), rate))

	//USERS
	r.Handle("/login", middleware.Handler(http.HandlerFunc(handlers.SignIn))).Methods("POST").Name("login")

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

	r.HandleFunc("/wallet/link", WrapGinHandler(handlers.WalletToUser)).Methods("POST").Name("linkWallets")

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