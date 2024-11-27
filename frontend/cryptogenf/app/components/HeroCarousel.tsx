'use client'
/* eslint-disable @next/next/no-img-element */
import React, {useEffect, useState} from 'react'
 import { nfts as nftsVar } from '../api/nfts'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../styles/caroulsel.css'
import { NftProps } from '../types'

export default function HeroCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nfts, setNfts] = useState<NftProps[] | null>(null);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
      const getNfts = async () => {
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/nfts`);
              if (res.ok) {
                  const nftsData: NftProps[] = await res.json();
                  setNfts(nftsData);
              } else {
                  console.log("Erro ao buscar coleções", res.status);
              }
          } catch (error) {
              console.log("Collections não encontradas", error);
          }
      }
      getNfts();
  }, []);


  useEffect(() => {
    const updateCarouselConfig = () => {
      const width = window.innerWidth;
      if (width < 554) {
        setSpaceBetween(20);
        setSlidesPerView(2); // Apenas 1 slide visível em telas menores
      } else if (width < 768) {
        setSpaceBetween(30);
        setSlidesPerView(3); // 2 slides visíveis para telas médias
      } else {
        setSpaceBetween(30);
        setSlidesPerView(3); // 3 slides visíveis para telas grandes
      }
    };

    updateCarouselConfig();

    window.addEventListener('resize', updateCarouselConfig);
    return () => window.removeEventListener('resize', updateCarouselConfig);
  }, []);

  return (
    <div className="flex w-full h-fit min-h-52 items-center justify-center">
      <Swiper modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false
        }}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation
        pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet' }} className='flex w-full h-full'>
                          {nftsVar?.map((nft) => (
<SwiperSlide className="min-h-fit py-8" key={nft.id}>
            <div className="flex flex-col items-center gap-4 majorthree1:gap-2 justify-center h-fit text-white bg-gray-800 p-4 majortwo1-2:p-1 midtw:w-[180px] rounded-lg shadow-md">
                <img 
                    src={nft.image}
                    alt={nft.name}
                    className="w-[200px] h-[200px] majortwo4:w-[150px] majortwo4:h-[150px] majorfour:w-[90%] majorfour:h-[170px] object-cover rounded-lg border border-gray-700"
                />

                <h3 className="text-lg font-semibold">{nft.name}</h3>
        
                <p className="text-sm text-gray-400 text-center">{nft.description}</p>
        
                <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-500">Current Price</p>
                    <p className="text-xl font-bold text-mainColor">${nft.price}</p>
                </div>
        
                <div className="flex flex-col gap-2 mt-3 w-full">
                    <div className="flex justify-between w-full">
                        <p className="text-xs text-gray-500">Volume</p>
                        <p className="text-sm text-gray-300">${nft.volume || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </SwiperSlide>

        /*<SwiperSlide className="min-h-fit py-8" key={nft.id}>
         <a 
        href={`/nft/${nft.id}`} 
        className="flex flex-col items-center gap-4 justify-center h-fit text-white bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
        <img 
            src={nft.imageUrl} 
            alt={nft.name} 
            className="w-[200px] h-[200px] object-cover rounded-lg border border-gray-700"
        />

        <h3 className="text-lg font-semibold">{nft.name}</h3>

        <p className="text-sm text-gray-400 text-center truncate">{nft.description}</p>

        <div className="flex flex-col items-center">
            <p className="text-xs text-gray-500">Current Price</p>
            <p className="text-xl font-bold text-mainColor">${nft.price}</p>
        </div>

        <div className="flex flex-col gap-2 mt-3 w-full">
            <div className="flex justify-between w-full">
                <p className="text-xs text-gray-500">Volume</p>
                <p className="text-sm text-gray-300">${nft.volume || 'N/A'}</p>
            </div>

            <div className="flex justify-between w-full">
                <p className="text-xs text-gray-500">Floor Price</p>
                <p className="text-sm text-gray-300">${nft.floorPrice || 'N/A'}</p>
            </div>

            <div className="flex justify-between w-full">
                <p className="text-xs text-gray-500">Last Sale</p>
                <p className="text-sm text-gray-300">${nft.lastSale || 'N/A'}</p>
            </div>

            <div className="flex justify-between w-full">
                <p className="text-xs text-gray-500">Total Sales</p>
                <p className="text-sm text-gray-300">{nft.totalSales || 0}</p>
            </div>
        </div>

        {nft.tags && nft.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
                {nft.tags.map((tag, index) => (
                    <span 
                        key={index} 
                        className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-lg"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )}
    </a>
    </SwiperSlide>
        */
                            ))}
          </Swiper>
    </div>
  );
}
