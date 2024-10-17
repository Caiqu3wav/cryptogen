
/* eslint-disable react/no-unescaped-entities */
import HeroCarousel from '../HeroCarousel';

export default function Hero() {
  return (
    <section className="hero-sec flex w-full gap-6 px-3 xl:px-[3%] majorfour:flex-col justify-center items-center min-h-[600px] bg-opacity-65">
      <div className="flex flex-col w-2/3 majorfour:w-full items-center gap-3 text-white">
      <h1>NTF'S</h1>
      <p>The modern decentralizated generation that provides
        trade and merch of modern products and coins
      </p>
      <HeroCarousel/>
      </div>
      <div className='flex flex-col p-3 rounded-lg w-1/3 majorfour:w-[60%] midtwo2:w-[80%] gap-5 text-center items-center bg-gray-400 bg-opacity-40'>
        <img src="/assets/cryptologo.jpg" className='w-10 rounded-md' alt="site logo" />
        <h1 className='text-white border-solid border-blue-400 border-b-2'>CryptoGen NFT Marketplace</h1>
        <p className='text-sm font-bold majortwo3.1:text-[11px]'>Publishing NFTs: Users can create their NFTs, upload images or digital artwork, and add descriptions and prices.
NFT Marketplace: A showcase to display NFTs available for sale, with search filters and categories.
Buying and selling with cryptocurrencies or fiat currency: Users will be able to choose to pay in cryptocurrencies (such as Ethereum) or traditional 
currencies through payment gateways.
Integrated digital wallets: Tools to connect cryptocurrency wallets like Metamask to facilitate transactions and balance management.
Transaction history: Displays purchase and sale transactions, with transparent and auditable blockchain records.
Commission system: The marketplace may charge a commission for each NFT sale.
These features transform the site into a complete environment for artists, collectors and investors to trade their digital assets.</p>
      </div>
    </section>
  )
}