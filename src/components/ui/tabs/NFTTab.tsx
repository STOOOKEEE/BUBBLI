"use client";

import { NFTCollection } from "../nft/NFTCollection";

/**
 * NFT Tab component for the main app
 * 
 * This tab displays the NFT collection gallery where users can:
 * - View their NFT collection
 * - Change moods/expressions of their NFTs
 * - Browse friends' NFT collections
 */
export default function NFTTab() {
  return (
    <div className="py-4">
      <NFTCollection />
    </div>
  );
}
