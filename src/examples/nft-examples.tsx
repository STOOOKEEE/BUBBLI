/**
 * Examples of how to use the NFT components
 * 
 * This file contains code examples for developers
 * who want to integrate or customize the NFT gallery
 */

import React from "react";
import { NFTCard, NFTGallery, MoodSelector, FriendsList, NFTCollection } from "~/components/ui/nft";
import { useNFTCollection } from "~/hooks/useNFTCollection";
import { Mood, NFT } from "~/types/nft";

// ============================================================================
// Example 1: Basic NFT Collection (Ready to use)
// ============================================================================

export function Example1_BasicCollection() {
  return <NFTCollection />;
}

// ============================================================================
// Example 2: Custom NFT Gallery with manual data
// ============================================================================

export function Example2_CustomGallery() {
  const customNFTs: NFT[] = [
    {
      id: "1",
      name: "My Custom NFT",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      collection: "Custom Collection",
      owner: "me",
      currentMood: Mood.Happy,
    },
  ];

  return (
    <NFTGallery
      nfts={customNFTs}
      onMoodChange={(id, mood) => console.log(`Changed ${id} to ${mood}`)}
    />
  );
}

// ============================================================================
// Example 3: Single NFT Card
// ============================================================================

export function Example3_SingleCard() {
  const singleNFT: NFT = {
    id: "1",
    name: "Awesome NFT #42",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    collection: "Awesome Collection",
    owner: "currentUser",
    currentMood: Mood.Normal,
    description: "This is an amazing NFT!",
    traits: {
      rarity: "Legendary",
      power: "9000",
    },
  };

  return (
    <div className="max-w-sm">
      <NFTCard
        nft={singleNFT}
        onMoodChange={(id, mood) => console.log(`Mood changed to ${mood}`)}
      />
    </div>
  );
}

// ============================================================================
// Example 4: Mood Selector standalone
// ============================================================================

export function Example4_MoodSelector() {
  const [currentMood, setCurrentMood] = React.useState(Mood.Normal);

  return (
    <div className="max-w-md space-y-4">
      <h3>Compact Mode</h3>
      <MoodSelector
        currentMood={currentMood}
        onMoodChange={setCurrentMood}
        compact={true}
      />

      <h3>Full Mode</h3>
      <MoodSelector
        currentMood={currentMood}
        onMoodChange={setCurrentMood}
        compact={false}
      />
    </div>
  );
}

// ============================================================================
// Example 5: Using the custom hook
// ============================================================================

export function Example5_CustomHook() {
  const {
    displayedNFTs,
    friends,
    selectedFriend,
    setSelectedFriend,
    handleMoodChange,
    isLoading,
    error,
  } = useNFTCollection();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <FriendsList
        friends={friends}
        selectedFriend={selectedFriend}
        onSelectFriend={setSelectedFriend}
      />

      <NFTGallery
        nfts={displayedNFTs}
        onMoodChange={handleMoodChange}
        readonly={selectedFriend !== null}
      />
    </div>
  );
}

// ============================================================================
// Example 6: Read-only gallery (for viewing friends' NFTs)
// ============================================================================

export function Example6_ReadOnlyGallery() {
  const friendNFTs: NFT[] = [
    // ... friend's NFTs
  ];

  return (
    <NFTGallery
      nfts={friendNFTs}
      readonly={true} // Can't change moods
      emptyMessage="Your friend has no NFTs yet"
    />
  );
}

// ============================================================================
// Example 7: Custom styling and layout
// ============================================================================

export function Example7_CustomStyling() {
  const { displayedNFTs, handleMoodChange } = useNFTCollection();

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          My Awesome Gallery
        </h1>

        <NFTGallery
          nfts={displayedNFTs}
          onMoodChange={handleMoodChange}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Example 8: With search/filter (implementation needed)
// ============================================================================

export function Example8_WithSearch() {
  const { displayedNFTs, handleMoodChange } = useNFTCollection();
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredNFTs = displayedNFTs.filter(nft =>
    nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nft.collection.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search NFTs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
      />

      <NFTGallery
        nfts={filteredNFTs}
        onMoodChange={handleMoodChange}
        emptyMessage="No NFTs match your search"
      />
    </div>
  );
}

// ============================================================================
// Example 9: Integration with real NFT API (template)
// ============================================================================

export function Example9_RealAPI() {
  const [nfts, setNFTs] = React.useState<NFT[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchNFTs() {
      try {
        // Replace with your API endpoint
        // const response = await fetch(`https://api.opensea.io/api/v2/chain/ethereum/account/${walletAddress}/nfts`);
        // const data = await response.json();
        
        // Transform API data to NFT format
        // const transformedNFTs = data.nfts.map(transformNFT);
        // setNFTs(transformedNFTs);
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch NFTs:", error);
        setLoading(false);
      }
    }

    fetchNFTs();
  }, []);

  return (
    <NFTGallery
      nfts={nfts}
      isLoading={loading}
      onMoodChange={(id, mood) => {
        // Update locally
        setNFTs(prev => prev.map(nft =>
          nft.id === id ? { ...nft, currentMood: mood } : nft
        ));
        
        // Optionally sync with backend
        // saveMoodToBackend(id, mood);
      }}
    />
  );
}

// ============================================================================
// Example 10: Custom empty state
// ============================================================================

export function Example10_CustomEmptyState() {
  const nfts: NFT[] = []; // Empty for demo

  if (nfts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎨</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          No NFTs Yet
        </h3>
        <p className="text-gray-600 mb-6">
          Start collecting NFTs to see them here!
        </p>
        <button className="btn btn-primary">
          Browse Marketplace
        </button>
      </div>
    );
  }

  return <NFTGallery nfts={nfts} />;
}

// ============================================================================
// Utility: Transform OpenSea NFT to our format
// ============================================================================

function transformOpenSeaNFT(openSeaNFT: any): NFT {
  return {
    id: openSeaNFT.identifier,
    name: openSeaNFT.name || `#${openSeaNFT.identifier}`,
    image: openSeaNFT.image_url,
    collection: openSeaNFT.collection,
    owner: openSeaNFT.owner,
    currentMood: Mood.Normal, // Default mood
    description: openSeaNFT.description,
    traits: openSeaNFT.traits?.reduce((acc: any, trait: any) => {
      acc[trait.trait_type] = trait.value;
      return acc;
    }, {}),
  };
}

// ============================================================================
// Utility: Save mood to localStorage
// ============================================================================

function saveMoodToLocalStorage(nftId: string, mood: Mood) {
  const key = `nft-mood-${nftId}`;
  localStorage.setItem(key, mood);
}

function loadMoodFromLocalStorage(nftId: string): Mood | null {
  const key = `nft-mood-${nftId}`;
  const saved = localStorage.getItem(key);
  return saved as Mood | null;
}

// ============================================================================
// Export all examples
// ============================================================================

export const examples = {
  basic: Example1_BasicCollection,
  custom: Example2_CustomGallery,
  card: Example3_SingleCard,
  mood: Example4_MoodSelector,
  hook: Example5_CustomHook,
  readonly: Example6_ReadOnlyGallery,
  styling: Example7_CustomStyling,
  search: Example8_WithSearch,
  api: Example9_RealAPI,
  empty: Example10_CustomEmptyState,
};
