"use client";

import { UserProfile } from "~/types/nft";
import Image from "next/image";

interface FriendsListProps {
  friends: UserProfile[];
  selectedFriend: UserProfile | null;
  onSelectFriend: (friend: UserProfile | null) => void;
}

/**
 * FriendsList component displays a horizontal scrollable list of friends
 * 
 * Features:
 * - Horizontal scroll with smooth behavior
 * - Avatar display with fallback
 * - Active state indication
 * - "My Collection" button to return to user's NFTs
 */
export function FriendsList({ friends, selectedFriend, onSelectFriend }: FriendsListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Explorer les collections</h2>
      
      <div className="relative">
        {/* Scroll hint shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        {/* Friends scroll container */}
        <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
          {/* My Collection button */}
          <button
            onClick={() => onSelectFriend(null)}
            className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 ${
              selectedFriend === null
                ? 'bg-primary/10 border-2 border-primary shadow-sm'
                : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              selectedFriend === null 
                ? 'bg-primary text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`text-xs font-medium text-center max-w-[80px] truncate ${
              selectedFriend === null ? 'text-primary' : 'text-gray-700'
            }`}>
              Ma collection
            </span>
          </button>

          {/* Friends */}
          {friends.map((friend) => (
            <button
              key={friend.fid}
              onClick={() => onSelectFriend(friend)}
              className={`flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 ${
                selectedFriend?.fid === friend.fid
                  ? 'bg-primary/10 border-2 border-primary shadow-sm'
                  : 'bg-gray-50 border-2 border-transparent hover:border-gray-300'
              }`}
            >
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white">
                {friend.pfpUrl ? (
                  <Image
                    src={friend.pfpUrl}
                    alt={friend.displayName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark text-white font-bold text-xl">
                    {friend.displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              
              {/* Name and NFT count */}
              <div className="text-center max-w-[80px]">
                <p className={`text-xs font-medium truncate ${
                  selectedFriend?.fid === friend.fid ? 'text-primary' : 'text-gray-700'
                }`}>
                  {friend.displayName}
                </p>
                <p className="text-xs text-gray-500">
                  {friend.nfts.length} NFT{friend.nfts.length > 1 ? 's' : ''}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
