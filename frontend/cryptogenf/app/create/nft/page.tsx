'use client'
import Header from "@/app/components/sections/Header"
import Link from 'next/link';
import { FaPlus } from "react-icons/fa";

export default function CreateNFTItem() {
   
    return (
        <>
            <Header />
            <div className='flex items-center justify-around h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
                <div className='flex flex-col items-center justify-center h-screen text-white gap-3'>
                    <div>
                        <h1 className='text-3xl'>Create a new NFT item</h1>
                    </div>
                    <div className="bg-gray-700 bg-opacity-40 min-h-[400px] py-3 flex flex-col items-center justify-around rounded-lg">
                    <h1 className="text-white">Choose or create a collection</h1>
                    <div className="flex flex-col gap-4 p-3 rounded-lg">
                        <Link href={'/create/collection'} className=" bg-slate-900 rounded-xl flex items-center justify-center gap-2
                        px-2 py-2 text-white border-solid border-white"><FaPlus/>Create a new Collection</Link>
                        Wow.. you don&apos;t have any collections yet
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}