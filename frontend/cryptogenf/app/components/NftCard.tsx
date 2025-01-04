import React from 'react'
import { nfts } from '../api/nfts'
import { NftProps } from '../types'

export default function NftCard({nftsData}: {nftsData: NftProps[] | null}) {
  return (
    <>
    {nftsData?.length >= 1 ? (
      nftsData.map((nft) => (
        <div
          key={nft.id}
          className="bg-gradient-to-b from-gray-900 via-gray-800 to-black w-[250px] majorthree:w-[170px] midtwo:w-[120px] h-auto p-4 majorthree:p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          {/* Imagem */}
          <img
            src={nft.imageUrl}
            alt={nft.name}
            className="w-full h-[180px] majorthree:h-[150px] midtwo:h-[110px] rounded-lg object-cover"
          />

          {/* Conteúdo */}
          <div className="mt-4 text-center">
            <h2 className="text-lg midtwo:text-base font-bold text-white truncate">{nft.name}</h2>
            <p className="text-sm midtwo:text-xs text-gray-400 my-2 truncate">
              {nft.description || 'Descrição indisponível'}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm midtwo:text-xs">
              <div className="text-green-500 flex items-center">
                <span className="font-bold">{nft.price.toFixed(2)}</span>
                <span className="ml-1">ETH Ξ</span>
              </div>
              <div className="text-gray-300">
                <span className="text-xs">Volume:</span> {nft.volume || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      nfts.map((nft) => (
        <div
          key={nft.id}
          className="bg-gradient-to-b from-gray-900 via-gray-800 to-black w-[250px] majorthree:w-[170px] midtwo:w-[120px] h-auto p-4 majorthree:p-2 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          <img
            src={`/${nft.image}`}
            alt={nft.name}
            className="w-full h-[180px] majorthree:h-[150px] midtwo:h-[110px] rounded-lg object-cover"
          />
          <div className="mt-4 text-center">
            <h2 className="text-lg midtwo:text-base font-bold text-white truncate">{nft.name}</h2>
            <p className="text-sm midtwo:text-xs text-gray-400 my-2 truncate">
              {nft.description || 'Descrição indisponível'}
            </p>
            <div className="flex justify-between items-center mt-4 text-sm midtwo:text-xs">
              <div className="text-green-500 flex items-center">
                <span className="font-bold">{nft.price.toFixed(2)}</span>
                <span className="ml-1">ETH Ξ</span>
              </div>
              <div className="text-gray-300">
                <span className="text-xs">Volume:</span> {nft.volume || 'N/A'}
              </div>
            </div>
          </div>
        </div>
      ))
    )}
  </>
  )
}
