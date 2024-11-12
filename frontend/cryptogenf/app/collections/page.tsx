import React, { useState } from 'react'
import Header from '../components/sections/Header'
import { useEffect } from 'react'
import { collectionI } from '../types'

export default function page() {
const [collections, setCollections] = useState

useEffect(() => {
    const getCollection = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/collections`);
            if (res.ok) {
                const userData = await res.json();

            }
        }
    }
})

    return (
        <>
            <Header />
            <div className='flex items-center justify-center h-screen bg-gradient-to-b hero-sec min-h-[600px] py-4'>
                <div>
                    <h1>Collections em destaque</h1>

                </div>
            </div>
        </>
    )
}