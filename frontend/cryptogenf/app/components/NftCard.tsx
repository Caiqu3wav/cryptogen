import React from 'react'
import { nfts } from '../api/nfts'
import { NftProps } from '../types'

export default function NftCard({ nftsData }: { nftsData: NftProps[] | null }) {
  const navigate = useNavigate();

  const formatPrice = (price: number) => `${price.toFixed(2)} ETH`;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleViewNFT = (id: string) => {
    navigate(`/nft/${id}`);
  };

  return (
    <>
      {nftsData?.length ? (
        nftsData.map((nft) => (
          <Card
            key={nft.id}
            className="glass-card overflow-hidden group transition-all duration-300 hover:translate-y-[-5px]"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <span className="bg-cryptogen-blue/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {nft.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 rounded-full px-2 py-1 backdrop-blur-sm">
                {getTrendIcon(nft.trends)}
                <span className="text-white text-xs">{nft.totalSales}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-cryptogen-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <Button
                  onClick={() => handleViewNFT(nft.id)}
                  className="bg-cryptogen-blue hover:bg-cryptogen-lightblue text-white py-2 px-4 rounded-full text-sm font-medium transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Ver detalhes
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-lg truncate">{nft.name}</h3>
                <span className="text-cryptogen-blue text-sm">#{nft.id.slice(0, 8)}</span>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <img
                  src={nft.owner.avatar}
                  alt={nft.owner.name}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-sm text-white/60">Por {nft.owner.name}</p>
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-xs">Coleção</span>
                <span className="text-cryptogen-lightblue text-xs font-medium">
                  {nft.collection.name}
                </span>
              </div>

              <div className="flex justify-between items-center mb-3">
                <div>
                  <span className="text-cryptogen-blue font-bold text-lg">
                    {formatPrice(nft.price)}
                  </span>
                  <p className="text-white/60 text-xs">Preço atual</p>
                </div>
                <div className="text-right">
                  <span className="text-white/80 text-sm">
                    {formatPrice(nft.lastSale)}
                  </span>
                  <p className="text-white/60 text-xs">Última venda</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {nft.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="bg-cryptogen-navy/30 text-cryptogen-lightblue text-xs px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-xs text-white/60">
                <span>Volume: {formatPrice(nft.volume)}</span>
                <span>Floor: {formatPrice(nft.floorPrice)}</span>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <p className="text-white text-sm">Nenhum NFT encontrado.</p>
      )}
    </>
  );
}