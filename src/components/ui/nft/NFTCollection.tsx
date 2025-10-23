"use client";

import { NFTGallery } from "./NFTGallery";
import { FriendsList } from "./FriendsList";
import { useNFTCollection } from "~/hooks/useNFTCollection";

/**
 * NFTCollection component - Main page for NFT gallery
 * 
 * Features:
 * - Display user's NFT collection
 * - Browse friends' collections
 * - Change NFT moods
 * - Smooth transitions and animations
 * - Loading states
 */
export function NFTCollection() {
  const {
    displayedNFTs,
    friends,
    selectedFriend,
    setSelectedFriend,
    handleMoodChange,
    isOwnCollection,
    isLoading,
  } = useNFTCollection();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          Collection NFT
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explorez votre collection et personnalisez l&apos;humeur de vos NFTs. 
          Découvrez aussi les collections de vos amis !
        </p>
      </div>

      {/* Friends List */}
      {!isLoading && friends.length > 0 && (
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={setSelectedFriend}
        />
      )}

      {/* Collection Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {selectedFriend ? selectedFriend.displayName : "Ma Collection"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {displayedNFTs.length} NFT{displayedNFTs.length > 1 ? 's' : ''}
          </p>
        </div>

        {!isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>En ligne</span>
          </div>
        )}
      </div>

      {/* NFT Gallery */}
      <NFTGallery
        nfts={displayedNFTs}
        onMoodChange={isOwnCollection ? handleMoodChange : undefined}
        readonly={!isOwnCollection}
        isLoading={isLoading}
        emptyMessage={
          selectedFriend 
            ? `${selectedFriend.displayName} n'a pas encore de NFTs`
            : "Vous n'avez pas encore de NFTs"
        }
      />

      {/* Tips section */}
      {!isLoading && isOwnCollection && displayedNFTs.length > 0 && (
        <div className="mt-12 p-6 bg-gradient-to-br from-primary/5 to-primary-light/5 rounded-2xl border border-primary/10">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Astuce</h3>
              <p className="text-sm text-gray-600">
                Cliquez sur un NFT pour voir les détails et changer son humeur. 
                Les humeurs permettent de personnaliser l&apos;apparence de vos NFTs selon votre état d&apos;esprit !
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
