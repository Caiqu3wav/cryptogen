'use client'
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import Header from '../components/sections/Header'
import { useSession } from 'next-auth/react';
import { RiNftFill } from "react-icons/ri";
import { FaBookMedical } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Create() {
  const { data: session, status } = useSession();
  const router = useRouter(); 

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, status]);

    return (
        <>
           <Header/>
          <div className='flex items-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
            <div className='bg-white h-screen'>
              <div>
              <h1 className='text-3xl'>Create What You Want...</h1>
              <p>It's Simple</p>
              </div>
                <div className='flex flex-col gap-6'>
                <h2>Chose what to create:</h2>
                  <Link href={'create/nft'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'>
                    <RiNftFill size={30}/> NFT
                    </Link>
                    <Link href={'create/collection'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'>
                    <FaBookMedical size={30}/> Collection
                    </Link>
                    <Link href={'create/drop'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'>
                    <FaDropbox size={30}/> Drop
                    </Link>
                </div>
                
                </div>
              </div>
        </>
      )
}
