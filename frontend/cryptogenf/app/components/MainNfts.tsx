import React from 'react'
import NftCard from './NftCard';
import "../styles/mainNfts.css"

export default function MainNfts() {

  return (
    <div className='bg-gradient-to-b from-black to-mainColor flex items-center w-full justify-center min-h-[650px]'>
      <div className='bg-gray-500 rounded-lg w-[80%] px-3 py-3 min-h-[500px]'>
            <div className='grid grid-cols-3 gap-3 place-items-center'>
                <NftCard/>
            </div>
      </div>
    </div>
  )
}
