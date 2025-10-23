/**
 * Types and interfaces for NFT collection management
 */

/**
 * Available moods/expressions for NFT customization
 */
export enum Mood {
  Normal = "normal",
  Happy = "happy",
  Sad = "sad",
  Surprised = "surprised",
  Excited = "excited",
  Cool = "cool",
}

/**
 * Mood configuration with visual representation
 */
export interface MoodConfig {
  id: Mood;
  label: string;
  emoji: string;
  color: string;
}

/**
 * NFT metadata and properties
 */
export interface NFT {
  id: string;
  name: string;
  image: string;
  collection: string;
  owner: string;
  currentMood: Mood;
  description?: string;
  traits?: Record<string, string>;
}

/**
 * User profile with NFT collection
 */
export interface UserProfile {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl?: string;
  nfts: NFT[];
  isFriend?: boolean;
}

/**
 * Available mood configurations
 */
export const MOODS: MoodConfig[] = [
  { id: Mood.Normal, label: "Normal", emoji: "😊", color: "#94a3b8" },
  { id: Mood.Happy, label: "Joyeux", emoji: "😄", color: "#fbbf24" },
  { id: Mood.Sad, label: "Triste", emoji: "😢", color: "#60a5fa" },
  { id: Mood.Surprised, label: "Surpris", emoji: "😲", color: "#f472b6" },
  { id: Mood.Excited, label: "Excité", emoji: "🤩", color: "#a78bfa" },
  { id: Mood.Cool, label: "Cool", emoji: "😎", color: "#34d399" },
];
