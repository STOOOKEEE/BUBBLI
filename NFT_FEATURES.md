# 🎨 BUBBLI - NFT Collection Gallery

Une mini-app Farcaster élégante et minimaliste pour afficher et personnaliser votre collection NFT.

## ✨ Fonctionnalités

### 🖼️ Galerie NFT
- **Affichage de collection** : Visualisez votre collection NFT dans une grille responsive
- **Collections des amis** : Explorez les NFTs de vos amis Farcaster
- **Design adaptatif** : Grille 1-4 colonnes selon la taille de l'écran

### 🎭 Personnalisation d'humeurs
- **6 humeurs disponibles** :
  - 😊 Normal
  - 😄 Joyeux
  - 😢 Triste
  - 😲 Surpris
  - 🤩 Excité
  - 😎 Cool
- **Changement en temps réel** : Modifiez l'humeur de vos NFTs instantanément
- **Sélecteur compact** : Interface dropdown élégante sur chaque carte

### 🎯 Détails NFT
- **Modal détaillée** : Cliquez sur un NFT pour voir les informations complètes
- **Traits affichés** : Visualisez tous les attributs de vos NFTs
- **Changement d'humeur** : Modifiez l'humeur depuis la vue détaillée

### 👥 Navigation sociale
- **Liste d'amis** : Scroll horizontal avec avatars
- **Indicateur de sélection** : Bordure colorée sur l'ami actif
- **Retour à ma collection** : Bouton "Ma Collection" toujours accessible

## 🎨 Design

### Esthétique
- **Minimaliste** : Design épuré et sobre
- **Palette neutre** : Blanc, gris clair, accents violets
- **Typographie moderne** : Police Inter pour une lecture optimale
- **Cartes élégantes** : Ombres douces et bordures arrondies

### Animations
- **Transitions fluides** : Durées optimisées (200-500ms)
- **Hover effects** : Zoom et ombres sur survol
- **Fade-in** : Apparition progressive des NFTs
- **Slide-in** : Animation de montée pour les cartes
- **Modal animations** : Zoom-in pour les vues détaillées

### Responsive
- **Mobile first** : Optimisé pour petits écrans
- **Breakpoints** :
  - Mobile : 1 colonne
  - Tablet : 2 colonnes
  - Desktop : 3-4 colonnes
- **Touch friendly** : Boutons et zones de clic optimisés

## 🏗️ Architecture

### Structure des fichiers
```
src/
├── types/
│   └── nft.ts                    # Types TypeScript (NFT, Mood, UserProfile)
├── lib/
│   └── mockNFTs.ts               # Données mock pour développement
├── components/
│   └── ui/
│       └── nft/
│           ├── NFTCard.tsx       # Carte NFT individuelle
│           ├── NFTGallery.tsx    # Grille de NFTs
│           ├── MoodSelector.tsx  # Sélecteur d'humeur
│           ├── FriendsList.tsx   # Liste des amis
│           ├── NFTCollection.tsx # Page principale
│           └── index.ts          # Exports
```

### Composants

#### NFTCard
Affiche un NFT avec :
- Image (gradient pour mock)
- Nom et collection
- Indicateur d'humeur
- Sélecteur d'humeur (mode compact)
- Modal détaillée au clic

#### NFTGallery
Grille responsive avec :
- Layout adaptatif
- États de chargement (skeletons)
- Message d'état vide
- Animations décalées

#### MoodSelector
Deux modes :
- **Compact** : Dropdown avec humeur actuelle
- **Full** : Grille 3x2 pour sélection détaillée

#### FriendsList
Liste horizontale avec :
- Scroll fluide
- Avatars circulaires
- Compteur de NFTs
- État actif

#### NFTCollection
Page principale qui :
- Gère l'état global
- Charge les données
- Gère la navigation amis/utilisateur
- Affiche les tips

## 🔧 Utilisation

### Développement avec mock data
```typescript
import { mockCurrentUser, mockFriendsProfiles } from '~/lib/mockNFTs';

// Utilisateur actuel avec 6 NFTs
const user = mockCurrentUser;

// 3 amis avec leurs collections
const friends = mockFriendsProfiles;
```

### Intégration API réelle

Pour connecter à une vraie API NFT :

```typescript
// 1. Créer un hook pour récupérer les NFTs
const useUserNFTs = (fid: number) => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  
  useEffect(() => {
    // Appel API (OpenSea, Zora, etc.)
    fetchNFTs(fid).then(setNFTs);
  }, [fid]);
  
  return nfts;
};

// 2. Remplacer dans NFTCollection
const userNFTs = useUserNFTs(context?.user.fid);
```

### Personnalisation des couleurs

Dans `tailwind.config.ts` :
```typescript
colors: {
  primary: "#8b5cf6", // Changez cette couleur
  "primary-light": "#a78bfa",
  "primary-dark": "#7c3aed",
}
```

## 🚀 Prochaines étapes

### Intégration API
- [ ] Connexion à OpenSea API
- [ ] Support Zora
- [ ] Cache des données NFT
- [ ] Refresh périodique

### Fonctionnalités
- [ ] Recherche/filtrage
- [ ] Tri (par nom, collection, date)
- [ ] Favoris
- [ ] Partage de NFT
- [ ] Notifications de nouveaux NFTs

### Personnalisation avancée
- [ ] Filtres photo sur NFT
- [ ] Frames personnalisés
- [ ] Stickers et décorations
- [ ] Export d'image

### Social
- [ ] Commentaires sur NFTs
- [ ] Likes
- [ ] Collections partagées
- [ ] Galeries thématiques

## 📱 Navigation

L'onglet NFT est accessible via :
- **Footer** : Icône 🎨 "NFTs"
- **Position** : 2ème onglet (après Home)

## 🎯 Design System

### Composants réutilisables
Tous les composants suivent les principes :
- Props typées avec TypeScript
- États de chargement
- Messages d'erreur/vide
- Accessibilité (aria-labels)
- Animations cohérentes

### Classes CSS personnalisées
```css
.scrollbar-hide      /* Cache les scrollbars */
.animate-in          /* Classe de base pour animations */
.fade-in             /* Fade in animation */
.slide-in-from-bottom-4  /* Slide up animation */
.zoom-in-95          /* Zoom in animation */
```

## 💡 Tips développement

### Performance
- Les images utilisent des gradients CSS (pas de chargement réseau)
- Animations optimisées avec `transform` et `opacity`
- Liste virtualisée possible pour grandes collections

### Accessibilité
- Tous les boutons ont des labels
- Contraste de couleurs respecté
- Navigation au clavier supportée
- Focus visible

### Mobile
- Touch targets de 44x44px minimum
- Pas de hover nécessaire
- Swipe gestures possibles
- Safe area respectée

## 🤝 Contribution

Pour ajouter de nouvelles humeurs :

1. Ajouter dans `nft.ts` :
```typescript
export enum Mood {
  // ... existing
  NewMood = "newmood",
}

export const MOODS: MoodConfig[] = [
  // ... existing
  { id: Mood.NewMood, label: "Label", emoji: "😀", color: "#hex" },
];
```

2. Les composants s'adapteront automatiquement !

---

**Créé avec ❤️ pour Farcaster** 🎭✨
