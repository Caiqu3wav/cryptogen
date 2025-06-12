import type { NextApiRequest, NextApiResponse } from 'next'

export const nfts = [
  {
    id: "0",
    name: "Galaxy Tiger",
    description: "Um tigre cósmico brilhando nas galáxias distantes.",
    imageUrl: "https://example.com/nfts/galaxy-tiger.png",
    price: 2.5,
    tags: ["galaxy", "tiger", "rare"],
    category: "arte",
    owner: {
      id: "user_1",
      name: "AstralArtist",
      avatar: "https://example.com/avatars/astralartist.png",
    },
    collection: {
      id: "collection_1",
      name: "Galactic Beasts",
      logoUrl: "https://example.com/collections/galactic-beasts-logo.png",
      description: "Criaturas lendárias das profundezas do cosmos.",
      image_url: "https://example.com/collections/galactic-beasts-banner.png",
      tags: ["space", "creatures", "digital"],
      owner: {
        id: "user_1",
        name: "AstralArtist",
        avatar: "https://example.com/avatars/astralartist.png",
      },
    },
    createdAt: "2024-11-01T12:00:00.000Z",
    updatedAt: "2025-06-01T08:00:00.000Z",
    volume: 45.3,
    floorPrice: 1.8,
    totalListed: 3,
    forSale: true,
  },
  {
    id: "1",
    name: "Solar",
    description: "sol e lua",
    imageUrl: 'assets/nftimgs/ancient.jpg',
    price: 9,
    tags: ['celestial', 'solar'],
    category: 'Fantasy',
    owner: {
      id: "owner1",
      name: "Owner One",
      avatar: "/avatars/avatar1.png"
    },
    collection: {
      id: "collection1",
      name: "Galactic Set",
      logoUrl: "/logos/galactic.png"
    },
    floorPrice: 8,
    volume: 100,
    lastSale: 8.5,
    totalSales: 15,
    trends: {
      week: [7.2, 7.5, 7.9, 8, 8.2, 8.3, 8.5],
      month: [],
      change: 2.3
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    forSale: true,
    lastSale: 1
  },
  {
    id: "2",
    name: "Dark",
    description: "sombras e trevas",
    imageUrl: 'assets/nftimgs/forest.png',
    price: 9,
    tags: ['dark', 'shadow'],
    category: 'Mystery',
    owner: {
      id: "owner2",
      name: "Owner Two",
      avatar: "/avatars/avatar2.png"
    },
    collection: {
      id: "collection2",
      name: /"Shadow Realm",
      logoUrl: "/logos/shadow.png"
    },
    floorPrice: 7,
    volume: 85,
    lastSale: 8.1,
    totalSales: 20,
    trends: {
      week: [6.5, 7, 7.2, 7.8, 8, 8.1, 8.1],
      month: [],
      change: 1.8
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    forSale: true
  },
  {
    id: "3",
    name: "City",
    description: "astral",
    imageUrl: 'assets/nftimgs/fazo.png',
    price: 9,
    tags: ['urban', 'astral'],
    category: 'Sci-Fi',
    owner: {
      id: "owner3",
      name: "Owner Three",
      avatar: "/avatars/avatar3.png"
    },
    collection: {
      id: "collection3",
      name: "Neon Futures",
      logoUrl: "/logos/neon.png"
    },
    floorPrice: 6.8,
    volume: 90,
    lastSale: 7.5,
    totalSales: 12,
    trends: {
      week: [6.8, 7, 7.1, 7.3, 7.5, 7.5, 7.5],
      month: [],
      change: 0.9
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    forSale: true
  },
  {
    id: "4",
    name: "Level",
    description: "teja mula uics serum",
    imageUrl: 'assets/nftimgs/download27.png',
    price: 9,
    tags: ['level', 'mystic'],
    category: 'Abstract',
    owner: {
      id: "owner4",
      name: "Owner Four",
      avatar: "/avatars/avatar4.png"
    },
    collection: {
      id: "collection4",
      name: "Mind Layers",
      logoUrl: "/logos/layers.png"
    },
    floorPrice: 7.9,
    volume: 102,
    lastSale: 8.4,
    totalSales: 18,
    trends: {
      week: [7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4],
      month: [],
      change: 1.2
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    forSale: true
  },
  {
    id: "5",
    name: "Lastra",
    description: "aspas duplas ao escrever string",
    imageUrl: 'assets/nftimgs/download26.png',
    price: 0.5,
    tags: ['code', 'ascii'],
    category: 'Digital',
    owner: {
      id: "owner5",
      name: "Owner Five",
      avatar: "/avatars/avatar5.png"
    },
    collection: {
      id: "collection5",
      name: "Codecore",
      logoUrl: "/logos/codecore.png"
    },
    floorPrice: 0.4,
    volume: 10,
    lastSale: 0.45,
    totalSales: 3,
    trends: {
      week: [0.4, 0.42, 0.43, 0.45, 0.45, 0.45, 0.45],
      month: [],
      change: 0.05
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    forSale: true
  }
];


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      res.status(200).json(nfts);
    } else {
      res.status(405).end();
    }
  }