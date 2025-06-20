'use client'

import React, { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { 
  TrendingUp, 
  Eye, 
  Calendar, 
  Layers, 
  Filter,
  Search,
  ArrowUpRight,
  Users,
  DollarSign,
  Activity,
  BarChart3,
  Star,
  Zap,
  Clock, 
  Grid3X3,
  List
} from 'lucide-react';
import { MdLocalFireDepartment } from "react-icons/md";
import { mockCollections } from '@/data/mockCollections';
import { CollectionI, NftProps } from '@/app/types/index';
import { useNavigate } from 'react-router-dom';
import Header from '@/app/components/sections/Header';
import Footer from '@/app/components/sections/Footer';

const CollectionCard = ({ collection, viewMode = 'grid' }: { collection: CollectionI, viewMode?: 'grid' | 'list' }) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getBlockchainColor = (blockchain: string) => {
    const colors = {
      'Ethereum': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Polygon': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      'Solana': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Binance Smart Chain': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    };
    return colors[blockchain as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const handleViewCollection = () => {
    navigate(`/collection/${collection.id}`);
  };

  const totalVolume = collection.nfts?.reduce((acc: number, nft: NftProps) => acc + (nft.price || 0), 0) || 0;
  const floorPrice = Math.min(...(collection.nfts?.map(nft => nft.price || 0) || [0]));

  if (viewMode === 'list') {
    return (
      <Card className="glass-card p-6 group transition-all duration-300 hover:translate-y-[-2px]">
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={collection.image_url}
              alt={collection.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm border ${getBlockchainColor(collection.blockchain)}`}>
                {collection.blockchain}
              </span>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-white text-xl truncate">{collection.name}</h3>
              <span className="text-cryptogen-blue text-sm font-mono">{collection.symbol}</span>
            </div>
            
            <p className="text-white/70 text-sm mb-3 line-clamp-2">{collection.description}</p>
            
            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-2">
                <img 
                  src={collection.owner.profilePic} 
                  alt={collection.owner.name}
                  className="w-6 h-6 rounded-full"
                />
                <p className="text-sm text-white/60">Por {collection.owner.name}</p>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-white/60">
                  <Layers className="w-4 h-4" />
                  <span>{collection.nfts?.length || 0} NFTs</span>
                </div>
                <div className="flex items-center gap-1 text-cryptogen-blue">
                  <DollarSign className="w-4 h-4" />
                  <span>Floor: {floorPrice} {collection.nfts?.[0]?.floorPrice || 'ETH'}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {collection.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-cryptogen-navy/30 text-cryptogen-lightblue text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Button 
                onClick={handleViewCollection}
                size="sm"
                className="bg-cryptogen-blue hover:bg-cryptogen-lightblue text-white"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Coleção
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card overflow-hidden group transition-all duration-300 hover:translate-y-[-2px]">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={collection.image_url}
          alt={collection.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-cryptogen-blue/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {collection.category}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full backdrop-blur-sm border ${getBlockchainColor(collection.blockchain)}`}>
            {collection.blockchain}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-cryptogen-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
          <Button 
            onClick={handleViewCollection}
            className="bg-cryptogen-blue hover:bg-cryptogen-lightblue text-white py-2 px-4 rounded-full text-sm font-medium transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Ver Coleção
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-white text-lg truncate">{collection.name}</h3>
          <span className="text-cryptogen-blue text-sm font-mono">{collection.symbol}</span>
        </div>
        
        <p className="text-white/70 text-sm mb-3 line-clamp-2">{collection.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={collection.owner.profilePic} 
            alt={collection.owner.name}
            className="w-6 h-6 rounded-full"
          />
          <p className="text-sm text-white/60">Por {collection.owner.name}</p>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1 text-xs text-cryptogen-blue">
            <DollarSign className="w-3 h-3" />
            <span>Floor: {floorPrice} {collection.nfts?.[0]?.floorPrice || 'ETH'}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/60">
            <BarChart3 className="w-3 h-3" />
            <span>Vol: {totalVolume.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {collection.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="bg-cryptogen-navy/30 text-cryptogen-lightblue text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center text-xs text-white/60">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(collection.created_at)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>{collection.nfts?.length || 0} NFTs</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const Collections = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAndSortedCollections = useMemo(() => {
    let filtered = mockCollections.filter(collection => {
      const matchesSearch = collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           collection.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesBlockchain = selectedBlockchain === 'all' || collection.blockchain === selectedBlockchain;
      const matchesCategory = selectedCategory === 'all' || collection.category === selectedCategory;
      
      return matchesSearch && matchesBlockchain && matchesCategory;
    });

    // Sort collections
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'nfts_count':
          aValue = a.nfts?.length || 0;
          bValue = b.nfts?.length || 0;
          break;
        case 'floor_price':
          aValue = Math.min(...(a.nfts?.map(nft => nft.price || 0) || [0]));
          bValue = Math.min(...(b.nfts?.map(nft => nft.price || 0) || [0]));
          break;
        default:
          aValue = a.created_at;
          bValue = b.created_at;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, selectedBlockchain, selectedCategory, sortBy, sortOrder]);

  const trendingCollections = mockCollections.slice(0, 3);
  const newCollections = [...mockCollections].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 3);

  const totalNFTs = mockCollections.reduce((acc, c) => acc + (c.nfts?.length || 0), 0);
  const totalVolume = mockCollections.reduce((acc, c) => 
    acc + (c.nfts?.reduce((nftAcc, nft) => nftAcc + (nft.price || 0), 0) || 0), 0
  );

  const categories = Array.from(new Set(mockCollections.map(c => c.category)));
  const blockchains = Array.from(new Set(mockCollections.map(c => c.blockchain)));

  return (
    <div className="min-h-screen bg-cryptogen-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-cryptogen-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cryptogen-navy/30 to-cryptogen-blue/20"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Explorar <span className="text-cryptogen-blue">Coleções</span>
              </h1>
              <p className="text-white/80 text-lg max-w-2xl mx-auto">
                Descubra coleções únicas de NFTs criadas por artistas talentosos em diversas blockchains
              </p>
            </div>

            {/* Enhanced Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="glass-card p-4 text-center group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{mockCollections.length}</div>
                <div className="text-white/60 text-sm">Total de Coleções</div>
                <div className="text-green-400 text-xs mt-1 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12% esta semana
                </div>
              </Card>

              <Card className="glass-card p-4 text-center group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{totalNFTs}</div>
                <div className="text-white/60 text-sm">NFTs Total</div>
                <div className="text-blue-400 text-xs mt-1 flex items-center justify-center gap-1">
                  <Zap className="w-3 h-3" />
                  {Math.floor(totalNFTs / mockCollections.length)} média/coleção
                </div>
              </Card>

              <Card className="glass-card p-4 text-center group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{totalVolume.toFixed(1)}</div>
                <div className="text-white/60 text-sm">Volume Total</div>
                <div className="text-purple-400 text-xs mt-1 flex items-center justify-center gap-1">
                  <MdLocalFireDepartment className="w-3 h-3" />
                  Múltiplas moedas
                </div>
              </Card>

              <Card className="glass-card p-4 text-center group hover:scale-105 transition-transform">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {new Set(mockCollections.map(c => c.owner.id)).size}
                </div>
                <div className="text-white/60 text-sm">Criadores Ativos</div>
                <div className="text-yellow-400 text-xs mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3" />
                  Comunidade crescendo
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Trending Section */}
        <section className="py-12 bg-cryptogen-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-cryptogen-blue" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Em Tendência</h2>
                <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full animate-pulse">
                  HOT
                </span>
              </div>
              <Button variant="ghost" className="text-cryptogen-blue hover:text-cryptogen-lightblue">
                Ver todas <ArrowUpRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingCollections.map(collection => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-cryptogen-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar coleções..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-cryptogen-navy/30 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-cryptogen-blue"
                />
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-white/60" />
                  <select
                    value={selectedBlockchain}
                    onChange={(e) => setSelectedBlockchain(e.target.value)}
                    className="bg-cryptogen-navy/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cryptogen-blue"
                  >
                    <option value="all">Todas as Blockchains</option>
                    {blockchains.map(blockchain => (
                      <option key={blockchain} value={blockchain}>{blockchain}</option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-cryptogen-navy/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cryptogen-blue"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [field, order] = e.target.value.split('-');
                    setSortBy(field);
                    setSortOrder(order as 'asc' | 'desc');
                  }}
                  className="bg-cryptogen-navy/30 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cryptogen-blue"
                >
                  <option value="created_at-desc">Mais Recentes</option>
                  <option value="created_at-asc">Mais Antigas</option>
                  <option value="name-asc">Nome A-Z</option>
                  <option value="name-desc">Nome Z-A</option>
                  <option value="nfts_count-desc">Mais NFTs</option>
                  <option value="floor_price-asc">Menor Preço</option>
                  <option value="floor_price-desc">Maior Preço</option>
                </select>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'text-cryptogen-blue' : 'text-white/60'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'text-cryptogen-blue' : 'text-white/60'}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-white/60">
              <span>Mostrando {filteredAndSortedCollections.length} de {mockCollections.length} coleções</span>
              {(searchTerm || selectedBlockchain !== 'all' || selectedCategory !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedBlockchain('all');
                    setSelectedCategory('all');
                  }}
                  className="text-cryptogen-blue hover:text-cryptogen-lightblue"
                >
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Collections Content */}
        <section className="py-12 bg-cryptogen-black">
          <div className="container mx-auto px-4 lg:px-8">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="new">
                  <Clock className="w-4 h-4 mr-1" />
                  Novas
                </TabsTrigger>
                <TabsTrigger value="trending">
                  <MdLocalFireDepartment className="w-4 h-4 mr-1" />
                  Trending
                </TabsTrigger>
                <TabsTrigger value="digital-art">Arte Digital</TabsTrigger>
                <TabsTrigger value="technology">Tecnologia</TabsTrigger>
                <TabsTrigger value="others">Outras</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {filteredAndSortedCollections.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="new">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cryptogen-blue" />
                    Coleções Recentes
                    <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                      Últimos 30 dias
                    </span>
                  </h3>
                </div>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {newCollections.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trending">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cryptogen-blue" />
                    Coleções em Alta
                    <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full animate-pulse">
                      QUENTE
                    </span>
                  </h3>
                </div>
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {trendingCollections.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="digital-art">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {mockCollections.filter(c => c.category === 'Digital Art').map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="technology">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {mockCollections.filter(c => c.category === 'Technology').map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="others">
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "space-y-4"
                }>
                  {mockCollections.filter(c => !['Digital Art', 'Technology'].includes(c.category)).map(collection => (
                    <CollectionCard key={collection.id} collection={collection} viewMode={viewMode} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
