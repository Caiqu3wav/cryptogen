'use client'
import Header from "@/app/components/sections/Header"
import Link from 'next/link'
import { FaPlus } from "react-icons/fa"
import { useState, useEffect } from "react"
import { CollectionI } from "@/app/types"
import { useSession } from "next-auth/react"

export default function CreateNFTItem() {
    const [userCollections, setUserCollections] = useState<CollectionI[] | null>(null);
    const [collectionSelected, setCollectionSelected] = useState<CollectionI | null>(null);

    const { data: session } = useSession();
    useEffect(() => {
        const fetchUserCollections = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/userCollections/${session?.user.id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch user collections')
                } else {
                    const userCData: CollectionI[] = await res.json();
                    setUserCollections(userCData);
                }
            } catch (error) {
                console.log("Nfts não encontradas", error);
            }
        }

        fetchUserCollections()
    }, [session?.user.id]);

    const handleCollectionChange = (collection: CollectionI) => {
        if (collectionSelected?.id === collection.id) {
            setCollectionSelected(null);
            return;
        }
        setCollectionSelected(collection);
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center h-screen px-4">
                <div className="max-w-4xl w-full bg-gray-900 bg-opacity-80 text-white p-6 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold mb-6 text-center">Create a New NFT Item</h1>

                    <div className="flex flex-col gap-6">
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-medium mb-4">Choose or Create a Collection</h2>

                            <Link href={'/create/collection'} className="flex items-center gap-2 px-4 py-2
                             bg-mainColor hover:bg-mainColorDark rounded-lg transition-colors">
                                <FaPlus />
                                Create a New Collection
                            </Link>

                            <div className="flex flex-col gap-2">
                                {!userCollections ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <p className="text-sm text-gray-400 text-center">
                                            Wow... You don&apos;t have any collections yet!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="py-2">
                                        {userCollections.map((collection) => (
                                            <button className={`${
                                                collectionSelected?.id !== collection.id 
                                                    ? 'border-none'
                                                    : 'border-dotted border-white border-2'
                                            } bg-gray-700 bg-opacity-60 rounded-lg p-2`} type="button" key={collection.id}
                                                onClick={() => handleCollectionChange(collection)}>
                                                <div className="flex gap-4 items-center">
                                                    <img src={collection.image_url} width={40} alt={collection.name} />
                                                    <h1>{collection.name}</h1>
                                                </div>
                                                <p className="text-black text-opacity-70">{collection.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h2 className="text-xl font-medium mb-4">NFT Details</h2>

                            <form className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="NFT Name"
                                    className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white"
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white h-24 resize-none"
                                ></textarea>
                                <input
                                    type="number"
                                    placeholder="Price (in ETH)"
                                    className="w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white"
                                />
                                <input
                                    type="file"
                                    className="w-full text-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-mainColor hover:bg-mainColorDark text-white rounded-lg transition-colors"
                                >
                                    Mint NFT
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}