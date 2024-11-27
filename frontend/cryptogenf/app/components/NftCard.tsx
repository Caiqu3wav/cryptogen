import React from 'react'
import { nfts } from '../api/nfts'

export default function NftCard() {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-2 sm:grid-cols-1 place-items-center w-full">
     {nfts.map((nft) => (
        <div
          key={nft.id}
          className="bg-gradient-to-b from-gray-900 via-gray-800 to-black w-[250px] h-auto p-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        >
          {/* Imagem */}
          <img
            src={`/${nft.image}`}
            alt={nft.name}
            className="w-full h-[180px] rounded-lg object-cover"
          />

          {/* Conteúdo */}
          <div className="mt-4 text-center">
            {/* Nome do NFT */}
            <h2 className="text-lg font-bold text-white truncate">{nft.name}</h2>

            {/* Descrição curta */}
            <p className="text-sm text-gray-400 my-2 truncate">
              {nft.description || 'Descrição indisponível'}
            </p>

            {/* Informações adicionais */}
            <div className="flex justify-between items-center mt-4 text-sm">
              {/* Preço */}
              <div className="text-green-500 flex items-center">
                <span className="font-bold">{nft.price.toFixed(2)}</span>
                <span className="ml-1">ETH Ξ</span>
              </div>
              {/* Volume */}
              <div className="text-gray-300">
                <span className="text-xs">Volume:</span> {nft.volume || 'N/A'}
              </div>
            </div>
          </div>

          {/* Efeito hover */}
          <div className="hidden group-hover:flex absolute inset-0 bg-black bg-opacity-60 text-white flex-col justify-center items-center rounded-lg">
            <p className="text-lg font-semibold">{nft.name}</p>
            <p className="text-sm">{nft.description || 'Descrição indisponível'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
