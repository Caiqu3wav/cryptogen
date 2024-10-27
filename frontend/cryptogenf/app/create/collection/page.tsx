'use client'
import Header from "@/app/components/sections/Header"
import { useSession } from "next-auth/react"
import { useState } from 'react'
import { MdError } from "react-icons/md"
import TagInput from "@/app/components/TagInput"

export default function Collection() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const [tags, setTags] = useState<string[]>([]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!e.target.name.value || !e.target.description.value || tags.length === 0) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {

            const imageFile = e.target.image.files[0];
            const formData = new FormData();
            formData.append('file', imageFile);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!uploadRes.ok) {
                throw new Error('Failed to upload image');
            }

            const uploadData = await uploadRes.json();
            const imageUrl = uploadData.imageUrl;

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/collection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: e.target.name.value,
                    description: e.target.description.value,
                    ownerId: session?.user.id,
                    tags: tags,
                    category: e.target.category.value,
                    imageUrl: imageUrl,
                    blockchain: e.target.blockchain.value
                })
            });

            if (!res.ok) {
                throw new Error('Failed to create collection');
            }

            const data = await res.json();
            console.log(data);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <Header />
            <div className='flex items-center justify-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
                {isLoading ? (
                    <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                ) : isError ? (
                    <div className="flex flex-col items-center gap-3">
                        <p>Erro ao criar coleção</p>
                        <MdError size={50} className="text-red-600" />
                    </div>
                ) : (

                    <div className='h-screen mt-5 text-white'>
                        <div>
                            <h1 className='text-3xl'>Create a new collection</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <div>
                                <label htmlFor="name">Collection Name</label>
                                <input type="text" className="ml-3 bg-gray-400 rounded-md" name="name" id="" />
                            </div>
                            <div>
                                <label htmlFor="description">Collection Description</label>
                                <input type="text" className="ml-3 bg-gray-400 rounded-md" name="description" id="" />
                            </div>
                            <div>
                               <TagInput onTagsChange={setTags} />
                               </div>
                            <div>
                                <label htmlFor="category">Collection Category</label>
                                <input type="text" className="ml-3 bg-gray-400 rounded-md" name="category" id="" />
                            </div>
                            <div>
                                <label htmlFor="image">Collection Image</label>
                                <input type="file" className="ml-3 bg-gray-400 rounded-md" name="image" id="" />
                            </div>

                            <div>
                                <label htmlFor="blockchain">Blockchain</label>
                                <select className="ml-3 bg-gray-400 rounded-md" name="blockchain" id="blockchain">
                                    <option value="ethereum">
                                            Ethereum
                                    </option>
                                </select>
                            </div>
                            <button type="submit" className="px-8 py-2 rounded-xl bg-mainColor">Create</button>
                        </form>
                    </div>
                )
                }
            </div>
        </>
    )
}
