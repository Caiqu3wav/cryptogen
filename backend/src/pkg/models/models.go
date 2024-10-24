package models

import (
	"time"
	"github.com/google/uuid"
)

type User struct {
	Id		uuid.UUID	 `gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name     string 	`gorm:"type:varchar(50);unique;"`
	Email    string	 `gorm:"type:varchar(100);not null"`
	Password string  `gorm:"type:varchar(60);"`
	ProfileImage string   `gorm:"type:varchar(255)"`
	Bio		 string   `gorm:"type:text"`
	NFTs     []NFT  `gorm:"foreignKey:OwnerId"`
}

type Collection struct {
	Id	uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name	string 	   `gorm:"type:varchar(100);not null"`
	Description string `gorm:"type:text"`
	ImageUrl string    `gorm:"type:varchar(255)"`
    Tags    []string   `gorm:"type:text[]"`
	Creator    User  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	CreatorId  uuid.UUID
	NFTs	[]NFT  `gorm:"foreignKey:CollectionId"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
}

type NFT struct {
	Id		uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name	string 	   `gorm:"type:varchar(100);not null"`
	Description string `gorm:"type:text"`
	ImageUrl string    `gorm:"type:varchar(255)"`
	Tags    []string   `gorm:"type:text[]"`
	Owner    User  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OwnerId  uuid.UUID
	Category     string    `gorm:"type:varchar(50)"` 
	Attributes   string    `gorm:"type:jsonb"`       
	Price        float64   `gorm:"type:decimal(10,2)"`
	DropId 	uuid.UUID   `gorm:"type:uuid"`
	Drop     Drop      `gorm:"foreignKey:DropId"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
	History		[]Transaction  `gorm:"foreignKey:NFTId"`
}

type Drop struct {
    ID           uuid.UUID  `json:"id" gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
    Name         string     `json:"name" gorm:"type:varchar(100);not null"`
	Owner        User       `json:"owner" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OwnerId      uuid.UUID  `json:"owner_id" gorm:"type:uuid;not null"` 
    Description  string     `json:"description" gorm:"type:text"`
    ImageURL     string     `json:"image_url" gorm:"type:varchar(255)"`
    CollectionID uuid.UUID  `json:"collection_id" gorm:"type:uuid;not null"` 
    Collection   Collection `json:"collection" gorm:"foreignKey:CollectionID"`
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