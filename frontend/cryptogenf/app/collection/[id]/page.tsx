import Header from '@/app/components/sections/Header'
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { ArrowLeft, Calendar, User, Layers, Globe, Tag } from 'lucide-react';
import getCollectionById from '@/data/mockCollections';
import Footer from '@/app/components/sections/Footer';
import Link from 'next/link';

export default function CollectionDetail({ params }: { params: { id: string } }) {
  
  const collection = params.id ? getCollectionById(params.id) : null;

  if (!collection) {
    return (
      <div className="min-h-screen bg-cryptogen-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Coleção não encontrada</h1>
          <Link 
            href={'/'}
            className=" bg-blue-600 hover:bg-blue-300 text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getBlockchainColor = (blockchain: string) => {
    const colors = {
      'Ethereum': 'bg-blue-500/20 text-blue-400 border-blue-400/30',
      'Polygon': 'bg-purple-500/20 text-purple-400 border-purple-400/30',
      'Solana': 'bg-green-500/20 text-green-400 border-green-400/30',
      'Binance Smart Chain': 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
    };
    return colors[blockchain as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  };

  return (
    <div className="min-h-screen bg-cryptogen-black text-white">
      <Header />
      
      <main className="pt-20">
        {/* Header */}
        <section className="py-12 bg-cryptogen-darker relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cryptogen-navy/30 to-cryptogen-blue/20"></div>
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <Link
              href={"/"}
              className="text-white/80 hover:text-white mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </Link>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white">{collection.name}</h1>
                  <span className="text-cryptogen-blue text-xl font-mono bg-cryptogen-navy/30 px-3 py-1 rounded-full">
                    {collection.symbol}
                  </span>
                </div>
                
                <p className="text-white/80 text-lg mb-6">{collection.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {collection.tags.map((tag: string, index: number | any) => (
                    <span key={index} className="bg-cryptogen-navy/40 text-cryptogen-lightblue text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-cryptogen-navy/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Criador</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img 
                        src={collection.owner.avatar} 
                        alt={collection.owner.name}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-white font-medium">{collection.owner.name}</span>
                    </div>
                  </div>
                  
                  <div className="bg-cryptogen-navy/20 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-white/60 mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">Blockchain</span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm border ${getBlockchainColor(collection.blockchain)}`}>
                      {collection.blockchain}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img
                  src={collection.imageUrl}
                  alt={collection.name}
                  className="w-full rounded-2xl shadow-2xl"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-cryptogen-blue/80 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
                    {collection.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-12 bg-cryptogen-dark">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Layers className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{collection.nfts.length}</div>
                <div className="text-white/60 text-sm">Total de NFTs</div>
              </Card>
              
              <Card className="glass-card p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <User className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">1</div>
                <div className="text-white/60 text-sm">Proprietário</div>
              </Card>
              
              <Card className="glass-card p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-lg font-bold text-white mb-1">{formatDate(collection.createdAt)}</div>
                <div className="text-white/60 text-sm">Data de Criação</div>
              </Card>
              
              <Card className="glass-card p-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="w-6 h-6 text-cryptogen-blue" />
                </div>
                <div className="text-lg font-bold text-white mb-1">{collection.blockchain}</div>
                <div className="text-white/60 text-sm">Rede</div>
              </Card>
            </div>
          </div>
        </section>
        
        {/* NFTs Section */}
        <section className="py-12 bg-cryptogen-darker">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-3xl font-bold text-white mb-8">NFTs desta Coleção</h2>
            
            {collection.nfts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-cryptogen-blue text-6xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum NFT encontrado</h3>
                <p className="text-white/60">Esta coleção ainda não possui NFTs.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* NFTs would be displayed here */}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}; 