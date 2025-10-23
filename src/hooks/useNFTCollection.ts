/**
 * Custom hook for managing NFT collection state
 * 
 * This hook provides a clean interface for:
 * - Loading NFT data
 * - Changing NFT moods
 * - Managing friends' collections
 * - Handling loading states
 */

import { useState, useEffect, useCallback } from "react";
import { NFT, Mood, UserProfile } from "~/types/nft";
import { mockCurrentUser, mockFriendsProfiles } from "~/lib/mockNFTs";

interface UseNFTCollectionOptions {
  // Future: Add FID or user context when integrating with real API
  useMockData?: boolean;
  autoLoad?: boolean;
}

interface UseNFTCollectionReturn {
  // User's NFTs
  userNFTs: NFT[];
  setUserNFTs: React.Dispatch<React.SetStateAction<NFT[]>>;
  
  // Friends data
  friends: UserProfile[];
  selectedFriend: UserProfile | null;
  setSelectedFriend: (friend: UserProfile | null) => void;
  
  // Current display
  displayedNFTs: NFT[];
  isOwnCollection: boolean;
  
  // Actions
  handleMoodChange: (nftId: string, mood: Mood) => void;
  refreshNFTs: () => Promise<void>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook to manage NFT collection state and operations
 */
export function useNFTCollection(
  options: UseNFTCollectionOptions = {}
): UseNFTCollectionReturn {
  const { useMockData = true, autoLoad = true } = options;

  const [userNFTs, setUserNFTs] = useState<NFT[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [selectedFriend, setSelectedFriend] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load NFT data
  const loadNFTs = useCallback(async () => {
    if (!autoLoad && userNFTs.length > 0) return;

    setIsLoading(true);
    setError(null);

    try {
      if (useMockData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setUserNFTs(mockCurrentUser.nfts);
        setFriends(mockFriendsProfiles);
      } else {
        // TODO: Integrate with real NFT API (OpenSea, Zora, etc.)
        // const nfts = await fetchUserNFTs(userFid);
        // const friendsList = await fetchFriends(userFid);
        // setUserNFTs(nfts);
        // setFriends(friendsList);
        throw new Error("Real API integration not yet implemented");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load NFTs");
      console.error("Error loading NFTs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [useMockData, autoLoad, userNFTs.length]);

  // Initial load
  useEffect(() => {
    if (autoLoad) {
      loadNFTs();
    }
  }, [autoLoad, loadNFTs]);

  // Handle mood change for user's NFTs
  const handleMoodChange = useCallback((nftId: string, mood: Mood) => {
    setUserNFTs(prev =>
      prev.map(nft =>
        nft.id === nftId ? { ...nft, currentMood: mood } : nft
      )
    );

    // TODO: Persist mood change to backend/localStorage
    // saveMoodPreference(nftId, mood);
  }, []);

  // Refresh NFTs
  const refreshNFTs = useCallback(async () => {
    await loadNFTs();
  }, [loadNFTs]);

  // Compute displayed NFTs based on selection
  const displayedNFTs = selectedFriend ? selectedFriend.nfts : userNFTs;
  const isOwnCollection = selectedFriend === null;

  return {
    userNFTs,
    setUserNFTs,
    friends,
    selectedFriend,
    setSelectedFriend,
    displayedNFTs,
    isOwnCollection,
    handleMoodChange,
    refreshNFTs,
    isLoading,
    error,
  };
}

/**
 * Hook to persist mood changes to localStorage
 * Useful for maintaining mood preferences across sessions
 */
export function useMoodPersistence(nftId: string) {
  const key = `nft-mood-${nftId}`;

  const saveMood = useCallback((mood: Mood) => {
    try {
      localStorage.setItem(key, mood);
    } catch (err) {
      console.error("Failed to save mood:", err);
    }
  }, [key]);

  const loadMood = useCallback((): Mood | null => {
    try {
      const saved = localStorage.getItem(key);
      return saved as Mood | null;
    } catch (err) {
      console.error("Failed to load mood:", err);
      return null;
    }
  }, [key]);

  return { saveMood, loadMood };
}
