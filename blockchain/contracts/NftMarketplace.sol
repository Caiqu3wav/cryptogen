// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "hardhat/console.sol";
import "../utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    
    uint256 listingPrice = 0.0015 ether;

    address payable owner;
    mapping(uint256 => MarketItem) private idMarketItem;

    struct MarketItem{
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    modifier onlyOwner{
        require(
            msg.sender == owner,
            "only marketplace owner can change the listing price"
        );
        _;
    }

    constructor() ERC721("NFT Metavarse Token", "MYNFT"){
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint256 _listingPrice) 
    public 
    payable
    onlyOwner
    {
       listingPrice = _listingPrice;
    } 

    function getListingPrice() public view returns(uint256) {
        return listingPrice;
    }

    // Let creat nft token

    function createToken(string memory tokenURI, uint256 price) public payable returns(uint256){
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);

        return newTokenId;
    }

    //CREATING MARKET ITEMS

    function createMarketItem(uint256 tokenId, uint256 price) private{
        require(price > 0, "Price must be bigger than 0");
        require(msg.value == listingPrice, "Price must be equal listing price");

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    function reSellToken(uint256 tokenId, uint256 price) public payable{
        require(idMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal listingPrice");

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));

        _itemsSold.increment();
        
        _transfer(msg.sender, address(this), tokenId);
    }

    // CREATE MARKET SALE

    function createMarketSale(uint256 tokenId) public payable{
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == price, 
            "Please submit the asking price in order to complete the sale announce"
        );

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();
        
        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    // UNSOLD NFT DATA

    function fetchMarketItem() public view returns (MarketItem[] memory) {
    uint256 totalCount = _tokenIds.current();
    uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
    uint256 currentIndex = 0;

    MarketItem[] memory items = new MarketItem[](unsoldItemCount);
    for (uint256 i = 0; i < totalCount; i++) {
        if (idMarketItem[i + 1].owner == address(this)) {
            uint256 currentId = i + 1;
            MarketItem storage currentItem = idMarketItem[currentId];
            items[currentIndex] = currentItem;
            currentIndex += 1;
        }
    }
    return items;
}

    // BUY ITEM
    function fetchMyNft() public view returns(MarketItem[] memory){
        uint256 totalCount = _tokenIds.current();
        uint itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender){
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            
        if (idMarketItem[i + 1].owner == msg.sender) {
        uint256 currentId = i + 1;
        MarketItem storage currentItem = idMarketItem[currentId];
        items[currentIndex] = currentItem;
        currentIndex += 1;
      }
    }
        return items;
        
}

    // SINGLE USER ITEMS
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 currentIndex = 0; 
    
        for (uint256 i = 0; i < totalCount; i++){
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;        
            }
        }
        return items;
    }
}
