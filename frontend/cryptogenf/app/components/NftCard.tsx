import React from 'react'
import { nfts } from '../api/nfts'

export default function NftCard() {
  return (
    <>
    {nfts.map((nft) => (
    <div key={nft.id} className='w-[300px] h-[300px] midtw:w-[80%] mt-2 bg-opacity-30 flex flex-col
     justify-between bg-black rounded-lg self-center pb-3'>
        <img src={`/${nft.image}`} className='w-full h-[210px] midtw:h-[160px] rounded-t-lg' alt={nft.name}/>
        <div className='flex flex-col gap-2 px-3'>
        <h1>{nft.name}</h1>
        <div className='flex flex-col gap-2'>
          <h1>Floor price</h1>
        <p className='text-green-500 self-center font-bold'>
              {nft.price.toFixed(2)} ETH Ξ
            </p> 
            </div>       </div>
    </div>
          ))}
    </>
  )
}
