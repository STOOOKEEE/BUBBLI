// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import "../src/MoodNFT.sol";

contract MoodNFTTest is Test {
    MoodNFT public nft;
    address public owner;
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        owner = address(this);
        nft = new MoodNFT();
    }

    // Test 1: Mint basique avec humeur HAPPY
    function testMintNFTHappy() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        assertEq(nft.ownerOf(tokenId), user1);
        assertEq(uint256(nft.getMood(tokenId)), uint256(MoodNFT.Mood.HAPPY));
        assertTrue(nft.hasMinted(user1));
        assertEq(nft.totalSupply(), 1);
    }

    // Test 2: Mint avec différentes humeurs
    function testMintWithDifferentMoods() public {
        uint256 id1 = nft.mintNFT(user1, MoodNFT.Mood.SAD);
        uint256 id2 = nft.mintNFT(user2, MoodNFT.Mood.EXCITED);
        
        assertEq(uint256(nft.getMood(id1)), uint256(MoodNFT.Mood.SAD));
        assertEq(uint256(nft.getMood(id2)), uint256(MoodNFT.Mood.EXCITED));
    }

    // Test 3: Ne peut pas minter deux fois
    function testCannotMintTwice() public {
        nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.expectRevert("User has already minted an NFT");
        nft.mintNFT(user1, MoodNFT.Mood.SAD);
    }

    // Test 4: Seul le owner peut minter
    function testOnlyOwnerCanMint() public {
        vm.prank(user1);
        vm.expectRevert();
        nft.mintNFT(user2, MoodNFT.Mood.HAPPY);
    }

    // Test 5: Changer l'humeur
    function testChangeMood() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.prank(user1);
        nft.changeMood(MoodNFT.Mood.SAD);
        
        assertEq(uint256(nft.getMood(tokenId)), uint256(MoodNFT.Mood.SAD));
    }

    // Test 6: Tester toutes les humeurs
    function testAllMoods() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.startPrank(user1);
        
        nft.changeMood(MoodNFT.Mood.SAD);
        assertEq(uint256(nft.getMood(tokenId)), 1);
        
        nft.changeMood(MoodNFT.Mood.EXCITED);
        assertEq(uint256(nft.getMood(tokenId)), 2);
        
        nft.changeMood(MoodNFT.Mood.CALM);
        assertEq(uint256(nft.getMood(tokenId)), 3);
        
        nft.changeMood(MoodNFT.Mood.ANGRY);
        assertEq(uint256(nft.getMood(tokenId)), 4);
        
        vm.stopPrank();
    }

    // Test 7: Ne peut pas changer vers la même humeur
    function testCannotChangeSameMood() public {
        nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.prank(user1);
        vm.expectRevert("New mood must be different from the current mood");
        nft.changeMood(MoodNFT.Mood.HAPPY);
    }

    // Test 8: Seul le propriétaire peut changer son humeur
    function testOnlyOwnerCanChangeMood() public {
        nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.prank(user2); // user2 essaie de changer l'humeur de user1
        vm.expectRevert("User has not minted an NFT");
        nft.changeMood(MoodNFT.Mood.SAD);
    }

    // Test 9: TokenURI contient les bonnes informations
    function testTokenURI() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.EXCITED);
        
        string memory uri = nft.tokenURI(tokenId);
        
        // Vérifie que l'URI contient le tokenId et le mood
        assertTrue(bytes(uri).length > 0);
        // L'URI devrait être "0?mood=2" (si baseURL est vide)
    }

    // Test 10: Récupérer le token ID par adresse
    function testGetTokenIdByAddress() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.CALM);
        
        assertEq(nft.getTokenIdByAddress(user1), tokenId);
    }

    // Test 11: Erreur si user n'a pas de NFT
    function testGetTokenIdByAddressRevert() public {
        vm.expectRevert("User has no NFT");
        nft.getTokenIdByAddress(user1);
    }

    // Test 12: Events émis correctement
    function testMintEvent() public {
        vm.expectEmit(true, false, false, true);
        emit MoodNFT.NFTMinted(user1, 0);
        
        nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
    }

    function testMoodChangeEvent() public {
        uint256 tokenId = nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        
        vm.expectEmit(true, false, false, true);
        emit MoodNFT.MoodChanged(tokenId, MoodNFT.Mood.HAPPY, MoodNFT.Mood.SAD);
        
        vm.prank(user1);
        nft.changeMood(MoodNFT.Mood.SAD);
    }

    // Test 13: Total supply augmente correctement
    function testTotalSupply() public {
        assertEq(nft.totalSupply(), 0);
        
        nft.mintNFT(user1, MoodNFT.Mood.HAPPY);
        assertEq(nft.totalSupply(), 1);
        
        nft.mintNFT(user2, MoodNFT.Mood.SAD);
        assertEq(nft.totalSupply(), 2);
    }
}
