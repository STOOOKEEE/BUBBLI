// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


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

    function mintNFT(address user, Mood mood) public onlyOwner nonReentrant returns (uint256) {
        require(!hasMinted[user], "User has already minted an NFT");
        require(user != address(0), "Invalid address");

        uint256 newItemId = tokenCounter;
        tokenCounter++;

        hasMinted[user] = true;
        userTokenId[user] = newItemId;
        _tokenMoods[newItemId] = mood;

        _safeMint(user, newItemId);

        emit NFTMinted(user, newItemId);
        return newItemId;
}


    function changeMood(Mood newMood) public nonReentrant {
        require(hasMinted[msg.sender], "User has not minted an NFT");
        uint256 tokenId = userTokenId[msg.sender];

        Mood oldMood = _tokenMoods[tokenId];
        require(oldMood != newMood, "New mood must be different from the current mood");
        _tokenMoods[tokenId] = newMood;

        emit MoodChanged(tokenId, oldMood, newMood);
    }

    function getMood(uint256 tokenId) public view returns (Mood) {
        _requireOwned(tokenId);
        return _tokenMoods[tokenId];
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        
        string memory baseURL = "";
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
            // forge-lint: disable-next-line(unsafe-typecast)
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

}