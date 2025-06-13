import { NftProps } from '@/app/types';
import type { NextApiRequest, NextApiResponse } from 'next'

export const nftExample: NftProps = {
id: "1",
    name: "Solar",
    description: "sol e lua",
    imageUrl: '/assets/nftimgs/ancient.jpg',
    price: 9,
    tags: ['celestial', 'solar'],
    category: 'Fantasy',
    owner: {
      id: "owner1",
      name: "Owner One",
      profilePic: "/avatars/avatar1.png"
    }, 
    floorPrice: 8,
    volume: 100,
    lastSale: 8.5,
    totalSales: 15,
    trends: {
      prices: [7.2, 7.5, 7.9, 8, 8.2, 8.3, 8.5],
      dates: ['2023-06-01', '2023-06-02', '2023-06-03', '2023-06-04', '2023-06-05', '2023-06-06', '2023-06-07'],
      status: 'up'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

export const nfts: NftProps[] = [
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
    },
    collection: {
      id: "collection1",
      name: "Galactic Set",
      description: "Uma coleção de astros e corpos celestes.",
      image_url: "/images/collections/galactic.jpg",
      tags: ['space', 'galaxy'],
      owner: {
        id: "owner1",
        name: "Owner One",
      },
    },
    floorPrice: 8,
    volume: 100,
    lastSale: 8.5,
    totalSales: 15,
    trends: {
      prices: [7.2, 7.5, 7.9, 8, 8.2, 8.3, 8.5],
      dates: [],
      status: 'up'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    },
    collection: {
      id: "collection2",
      name: "Shadow Realm",
      description: "Reino das sombras e mistérios obscuros.",
      image_url: "/images/collections/shadow.jpg",
      tags: ['dark', 'mystery'],
      owner: {
        id: "owner2",
        name: "Owner Two",
      },
    },
    floorPrice: 7,
    volume: 85,
    lastSale: 8.1,
    totalSales: 20,
    trends: {
      prices: [6.5, 7, 7.2, 7.8, 8, 8.1, 8.1],
      dates: [],
      status: 'stable'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    },
    collection: {
      id: "collection3",
      name: "Neon Futures",
      description: "Visões urbanas do futuro brilhante.",
      image_url: "/images/collections/neon.jpg",
      tags: ['urban', 'futuristic'],
      owner: {
        id: "owner3",
        name: "Owner Three",
      },
    },
    floorPrice: 6.8,
    volume: 90,
    lastSale: 7.5,
    totalSales: 12,
    trends: {
      prices: [6.8, 7, 7.1, 7.3, 7.5, 7.5, 7.5],
      dates: [],
      status: 'stable'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    },
    collection: {
      id: "collection4",
      name: "Mind Layers",
      description: "Camadas mentais do inconsciente.",
      image_url: "/images/collections/layers.jpg",
      tags: ['mind', 'layers'],
      owner: {
        id: "owner4",
        name: "Owner Four",
      },
    },
    floorPrice: 7.9,
    volume: 102,
    lastSale: 8.4,
    totalSales: 18,
    trends: {
      prices: [7.8, 7.9, 8, 8.1, 8.2, 8.3, 8.4],
      dates: [],
      status: 'up'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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
    },
    collection: {
      id: "collection5",
      name: "Codecore",
      description: "O núcleo do código e abstrações digitais.",
      image_url: "/images/collections/codecore.jpg",
      tags: ['code', 'tech'],
      owner: {
        id: "owner5",
        name: "Owner Five",
      },
    },
    floorPrice: 0.4,
    volume: 10,
    lastSale: 0.45,
    totalSales: 3,
    trends: {
      prices: [0.4, 0.42, 0.43, 0.45, 0.45, 0.45, 0.45],
      dates: [],
      status: 'up'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      res.status(200).json(nfts);
    } else {
      res.status(405).end();
    }
  }