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
	ID		uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
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
	ID		uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	Name	string 	   `gorm:"type:varchar(100);not null"`
	Description string `gorm:"type:text"`
	ImageUrl string    `gorm:"type:varchar(255)"`
	Tags    []string   `gorm:"type:text[]"`
	Owner    User  `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OwnerId  uuid.UUID
	Category     string    `gorm:"type:varchar(50)"` 
	Attributes   string    `gorm:"type:jsonb"`       
	Price        float64   `gorm:"type:decimal(10,2)"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
	History		[]Transaction  `gorm:"foreignKey:NFTId"`
}

type Transaction struct {
	ID 		uuid.UUID 	`gorm:"type:uuid;default:uuid_generate_v4();primaryKey"`
	NFTId   uuid.UUID `gorm:"type:uuid;not null"`
	BuyerId   uint      `gorm:"not null"`
	SellerId  uint      `gorm:"not null"`
	Price     float64   `gorm:"type:decimal(10,2)"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
}