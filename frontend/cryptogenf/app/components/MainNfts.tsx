import React from 'react'
import NftCard from './NftCard';
import "../styles/mainNfts.css"

export default function MainNfts() {

  return (
    <div className='bg-gradient-to-b from-black to-mainColor flex items-center w-full justify-center min-h-[650px] pb-3'>
      <div className='bg-gray-500 rounded-lg w-[90%] majorfour1:w-[97%] px-3 py-3 min-h-[500px]'>
                <NftCard/>
      </div>
    </div>
  )
}