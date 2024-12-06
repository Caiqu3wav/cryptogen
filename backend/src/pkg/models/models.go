package models

import (
	"time"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

type User struct {
	Id           uuid.UUID `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name         string    `json:"name" gorm:"type:varchar(50);unique;"`
	Email        string    `json:"email" gorm:"type:varchar(100);unique;not null"`
	Password     string    `json:"password" gorm:"type:varchar(60);"`
	ProfileImage string    `json:"profile_image" gorm:"type:varchar(255)"`
	Bio          string    `json:"bio" gorm:"type:text"`
	NFTs         []NFT     `json:"nfts" gorm:"foreignKey:OwnerId"`
	Collections  []Collection `json:"collections" gorm:"foreignKey:OwnerId"`
	CreatedAt    time.Time `json:"created_at" gorm:"autoCreateTime"`
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
	Category     string         `json:"category" gorm:"type:varchar(50)"`
	Attributes   string    `json:"attributes" gorm:"type:jsonb;default:'{}'"`
	Price        float64        `json:"price" gorm:"type:decimal(10,2)"`
	    // Métricas e Estatísticas
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
	Id 		uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	NFTId   uuid.UUID `gorm:"type:uuid;not null"`
	BuyerId   uint      `gorm:"not null"`
	SellerId  uint      `gorm:"not null"`
	Price     float64   `gorm:"type:decimal(10,2)"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}