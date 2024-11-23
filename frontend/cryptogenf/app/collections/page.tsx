"use client"
import React, { useState } from 'react'
import Header from '../components/sections/Header'
import { useEffect } from 'react'
import { CollectionI } from '../types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import '../styles/caroulsel.css'

export default function Collections() {
const [collections, setCollections] = useState<CollectionI[] | null>(null);

useEffect(() => {
    const getCollection = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/collections`);
            if (res.ok) {
                const collectionsData: CollectionI[] = await res.json();
                setCollections(collectionsData);
                console.log(collections);
            } else {
                console.log("Erro ao buscar coleções", res.status);
            }
        } catch (error) {
            console.log("Collections não encontradas", error);
        }
    }
    getCollection();
}, [collections])

    return (
        <>
            <Header />
            <div className='flex items-center px-8 h-screen bg-gradient-to-b hero-sec min-h-[600px] py-4'>
                <div className='text-white w-full'>
                    <h1>Collections em destaque</h1>
                    <Swiper modules={[Navigation, Pagination, Autoplay]}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false
        }}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={20}
        navigation
        pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet' }} className='flex w-full h-full'>
                          {collections?.map((collection) => (
            <SwiperSlide className='min-h-fit py-8' key={collection.id}>
                    <div className='flex flex-col items-center gap-3 justify-center h-fit text-white'>
                        <img src={collection.imageUrl} alt={collection.name} className='w-[200px] h-[200px] majortwo1:w-[135px] majortwo1:h-[135px]
                         majorfour:w-[200px] majorfour:h-[200px] midtw:w-[120px] midtw:h-[130px]' />
                        <p className='text-white'>{collection.name}</p>
                        <p>{collection.description}</p>
                        <p className='text-white'>{collection.tags}</p>
                    </div>
            </SwiperSlide>
                               ))}
          </Swiper>
                </div>
            </div>
        </>
    )
}