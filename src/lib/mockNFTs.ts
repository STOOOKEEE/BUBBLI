import { NFT, Mood, UserProfile } from "~/types/nft";

/**
 * Mock NFT data for development and testing
 */

// Generate gradient images for NFTs (placeholder)
const generateNFTImage = (id: number): string => {
  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
  ];
  
  return gradients[id % gradients.length];
};

// Mock NFTs for the current user
export const mockUserNFTs: NFT[] = [
  {
    id: "1",
    name: "Cosmic Dream #42",
    image: generateNFTImage(0),
    collection: "Cosmic Dreams",
    owner: "currentUser",
    currentMood: Mood.Normal,
    description: "A beautiful cosmic creature",
    traits: {
      background: "Galaxy",
      eyes: "Starry",
      mouth: "Smile",
    },
  },
  {
    id: "2",
    name: "Digital Soul #108",
    image: generateNFTImage(1),
    collection: "Digital Souls",
    owner: "currentUser",
    currentMood: Mood.Happy,
    description: "Abstract digital art",
    traits: {
      background: "Neon",
      pattern: "Geometric",
      vibe: "Energetic",
    },
  },
  {
    id: "3",
    name: "Retro Wave #256",
    image: generateNFTImage(2),
    collection: "Retro Waves",
    owner: "currentUser",
    currentMood: Mood.Cool,
    description: "80s inspired artwork",
    traits: {
      era: "80s",
      style: "Synthwave",
      color: "Purple/Pink",
    },
  },
  {
    id: "4",
    name: "Nature Spirit #77",
    image: generateNFTImage(3),
    collection: "Nature Spirits",
    owner: "currentUser",
    currentMood: Mood.Normal,
    description: "Organic flowing forms",
    traits: {
      element: "Water",
      form: "Flowing",
      energy: "Calm",
    },
  },
  {
    id: "5",
    name: "Cyber Punk #512",
    image: generateNFTImage(4),
    collection: "Cyber Punks",
    owner: "currentUser",
    currentMood: Mood.Excited,
    description: "Futuristic cyber aesthetic",
    traits: {
      tech: "High",
      attitude: "Rebel",
      glow: "Neon",
    },
  },
  {
    id: "6",
    name: "Dream Weaver #33",
    image: generateNFTImage(5),
    collection: "Dream Weavers",
    owner: "currentUser",
    currentMood: Mood.Surprised,
    description: "Surreal dreamscape",
    traits: {
      realm: "Dreams",
      texture: "Soft",
      mood: "Ethereal",
    },
  },
];

// Mock friends' NFTs
export const mockFriendsProfiles: UserProfile[] = [
  {
    fid: 12345,
    username: "alice",
    displayName: "Alice Wonder",
    pfpUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    isFriend: true,
    nfts: [
      {
        id: "f1",
        name: "Mystic Art #99",
        image: generateNFTImage(6),
        collection: "Mystic Arts",
        owner: "alice",
        currentMood: Mood.Happy,
        description: "Mystical artwork",
      },
      {
        id: "f2",
        name: "Ocean Wave #44",
        image: generateNFTImage(7),
        collection: "Ocean Waves",
        owner: "alice",
        currentMood: Mood.Normal,
        description: "Peaceful ocean scene",
      },
      {
        id: "f3",
        name: "Fire Dance #88",
        image: generateNFTImage(0),
        collection: "Fire Dance",
        owner: "alice",
        currentMood: Mood.Excited,
        description: "Energetic fire patterns",
      },
    ],
  },
  {
    fid: 67890,
    username: "bob",
    displayName: "Bob Builder",
    pfpUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    isFriend: true,
    nfts: [
      {
        id: "f4",
        name: "Tech Nexus #222",
        image: generateNFTImage(1),
        collection: "Tech Nexus",
        owner: "bob",
        currentMood: Mood.Cool,
        description: "Technological marvel",
      },
      {
        id: "f5",
        name: "Abstract Mind #111",
        image: generateNFTImage(2),
        collection: "Abstract Minds",
        owner: "bob",
        currentMood: Mood.Normal,
        description: "Abstract thoughts visualized",
      },
    ],
  },
  {
    fid: 11111,
    username: "charlie",
    displayName: "Charlie Creator",
    pfpUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=charlie",
    isFriend: true,
    nfts: [
      {
        id: "f6",
        name: "Digital Harmony #555",
        image: generateNFTImage(3),
        collection: "Digital Harmony",
        owner: "charlie",
        currentMood: Mood.Happy,
        description: "Perfect balance",
      },
      {
        id: "f7",
        name: "Pixel Dream #777",
        image: generateNFTImage(4),
        collection: "Pixel Dreams",
        owner: "charlie",
        currentMood: Mood.Surprised,
        description: "Pixelated wonder",
      },
      {
        id: "f8",
        name: "Neon Night #333",
        image: generateNFTImage(5),
        collection: "Neon Nights",
        owner: "charlie",
        currentMood: Mood.Normal,
        description: "Glowing city nights",
      },
      {
        id: "f9",
        name: "Space Odyssey #999",
        image: generateNFTImage(6),
        collection: "Space Odyssey",
        owner: "charlie",
        currentMood: Mood.Cool,
        description: "Journey through stars",
      },
    ],
  },
];

// Mock current user profile
export const mockCurrentUser: UserProfile = {
  fid: 99999,
  username: "you",
  displayName: "Your Collection",
  pfpUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=you",
  nfts: mockUserNFTs,
};
