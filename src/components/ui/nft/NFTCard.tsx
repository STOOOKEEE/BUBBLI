"use client";

import { useState } from "react";
import { NFT, Mood, MOODS } from "~/types/nft";
import { MoodSelector } from "./MoodSelector";

interface NFTCardProps {
  nft: NFT;
  onMoodChange?: (nftId: string, mood: Mood) => void;
  readonly?: boolean;
}

/**
 * NFTCard component displays an individual NFT with mood customization
 * 
 * Features:
 * - Responsive card design
 * - Mood indicator and selector
 * - Smooth hover animations
 * - Detailed view on click
 * - Gradient backgrounds for visual appeal
 */
export function NFTCard({ nft, onMoodChange, readonly = false }: NFTCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const currentMoodConfig = MOODS.find(m => m.id === nft.currentMood);

  const handleMoodChange = (mood: Mood) => {
    if (!readonly && onMoodChange) {
      onMoodChange(nft.id, mood);
    }
  };

  return (
    <>
      <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
        {/* NFT Image */}
        <div 
          className="aspect-square relative overflow-hidden cursor-pointer"
          onClick={() => setShowDetails(true)}
        >
          <div 
            className="w-full h-full transform group-hover:scale-105 transition-transform duration-500"
            style={{ background: nft.image }}
          />
          
          {/* Mood indicator overlay */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
            <span className="text-lg">{currentMoodConfig?.emoji}</span>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Card content */}
        <div className="p-4 space-y-3">
          {/* NFT name and collection */}
          <div>
            <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
            <p className="text-sm text-gray-500 truncate">{nft.collection}</p>
          </div>

          {/* Mood selector */}
          {!readonly && onMoodChange && (
            <MoodSelector 
              currentMood={nft.currentMood}
              onMoodChange={handleMoodChange}
              compact
            />
          )}

          {readonly && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-lg">{currentMoodConfig?.emoji}</span>
              <span>{currentMoodConfig?.label}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Close button */}
            <div className="sticky top-0 right-0 p-4 flex justify-end bg-white/80 backdrop-blur-sm z-10">
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                aria-label="Close"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-8 pb-8 space-y-6">
              {/* NFT Image */}
              <div 
                className="aspect-square rounded-2xl shadow-lg"
                style={{ background: nft.image }}
              />

              {/* NFT Info */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">{nft.name}</h2>
                  <p className="text-lg text-gray-600 mt-1">{nft.collection}</p>
                </div>

                {nft.description && (
                  <p className="text-gray-700">{nft.description}</p>
                )}

                {/* Traits */}
                {nft.traits && Object.keys(nft.traits).length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-900">Traits</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(nft.traits).map(([key, value]) => (
                        <div key={key} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                          <p className="font-medium text-gray-900">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mood Selector */}
                {!readonly && onMoodChange && (
                  <div className="pt-4 border-t border-gray-200">
                    <MoodSelector 
                      currentMood={nft.currentMood}
                      onMoodChange={handleMoodChange}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
