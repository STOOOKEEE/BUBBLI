/**
 * Demo standalone page for NFT Gallery
 * 
 * This page can be used to test the NFT gallery independently
 * without needing the full Farcaster mini app context
 * 
 * Access at: http://localhost:3000/demo/nft
 */

"use client";

import { NFTCollection } from "~/components/ui/nft/NFTCollection";

export default function NFTDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-7xl px-4">
        {/* Demo Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Mode Démo - Données de test
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 BUBBLI NFT Gallery
          </h1>
          <p className="text-gray-600">
            Interface de démonstration de la galerie NFT
          </p>
        </div>

        {/* Main Gallery */}
        <div className="bg-white rounded-3xl shadow-lg p-8">
          <NFTCollection />
        </div>

        {/* Demo Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">🎭</div>
            <h3 className="font-semibold text-gray-900 mb-1">6 Humeurs</h3>
            <p className="text-sm text-gray-600">
              Personnalisez vos NFTs avec différentes expressions
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900 mb-1">Social</h3>
            <p className="text-sm text-gray-600">
              Explorez les collections de vos amis
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="text-3xl mb-2">✨</div>
            <h3 className="font-semibold text-gray-900 mb-1">Responsive</h3>
            <p className="text-sm text-gray-600">
              Design adaptatif pour tous les écrans
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
