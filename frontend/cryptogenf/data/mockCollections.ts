import { CollectionI, TrendI } from "@/app/types";

const defaultTrends: TrendI = {
  daily: 0,
  weekly: 0,
  monthly: 0
};

export const mockCollections: CollectionI[] = [
  {
    id: "col-550e8400-e29b-41d4-a716-446655440001",
    name: "Cosmic Voyagers",
    description: "Uma coleção épica de arte digital explorando o cosmos infinito através de visuais únicos e inspiradores.",
    symbol: "COSMIC",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=500&fit=crop",
    tags: ["Space", "Digital Art", "Abstract", "Cosmic", "NFT"],
    category: "Digital Art",
    owner: {
      id: "user001",
      name: "MetaArtist",
      profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Ethereum",
    nfts: Array(24).fill(null).map((_, i) => ({
      id: `nft-${i}`,
      name: `Cosmic NFT #${i + 1}`,
      description: "Unique cosmic art piece",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 10) + 1,
      tags: ["Cosmic", "Digital"],
      category: "Digital Art",
      owner: {
        id: "user001",
        name: "MetaArtist",
        profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 1,
      volume: 100,
      lastSale: 1,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-15T10:30:00Z",
    updated_at: "2024-01-20T14:22:00Z"
  },

  {
    id: "col-550e8400-e29b-41d4-a716-446655440002",
    name: "AI Genesis",
    description: "Explorando o futuro da inteligência artificial através da arte digital inovadora e conceitos futuristas.",
    symbol: "AIGEN",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=500&fit=crop",
    tags: ["AI", "Technology", "Future", "Neural", "Innovation"],
    category: "Technology",
    owner: {
      id: "user002",
      name: "CryptoVisions",
      profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Ethereum",
    nfts: Array(18).fill(null).map((_, i) => ({
      id: `nft-ai-${i}`,
      name: `AI Genesis #${i + 1}`,
      description: "AI-generated art piece",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 15) + 2,
      tags: ["AI", "Generative"],
      category: "Technology",
      owner: {
        id: "user002",
        name: "CryptoVisions",
        profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 1.5,
      volume: 150,
      lastSale: 2.3,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-10T08:15:00Z",
    updated_at: "2024-01-22T16:45:00Z"
  },

  {
    id: "col-550e8400-e29b-41d4-a716-446655440003",
    name: "Digital Portals",
    description: "Portais para mundos digitais inexplorados, inspirados na estética cyberpunk e cultura hacker.",
    symbol: "PORTAL",
    image_url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=500&fit=crop",
    tags: ["Cyberpunk", "Matrix", "Digital", "Portal", "Virtual"],
    category: "Cyberpunk",
    owner: {
      id: "user003",
      name: "BlockchainDreams",
      profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Polygon",
    nfts: Array(32).fill(null).map((_, i) => ({
      id: `nft-portal-${i}`,
      name: `Portal #${i + 1}`,
      description: "Digital portal artwork",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 8) + 1,
      tags: ["Cyberpunk", "Digital"],
      category: "Cyberpunk",
      owner: {
        id: "user003",
        name: "BlockchainDreams",
        profilePic: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 1,
      volume: 50,
      lastSale: 0.8,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-05T12:00:00Z",
    updated_at: "2024-01-25T09:30:00Z"
  },

  {
    id: "col-550e8400-e29b-41d4-a716-446655440004",
    name: "Quantum Futures",
    description: "Explorando possibilidades quânticas através da arte digital, simbolizando a próxima era da computação.",
    symbol: "QUANTUM",
    image_url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=500&fit=crop",
    tags: ["Quantum", "Technology", "Circuit", "Future", "Science"],
    category: "Technology",
    owner: {
      id: "user004",
      name: "QuantumArt",
      profilePic: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Solana",
    nfts: Array(15).fill(null).map((_, i) => ({
      id: `nft-quantum-${i}`,
      name: `Quantum #${i + 1}`,
      description: "Quantum-inspired digital art",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 12) + 3,
      tags: ["Quantum", "Science"],
      category: "Technology",
      owner: {
        id: "user004",
        name: "QuantumArt",
        profilePic: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 2,
      volume: 200,
      lastSale: 4,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-12T15:45:00Z",
    updated_at: "2024-01-23T11:20:00Z"
  },

  {
    id: "col-550e8400-e29b-41d4-a716-446655440005",
    name: "Abstract Dreams",
    description: "Uma viagem através de formas abstratas e cores vibrantes, capturando a essência dos sonhos digitais.",
    symbol: "DREAMS",
    image_url: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=500&h=500&fit=crop",
    tags: ["Abstract", "Dreams", "Colors", "Digital", "Art"],
    category: "Abstract",
    owner: {
      id: "user005",
      name: "DreamWeaver",
      profilePic: "https://images.unsplash.com/photo-1494790108755-2616c944e734?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Ethereum",
    nfts: Array(28).fill(null).map((_, i) => ({
      id: `nft-dreams-${i}`,
      name: `Dream #${i + 1}`,
      description: "Abstract dream visualization",
      imageUrl: "https://images.unsplash.com/photo-1485833077593-4278bba3f11f?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 6) + 1,
      tags: ["Dream", "Abstract"],
      category: "Abstract",
      owner: {
        id: "user005",
        name: "DreamWeaver",
        profilePic: "https://images.unsplash.com/photo-1494790108755-2616c944e734?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 0.8,
      volume: 80,
      lastSale: 1.2,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-08T09:20:00Z",
    updated_at: "2024-01-26T13:15:00Z"
  },

  {
    id: "col-550e8400-e29b-41d4-a716-446655440006",
    name: "Nature's Code",
    description: "A intersecção entre natureza e tecnologia, onde algoritmos encontram a beleza orgânica do mundo natural.",
    symbol: "NATURE",
    image_url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop",
    tags: ["Nature", "Technology", "Organic", "Code", "Bio"],
    category: "Nature",
    owner: {
      id: "user006",
      name: "BioTechArt",
      profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    blockchain: "Binance Smart Chain",
    nfts: Array(20).fill(null).map((_, i) => ({
      id: `nft-nature-${i}`,
      name: `Nature Code #${i + 1}`,
      description: "Bio-tech inspired artwork",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
      price: Math.floor(Math.random() * 4) + 1,
      tags: ["Nature", "Bio"],
      category: "Nature",
      owner: {
        id: "user006",
        name: "BioTechArt",
        profilePic: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      floorPrice: 1,
      volume: 70,
      lastSale: 2,
      totalSales: 0,
      trends: defaultTrends,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    created_at: "2024-01-03T14:30:00Z",
    updated_at: "2024-01-27T10:45:00Z"
  }
];

export default async function fetchCollectionById(id: string): Promise<CollectionI> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || `Erro ${res.status}: Falha ao buscar a coleção`);
    }

    const collection: CollectionI = await res.json();
    return collection;
  } catch (error: any) {
    console.error('Erro ao buscar coleção:', error.message);
    throw error;
  }
}

