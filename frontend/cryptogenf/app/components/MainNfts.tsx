'use client'
import { useState, useEffect } from 'react'
import NftCard from './NftCard'
import "../styles/mainNfts.css"

export default function MainNfts() {
  const [nftData, setNftData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/nft`);
        const data = await response.json();
        setNftData(data);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNfts();
  }, []);


  return (
    <div className='bg-gradient-to-b from-black to-mainColor flex items-center w-full justify-center min-h-[650px] pb-3'>
      <div className="bg-gray-500 rounded-lg w-[90%] majorfour1:w-[97%] px-3 py-3 min-h-[500px]">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-white">Loading NFTs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 low:grid-cols-2 gap-4 place-items-center w-full">
            <NftCard nftsData={nftData} />
          </div>
        )}
      </div>
    </div>
  )
}