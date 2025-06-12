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
  const [nfts, setNfts] = useState<NftProps[] | null>(null);
  const [spaceBetween, setSpaceBetween] = useState(30);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
      const getNfts = async () => {
          try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/nft`);
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
        setSlidesPerView(2);
      } else if (width < 768) {
        setSpaceBetween(30);
        setSlidesPerView(3);
      } else {
        setSpaceBetween(30);
        setSlidesPerView(3);
      }
    };

    updateCarouselConfig();

    window.addEventListener('resize', updateCarouselConfig);
    return () => window.removeEventListener('resize', updateCarouselConfig);
  }, []);

  return (
    <div className="flex w-full h-fit min-h-52 items-center justify-center px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {nftsVar?.map((nft) => (
          <SwiperSlide className="py-8" key={nft.id}>
            <a
              href={`/nft/${nft.id}`}
              className="group flex flex-col items-center gap-4 bg-[#1a1a1a] p-2 md:p-4 rounded-2xl shadow-xl transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl border border-[#2a2a2a]"
            >
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-full h-[180px] md:h-[210px] rounded-xl object-cover border border-[#333]"
              />
              <div className="flex flex-col w-full gap-1">
                <h3 className="text-xl font-semibold text-white truncate">{nft.name}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{nft.description}</p>
              </div>

              <div className="w-full mt-2 flex flex-col gap-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Preço atual:</span>
                  <span className="text-mainColor font-semibold">{nft.price} ETH</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Última venda:</span>
                  <span>{nft.lastSale || 'N/A'} ETH</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Floor price:</span>
                  <span>{nft.floorPrice} ETH</span>
                </div>
              </div>

              <div className="w-full mt-3 text-xs text-gray-400">
                <p>
                  Coleção: <span className="text-white font-medium">{nft.collection.name}</span>
                </p>
                <p>
                  Dono: <span className="text-white">{nft.owner.name}</span>
                </p>
              </div>

              {nft.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 w-full">
                  {nft.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#2c2c2c] text-gray-300 text-xs px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
)
}