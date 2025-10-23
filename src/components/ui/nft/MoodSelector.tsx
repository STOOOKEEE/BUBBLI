"use client";

import { useState } from "react";
import { Mood, MOODS } from "~/types/nft";

interface MoodSelectorProps {
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
  compact?: boolean;
}

/**
 * MoodSelector component allows users to change the mood/expression of an NFT
 * 
 * Features:
 * - Visual mood options with emojis
 * - Smooth animations
 * - Active state indication
 * - Compact mode for inline display
 */
export function MoodSelector({ currentMood, onMoodChange, compact = false }: MoodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
          aria-label="Change mood"
        >
          <span className="text-lg">
            {MOODS.find(m => m.id === currentMood)?.emoji}
          </span>
          <span className="text-xs font-medium text-gray-700">
            {MOODS.find(m => m.id === currentMood)?.label}
          </span>
          <svg 
            className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute top-full mt-2 right-0 z-20 bg-white rounded-xl shadow-xl border border-gray-200 p-2 min-w-[200px] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="space-y-1">
                {MOODS.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => {
                      onMoodChange(mood.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentMood === mood.id
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-xl">{mood.emoji}</span>
                    <span className="text-sm">{mood.label}</span>
                    {currentMood === mood.id && (
                      <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Full grid view
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Choisir une humeur</h3>
      <div className="grid grid-cols-3 gap-2">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodChange(mood.id)}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 ${
              currentMood === mood.id
                ? 'bg-primary/10 border-2 border-primary shadow-sm scale-105'
                : 'bg-gray-50 border-2 border-transparent hover:border-gray-300 hover:shadow-sm'
            }`}
            style={{
              ...(currentMood === mood.id && {
                backgroundColor: `${mood.color}15`,
              })
            }}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className={`text-xs font-medium ${
              currentMood === mood.id ? 'text-primary' : 'text-gray-600'
            }`}>
              {mood.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
