import React from 'react'
import { NftProps } from '../types'
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function NftCard({ nftsData }: { nftsData: NftProps[] | null }) {
  const router = useRouter();

  const formatPrice = (price: number) => `${price.toFixed(2)} ETH`;

  const getTrendIcon = (prices: number[]) => {
    if (!prices || prices.length < 2) return <Minus className="w-4 h-4 text-gray-400" />;
    const diff = prices[prices.length - 1] - prices[0];
    if (diff > 0) return <TrendingUp className="w-4 h-4 text-green-400" />;
    if (diff < 0) return <TrendingDown className="w-4 h-4 text-red-400" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const handleViewNFT = (id: string) => {
    router.push(`/nft/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {nftsData?.length ? (
        nftsData.map((nft) => (
          <div
            key={nft.id}
            className="rounded-2xl shadow-lg bg-gradient-to-b from-[#0f1117] to-[#1c1e26] border border-white/10 overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
            onClick={() => handleViewNFT(nft.id)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-cryptogen-blue/80 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                {nft.category}
              </div>
              <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 px-2 py-1 rounded-full backdrop-blur-sm">
                {getTrendIcon(nft.trends.prices)}
                <span className="text-white text-xs">{nft.totalSales}</span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-semibold text-lg truncate">{nft.name}</h3>
                <span className="text-sm text-cryptogen-lightblue">#{nft.id.slice(0, 8)}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-white text-sm">
                  {nft.owner.name.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm text-white/70">Por {nft.owner.name}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-white/60">Coleção:</span>
                <span className="text-xs font-medium text-white">{nft.collection.name}</span>
              </div>

              <div className="flex justify-between gap-4 mt-1">
                <div>
                  <p className="text-sm text-cryptogen-blue font-semibold">{formatPrice(nft.price)}</p>
                  <p className="text-xs text-white/50">Preço Atual</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white">{formatPrice(nft.lastSale)}</p>
                  <p className="text-xs text-white/50">Última Venda</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {nft.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 text-white/70 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-xs text-white/50 pt-2 border-t border-white/10 mt-2">
                <span>Volume: {formatPrice(nft.volume)}</span>
                <span>Floor: {formatPrice(nft.floorPrice)}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">Nenhum NFT encontrado.</p>
      )}
    </div>
  );
}