// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CollectionContract {
    struct Collection {
        string name;
        string description;
        address owner;
    }

    mapping(uint256 => Collection) public collections;
    uint256 public collectionCount;

    event CollectionCreated(uint256 id, string name, string description, address owner);

    function createCollection(string memory _name, string memory _description) public {
        collectionCount++;
        collections[collectionCount] = Collection(_name, _description, msg.sender);

        emit CollectionCreated(collectionCount, _name, _description, msg.sender);
    }
}