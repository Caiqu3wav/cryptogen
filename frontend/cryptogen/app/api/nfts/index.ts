import type { NextApiRequest, NextApiResponse } from 'next'

export const nfts = [
    {
        name: "Solar",
         id: 1,
        description: "sol e lua",
        image: 'assets/nftimgs/ancient.jpg',
        price: 9
    },
    {
        name: "Dark",
        id: 2,
        description: "sombras e trevas",
        image: 'assets/nftimgs/forest.png',
        price: 9
    },
    {
        name: "City",
        id: 3,
        description: "astral",
        image: 'assets/nftimgs/fazo.png',
        price: 9
    },
    {
        name: "Level",
        id: 4,
        description: "teja mula uics serum",
        image: 'assets/nftimgs/download27.png',
        price: 9
    },
    {
        name: "Lastra",
        id: 5,
        description: "aspas duplas ao escrever string",
        image: 'assets/nftimgs/download26.png',
        price: 0.5
    }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      res.status(200).json(nfts);
    } else {
      res.status(405).end();
    }
  }