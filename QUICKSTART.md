# 🚀 Guide de Démarrage Rapide - BUBBLI NFT Gallery

## Accès rapide

### 1. Dans l'app principale
1. Lancez l'application : `npm run dev`
2. Cliquez sur l'onglet **🎨 NFTs** dans le footer
3. Explorez votre collection !

### 2. Page de démo standalone
1. Lancez l'application : `npm run dev`
2. Accédez à : `http://localhost:3000/demo/nft`
3. Testez toutes les fonctionnalités sans le contexte Farcaster

## 🎯 Fonctionnalités principales

### Changer l'humeur d'un NFT
1. Cliquez sur le bouton d'humeur (en haut à droite de chaque carte)
2. Sélectionnez une nouvelle humeur dans le menu déroulant
3. L'humeur change instantanément !

### Voir les détails d'un NFT
1. Cliquez n'importe où sur une carte NFT
2. Une modal s'ouvre avec tous les détails
3. Vous pouvez aussi changer l'humeur depuis cette vue

### Explorer les collections d'amis
1. Faites défiler la liste horizontale en haut
2. Cliquez sur l'avatar d'un ami
3. Sa collection s'affiche
4. Cliquez sur "Ma Collection" pour revenir

## 📱 Navigation

```
Footer Navigation:
🏠 Home    →  Page d'accueil
🎨 NFTs    →  Galerie NFT (NOUVEAU!)
⚡ Actions →  Actions Farcaster
📋 Context →  Informations contextuelles
👛 Wallet  →  Portefeuille (si activé)
```

## 🎨 Personnalisation

### Changer la couleur principale

Dans `tailwind.config.ts` :
```typescript
colors: {
  primary: "#8b5cf6",        // Votre couleur
  "primary-light": "#a78bfa",
  "primary-dark": "#7c3aed",
}
```

Toute l'app s'adaptera automatiquement !

### Ajouter des humeurs personnalisées

Dans `src/types/nft.ts` :
```typescript
export enum Mood {
  // Humeurs existantes...
  Custom = "custom",
}

export const MOODS: MoodConfig[] = [
  // Humeurs existantes...
  { 
    id: Mood.Custom, 
    label: "Personnalisé", 
    emoji: "🎭", 
    color: "#ff6b6b" 
  },
];
```

## 🔧 Développement

### Structure des composants

```
NFTCollection (Page principale)
    ├── FriendsList (Navigation sociale)
    └── NFTGallery (Grille)
        └── NFTCard (Carte individuelle)
            └── MoodSelector (Sélecteur d'humeur)
```

### Hook personnalisé

Utilisez `useNFTCollection()` pour gérer l'état :

```typescript
import { useNFTCollection } from "~/hooks/useNFTCollection";

const {
  displayedNFTs,      // NFTs actuellement affichés
  friends,            // Liste des amis
  selectedFriend,     // Ami sélectionné
  setSelectedFriend,  // Changer l'ami sélectionné
  handleMoodChange,   // Changer l'humeur d'un NFT
  isLoading,          // État de chargement
} = useNFTCollection();
```

## 🌐 Intégration API

### Pour connecter une vraie API NFT :

1. **OpenSea API** :
```typescript
// src/lib/nftApi.ts
export async function fetchUserNFTs(walletAddress: string) {
  const response = await fetch(
    `https://api.opensea.io/api/v2/chain/ethereum/account/${walletAddress}/nfts`,
    {
      headers: {
        'X-API-KEY': process.env.OPENSEA_API_KEY!
      }
    }
  );
  return response.json();
}
```

2. **Mettre à jour le hook** :
```typescript
// src/hooks/useNFTCollection.ts
if (!useMockData) {
  const nfts = await fetchUserNFTs(walletAddress);
  setUserNFTs(transformToNFTFormat(nfts));
}
```

### Pour récupérer les amis Farcaster :

Utilisez l'API Neynar déjà intégrée :
```typescript
import { useNeynarUser } from "~/hooks/useNeynarUser";

const { user } = useNeynarUser(context);
const friends = user?.following || [];
```

## ✨ Animations

Toutes les animations sont définies dans `globals.css` :

- `fade-in` : Apparition en fondu
- `slide-in-from-bottom-4` : Montée depuis le bas
- `zoom-in-95` : Zoom avant
- `scrollbar-hide` : Cache les scrollbars

## 🐛 Debugging

### Les NFTs ne s'affichent pas
1. Vérifiez la console pour les erreurs
2. Assurez-vous que `useMockData: true` dans le hook
3. Vérifiez que les données mock sont importées

### Les humeurs ne changent pas
1. Vérifiez que `onMoodChange` est bien passé à `NFTGallery`
2. Vérifiez que `readonly={false}` pour votre collection
3. Consultez la console pour les erreurs d'état

### Les animations ne fonctionnent pas
1. Vérifiez que Tailwind compile correctement
2. Vérifiez `globals.css` pour les keyframes
3. Testez avec `npm run build` pour voir les erreurs de build

## 📊 Données de test

### Collections disponibles :
- **Vous** : 6 NFTs avec différentes humeurs
- **Alice** : 3 NFTs
- **Bob** : 2 NFTs  
- **Charlie** : 4 NFTs

Tous avec des gradients uniques et des métadonnées !

## 🚢 Déploiement

1. Build de production :
```bash
npm run build
```

2. Test du build :
```bash
npm run start
```

3. Déploiement Vercel :
```bash
npm run deploy:vercel
```

## 💡 Astuces

### Performance
- Les gradients CSS sont plus rapides que les images
- Les animations utilisent `transform` (GPU-accelerated)
- Le lazy loading est automatique avec Next.js

### UX
- Touch targets de 44x44px minimum
- Feedbacks visuels sur toutes les interactions
- Messages d'erreur/vide explicites

### Accessibilité
- Tous les boutons ont des `aria-label`
- Contraste de couleurs WCAG AA
- Navigation clavier fonctionnelle

## 📚 Ressources

- [Documentation Farcaster](https://docs.farcaster.xyz/)
- [Neynar API](https://docs.neynar.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenSea API](https://docs.opensea.io/)

---

**Besoin d'aide ?** Consultez `NFT_FEATURES.md` pour la documentation complète ! 🎨
