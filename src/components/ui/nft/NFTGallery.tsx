"use client";

import { NFT, Mood } from "~/types/nft";
import { NFTCard } from "./NFTCard";

interface NFTGalleryProps {
  nfts: NFT[];
  onMoodChange?: (nftId: string, mood: Mood) => void;
  readonly?: boolean;
  isLoading?: boolean;
  emptyMessage?: string;
}

/**
 * NFTGallery component displays a responsive grid of NFTs
 * 
 * Features:
 * - Responsive grid layout (1-4 columns)
 * - Loading states with skeletons
 * - Empty state handling
 * - Smooth animations
 */
export function NFTGallery({ 
  nfts, 
  onMoodChange, 
  readonly = false,
  isLoading = false,
  emptyMessage = "Aucun NFT trouvé"
}: NFTGalleryProps) {
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-2xl mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
          <svg 
            className="w-10 h-10 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {emptyMessage}
        </h3>
        <p className="text-gray-500">
          Cette collection ne contient pas encore de NFTs
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
      {nfts.map((nft, index) => (
        <div 
          key={nft.id}
          className="animate-in fade-in slide-in-from-bottom-4"
          style={{ 
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'backwards'
          }}
        >
          <NFTCard 
            nft={nft} 
            onMoodChange={onMoodChange}
            readonly={readonly}
          />
        </div>
      ))}
    </div>
  );
}
