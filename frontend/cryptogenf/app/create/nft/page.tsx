'use client'
import Header from "@/app/components/sections/Header"
import Link from 'next/link';
import { FaPaintBrush } from "react-icons/fa";
import { FaPhotoVideo } from "react-icons/fa";
import { MdLibraryMusic } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

export default function CreateNFTItem() {
   
    return (
        <>
            <Header />
            <div className='flex items-center justify-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
                <div className='h-screen text-white'>
                    <div>
                        <h1 className='text-3xl'>Create a new NFT item</h1>
                    </div>
                    <div className="mt-3">
                        <h1 className="text-mainColor">Choose your NFT&apos;s category:</h1>
                        <div className="flex flex-col gap-4">
                            <Link href={'/nft/art'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'><FaPaintBrush/> Art</Link>
                            <Link href={'/nft/music'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'><FaPhotoVideo/> Music</Link>
                            <Link href={'/nft/pfp'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'><MdLibraryMusic/> PFP</Link>
                            <Link href={'/nft/photography'} className='bg-gray-500 text-black px-20 py-2 rounded-xl hover:bg-black
                   hover:text-gray-400 flex items-center justify-center gap-2'><CgProfile/> Photography</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}