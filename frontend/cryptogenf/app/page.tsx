import Header from '@/app/components/sections/Header'
import Hero from './components/sections/Hero';
import NftCategoriesList from './components/NftCategoriesList';
import MainNfts from './components/MainNfts';

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full h-full bg-black">
    <Header/>
    <Hero/>
      <NftCategoriesList/>
      <MainNfts/>
  </main>
  );
}
