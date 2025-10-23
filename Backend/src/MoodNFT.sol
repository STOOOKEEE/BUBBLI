// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MoodNFT is ERC721, Ownable, ReentrancyGuard {

    enum Mood {
        HAPPY,      // 0
        SAD,        // 1
        EXCITED,    // 2
        CALM,       // 3
        ANGRY       // 4
    }

    mapping(uint256 => Mood) private _tokenMoods;
    mapping(address => uint256) public userTokenId;
    mapping(address => bool) public hasMinted;

    uint256 private tokenCounter;

    event NFTMinted(address indexed user, uint256 tokenId);
    event MoodChanged(uint256 indexed tokenId, Mood oldMood, Mood newMood);

    constructor() ERC721("Mood", "MNFT") Ownable(msg.sender) {}

    function mintNFT(address user, Mood mood = Mood.HAPPY) public onlyOwner nonReentrant returns (uint256) {
        require(!hasMinted[user], "User has already minted an NFT");
        require(user != address(0), "Invalid address");

        uint256 newItemId = tokenCounter;
        tokenCounter ++;

        _tokenMoods[newItemId] = mood;

        _safeMint(user, newItemId);
        userTokenId[user] = newItemId;
        hasMinted[user] = true;

        emit NFTMinted(user, newItemId);
        return newItemId;
    }

    function changeMood(address user, Mood newMood) public onlyOwner nonReentrant {
        require(hasMinted[user], "User has not minted an NFT");
        uint256 tokenId = userTokenId[user];
        require(ownerOf(tokenId) == msg.sender, "Not the owner");

        Mood oldMood = _tokenMoods[tokenId];
        require(oldMood != newMood, "New mood must be different from the current mood");
        _tokenMoods[tokenId] = newMood;

        emit MoodChanged(tokenId, oldMood, newMood);
    }

    function getMood(uint256 tokenId) public view returns (Mood) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenMoods[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        
        string memory baseURL = "https://ton-app.vercel.app/api/metadata/";
        Mood mood = _tokenMoods[tokenId];
        
        return string(abi.encodePacked(baseURL, _toString(tokenId), "?mood=", _toString(uint256(mood))));
    }

    function getTokenIdByAddress(address user) public view returns (uint256) {
        require(hasMinted[user], "User has no NFT");
        return userTokenId[user];
    }

    function totalSupply() public view returns (uint256) {
        return tokenCounter;
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

}