import React from 'react'
import { nfts } from '../api/nfts'

export default function NftCard() {
  return (
    <>
    {nfts.map((nft) => (
    <div key={nft.id} className='w-[330px] h-[330px] mt-2 bg-black bg-opacity-30 flex flex-col items-center
     justify-between bg-black- rounded-lg px-2 py-3 self-center'>
        <img src={`/${nft.image}`} className='w-[210px] h-[210px]' alt={nft.name}/>
        <div className='flex flex-col gap-2'>
        <h1>{nft.name}</h1>
        <p className='text-green-500 self-center'>${nft.price}</p>
        </div>
    </div>
          ))}
    </>
  )
}
