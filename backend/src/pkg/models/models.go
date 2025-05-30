package models

import (
	"time"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

type User struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name         string    `json:"name" gorm:"type:varchar(50);unique;"`
	Email        string    `json:"email" gorm:"type:varchar(100);unique;"`
	Password     string    `json:"password" gorm:"type:varchar(60);"`
	ProfileImage string    `json:"profile_image" gorm:"type:varchar(255)"`
	Bio          string    `json:"bio" gorm:"type:text"`
	NFTs         []NFT     `json:"nfts" gorm:"foreignKey:OwnerId"`
	Collections  []Collection `json:"collections" gorm:"foreignKey:OwnerId"`
	Wallets      []Wallet   `json:"wallets" gorm:"foreignKey:UserId"`
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
}

type Wallet struct {
	Id        uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	UserId    uuid.UUID `json:"user_id" gorm:"type:uuid;not null"`
	User      User      `json:"user" gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
	Address   string    `json:"wallet_address" gorm:"type:varchar(50);not null;unique"`
	Chain     string    `json:"chain" gorm:"type:varchar(50);not null"`
	Signature string    `json:"signature" gorm:"type:varchar(255);not null"`
	Nonce     string    `json:"nonce" gorm:"type:varchar(36);not null;default:uuid_generate_v4()"`
	Verified  bool      `json:"verified" gorm:"default:false"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type Collection struct {
	Id          uuid.UUID      `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name        string         `json:"name" gorm:"type:varchar(100);not null"`
	Description string         `json:"description" gorm:"type:text"`
	Symbol      string         `json:"symbol" gorm:"type:varchar(7)"`
	ImageUrl    string         `json:"image_url" gorm:"type:varchar(255)"`
	Tags        pq.StringArray `json:"tags" gorm:"type:text[]"`
	Category    string         `json:"category" gorm:"type:varchar(50)"`
	Owner     User           `json:"owner" gorm:"foreignKey:OwnerId;constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	Blockchain  string         `json:"blockchain" gorm:"type:varchar(50)"`
	OwnerId   uuid.UUID      `json:"owner_id" gorm:"type:uuid;not null"`
	
	NFTs        []NFT          `json:"nfts" gorm:"foreignKey:CollectionId"`
	CreatedAt   time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
}

//MODELO DO LEILÃO
type Listing struct {
	Id        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	NFTId     uuid.UUID `gorm:"type:uuid;not null"`
	Seller    Wallet    `gorm:"foreignKey:SellerWalletId"`
	SellerWalletId uuid.UUID `gorm:"type:uuid;not null"`
	Price     float64   `gorm:"type:decimal(10,2)"` 
	Auction   bool      `gorm:"default:false"`
	Bids      []Bid     `gorm:"foreignKey:ListingId"`
	ExpiresAt time.Time `gorm:"not null"`
	Status    string    `gorm:"type:varchar(20);default:'active'"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}

//MODELO DE LANCES EM LEILÕES
type Bid struct {
	Id         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	ListingId  uuid.UUID `gorm:"type:uuid;not null"`
	Bidder     Wallet    `gorm:"foreignKey:BidderWalletId"`
	BidderWalletId uuid.UUID `gorm:"type:uuid;not null"`
	Amount     float64   `gorm:"type:decimal(10,2)"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}

type NFT struct {
	Id           uuid.UUID      `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name         string         `json:"name" gorm:"type:varchar(100);not null"`
	Description  string         `json:"description" gorm:"type:text"`
	ImageUrl     string         `json:"image_url" gorm:"type:varchar(255)"`
	Tags         pq.StringArray `json:"tags" gorm:"type:text[]"`
	Owner        User           `json:"owner" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OwnerId      uuid.UUID      `json:"owner_id"`
	Collection   Collection     `json:"collection" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CollectionId uuid.UUID      `json:"collection_id"`
	ContractId uuid.UUID `json:"contract_id"`
	Contract   SmartContract `json:"contract" gorm:"foreignKey:ContractId"`
	Category     string         `json:"category" gorm:"type:varchar(50)"`
	Attributes   string    `json:"attributes" gorm:"type:jsonb;default:'{}'"`
	Price        float64        `json:"price" gorm:"type:decimal(10,2)"`
	FloorPrice   float64        `json:"floor_price" gorm:"type:decimal(10,2)"`
    Volume       float64        `json:"volume" gorm:"type:decimal(15,2)"`
    LastSale     float64        `json:"last_sale" gorm:"type:decimal(10,2)"`
    TotalSales   int            `json:"total_sales" gorm:"type:int"` 
    Trends       string         `json:"trends" gorm:"type:jsonb;default:'{}'"` 
	DropId       uuid.UUID      `json:"drop_id" gorm:"type:uuid"`
	Drop         Drop           `json:"drop" gorm:"foreignKey:DropId"`
	CreatedAt    time.Time      `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    time.Time      `json:"updated_at" gorm:"autoUpdateTime"`
	History      []Transaction  `json:"history" gorm:"foreignKey:NFTId"`
}


type Drop struct {
    ID           uuid.UUID  `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    Name         string     `json:"name" gorm:"type:varchar(100);not null"`
	Owner        User       `json:"owner" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OwnerId      uuid.UUID  `json:"owner_id" gorm:"type:uuid;not null"` 
	Category     string     `json:"category" gorm:"type:varchar(50)"`
    Description  string     `json:"description" gorm:"type:text"`
    ImageURL     string     `json:"image_url" gorm:"type:varchar(255)"`
    CollectionId uuid.UUID  `json:"collection_id" gorm:"type:uuid;not null"` 
    Collection   Collection `json:"collection" gorm:"foreignKey:CollectionId"`
	NFTs		 []NFT 		`json:"nfts" gorm:"foreignKey:DropId"`
    DropDate     time.Time  `json:"drop_date" gorm:"not null"`             
    Price        float64    `json:"price" gorm:"not null"`                  
    TotalSupply  int        `json:"total_supply" gorm:"not null"`    
    Blockchain   string     `json:"blockchain" gorm:"type:varchar(50)"`
    CreatedAt    time.Time  `json:"created_at" gorm:"autoCreateTime"`
    UpdatedAt    time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
}

type Transaction struct {
	Id         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	NFTId      uuid.UUID `gorm:"type:uuid;not null"`
	Buyer      Wallet    `gorm:"foreignKey:BuyerWalletId"`
	BuyerWalletId  uuid.UUID `gorm:"type:uuid;not null"`
	Seller     Wallet    `gorm:"foreignKey:SellerWalletId"`
	SellerWalletId uuid.UUID `gorm:"type:uuid;not null"`
	Price      float64   `gorm:"type:decimal(10,2)"`
	MarketplaceFee float64 `gorm:"type:decimal(5,2)"`  
	CreatorRoyalty float64 `gorm:"type:decimal(5,2)"` 
	TxHash     string    `gorm:"type:varchar(255);unique;not null"`  
	Status     string    `gorm:"type:varchar(20);default:'pending'"` 
	Blockchain string    `gorm:"type:varchar(50);not null"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}

type SmartContract struct {
	Id         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Address    string    `gorm:"type:varchar(50);not null;unique"`
	Name       string    `gorm:"type:varchar(100);not null"`
	Blockchain string    `gorm:"type:varchar(50);not null"` 
	ABI        string    `gorm:"type:jsonb;not null"`  
	NFTs       []NFT     `gorm:"foreignKey:ContractId"`
	CreatedAt  time.Time `gorm:"autoCreateTime"`
}