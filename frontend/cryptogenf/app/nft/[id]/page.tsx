'use client'
import React from 'react';
import {useRouter, useParams} from 'next/navigation'
import { ArrowLeft, ExternalLink, Heart, Share2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { getNFTById } from '@/app/utils/index';
import Navbar from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { useState, useEffect } from 'react';
import type { NftProps, TrendI } from '@/app/types'; 

export default function NFTDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [nft, setNft] = useState<NftProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNFT() {
      if (!id) return;
      try {
        const data = await getNFTById(id); // isso deve retornar um NftProps
        setNft(data);
      } catch (err) {
        console.error("Erro ao buscar NFT:", err);
        setNft(null);
      } finally {
        setLoading(false);
      }
    }
    fetchNFT();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cryptogen-black text-white flex items-center justify-center">
        <p>Carregando NFT...</p>
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-cryptogen-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">NFT não encontrado</h1>
          <button onClick={() => router.push('/')} className="btn-gradient">
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => `${price.toFixed(2)} ETH`;
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('pt-BR');
  
  const getTrendIcon = (trend: TrendI) => {
    switch (trend.status) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-400" />;
      default:
        return <Minus className="w-5 h-5 text-gray-400" />;
    }
  };

  const attributes = JSON.parse(nft.attributes);

  return (
    <div className="min-h-screen bg-cryptogen-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 lg:px-8 py-24">
        {/* Back Button */}
        <button 
          onClick={() => router.push('/')}
          className="mb-6 text-white hover:text-cryptogen-blue flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* NFT Image */}
          <div className="space-y-6">
            <Card className="glass-card overflow-hidden">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full aspect-square object-cover"
              />
            </Card>
            
            {/* NFT Stats */}
            <Card className="glass-card p-6">
              <h3 className="text-xl font-bold text-white mb-4">Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Volume Total</p>
                  <p className="text-white font-semibold">{formatPrice(nft.volume)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Floor Price</p>
                  <p className="text-white font-semibold">{formatPrice(nft.floorPrice)}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Total de Vendas</p>
                  <p className="text-white font-semibold">{nft.totalSales}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-white/60 text-sm">Tendência</p>
                  {getTrendIcon(nft.trends)}
                </div>
              </div>
            </Card>
          </div>

          {/* NFT Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-cryptogen-blue/20 text-cryptogen-blue text-sm px-3 py-1 rounded-full">
                  {nft.category}
                </span>
                <span className="text-white/60 text-sm">#{nft.id.slice(0, 8)}</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{nft.name}</h1>
              <p className="text-white/80 text-lg leading-relaxed">{nft.description}</p>
            </div>

            {/* Owner & Collection */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={nft.owner.profilePic}
                  alt={nft.owner.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-white/60 text-sm">Proprietário</p>
                  <p className="text-white font-medium">{nft.owner.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/60 text-sm">Coleção</p>
                <p className="text-cryptogen-blue font-medium">{nft.collection.name}</p>
              </div>
            </div>

            {/* Price Card */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white/60 text-sm">Preço Atual</p>
                  <p className="text-3xl font-bold text-cryptogen-blue">{formatPrice(nft.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm">Última Venda</p>
                  <p className="text-white text-xl font-semibold">{formatPrice(nft.lastSale?)}</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button className="btn-gradient flex-1">
                  Comprar Agora
                </button>
                <button className="border-cryptogen-blue text-cryptogen-blue hover:bg-cryptogen-blue/10">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="border-cryptogen-blue text-cryptogen-blue hover:bg-cryptogen-blue/10">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </Card>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {nft.tags.map((tag, index) => (
                  <span key={index} className="bg-cryptogen-navy/30 text-cryptogen-lightblue px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Attributes */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Atributos</h3>
              <div className="grid grid-cols-2 gap-3">
                {attributes.map((attr: any, index: number) => (
                  <div key={index} className="bg-cryptogen-navy/20 rounded-lg p-3 text-center">
                    <p className="text-cryptogen-lightblue text-sm font-medium">{attr.trait_type}</p>
                    <p className="text-white font-semibold">{attr.value}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contract Info */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Informações do Contrato</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Rede:</span>
                  <span className="text-white">{nft.contract?.network}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Endereço:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-mono text-sm">
                      {nft.contract?.address.slice(0, 6)}...{nft.contract?.address.slice(-4)}
                    </span>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Criado em:</span>
                  <span className="text-white">{formatDate(nft.createdAt)}</span>
                </div>
              </div>
            </Card>

            {/* Transaction History */}
            {nft.totalSales > 0 && (
              <Card className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Histórico de Transações</h3>
                <div className="space-y-3">
                  {nft.history?.map((tx) => (
                    <div key={tx.id} className="flex justify-between items-center p-3 bg-cryptogen-navy/20 rounded-lg">
                      <div>
                        <p className="text-white font-medium capitalize">{tx.type}</p>
                        <p className="text-white/60 text-sm">{formatDate(tx.timestamp)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-cryptogen-blue font-semibold">{formatPrice(tx.price)}</p>
                        <p className="text-white/60 text-sm">
                          {tx.fromAddress.slice(0, 6)}...{tx.fromAddress.slice(-4)} → {tx.toAddress.slice(0, 6)}...{tx.toAddress.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};