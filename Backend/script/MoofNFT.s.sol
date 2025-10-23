// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// Imports nécessaires
import "forge-std/Script.sol";
import "forge-std/console.sol";           // ← pour console.log
import "../src/MoodNFT.sol";

contract DeployScript is Script {
    function run() external returns (MoodNFT) {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        MoodNFT nft = new MoodNFT();
        
        // Maintenant console.log est reconnu
        console.log("========================================");
        console.log("MoodNFT deployed to:", address(nft));
        console.log("Deployer (Owner):", vm.addr(deployerPrivateKey));
        console.log("========================================");
        
        vm.stopBroadcast();
        return nft;
    }
}
