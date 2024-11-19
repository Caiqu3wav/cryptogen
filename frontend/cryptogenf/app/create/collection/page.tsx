'use client'
import Header from "@/app/components/sections/Header"
import { useSession } from "next-auth/react"
import { useState } from 'react'
import { MdError } from "react-icons/md"
import TagInput from "@/app/components/TagInput"
import { BsFillCloudUploadFill } from "react-icons/bs"
import "../../styles/fileInput.css"
import { FaEthereum } from "react-icons/fa";

type BlockchainType = {
    id: number;
    name: string;
}

const blockchainsOptions = [
    {
        id: 1,
        name: "Ethereum",
        image: '',
        deployCost: 8.99,
        description: "Most popular blockchain"
    }
]

export default function Collection() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();
    const [tags, setTags] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [blockchainSelected, setBlockchainSelected] = useState<BlockchainType | null>(null);

    const handleImageChange = (file: File | null) => {
        setSelectedImage(file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        } else {
            setPreviewImage(null);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleImageChange(file);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        handleImageChange(file);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !e.target.name.value.trim() || 
            !e.target.description.value.trim() || 
            tags.length === 0 || 
            !e.target.category.value || 
            !blockchainSelected || 
            !selectedImage
        ) {
            alert("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', selectedImage);

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
                    blockchain: blockchainSelected?.name
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

    const handleBlockchainChange = (blockchain: BlockchainType) => {
        if (blockchainSelected?.id === blockchain.id) {
            setBlockchainSelected(null);
            return;
        }
        setBlockchainSelected(blockchain);
    };

    return (
        <>
            <Header />
            <div className='flex items-center justify-center h-screen bg-gradient-to-b hero-sec min-h-[600px] py-4'>
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
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3 py-4">
                            <div className="flex gap-2">
                                <div>
                                    <label htmlFor="name">Collection Name</label>
                                    <input type="text" className="ml-3 bg-gray-400 rounded-md" name="name" id="" />
                                </div>
                                <div>
                                    <label htmlFor="name">Collection Symbol</label>
                                    <input type="text" className="ml-3 bg-gray-400 rounded-md" onInput={(e) => {
                                        const input = e.target as HTMLInputElement;
                                        input.value = input.value.toUpperCase();
                                    }} maxLength={3} placeholder="MCN" name="symbol" id="" />
                                </div>
                            </div>
                            <label htmlFor="image">Collection Logo Image</label>
                            <div onDragOver={(e) => e.preventDefault()} onDrop={handleDrop} className="fileInputContainer self-center">
                                <div className="fileLabel">
                                    <h2>Upload File</h2>
                                    <BsFillCloudUploadFill className="upload__icon" />
                                    <p>Arraste e solte ou clique para selecionar</p>
                                </div>
                                <input type="file" id="fileId" className="hidden" onChange={handleFileSelect} />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("fileId")?.click()}
                                    className="fileButton bg-gray-600 rounded p-2 mt-2"
                                >
                                    Selecionar arquivo
                                </button>
                            </div>
                            {previewImage && (
                                <div className="preview">
                                    <img src={previewImage} alt="Preview" className="w-24 h-24 mt-3 rounded" />
                                    <p className="text-sm mt-1">Arquivo selecionado: {selectedImage?.name}</p>
                                </div>
                            )}
                            <div>
                                <label htmlFor="description">Collection Description</label>
                                <textarea
                                    className="ml-3 bg-gray-400 h-[100px] w-full rounded-md resize-none p-2"
                                    name="description"
                                    placeholder="Digite a descrição da coleção"
                                    maxLength={500}
                                />                            </div>
                            <div>
                                <TagInput onTagsChange={setTags} />
                            </div>
                            <div>
                                <label htmlFor="category">Collection Category</label>
                                <select className="bg-slate-400 rounded-lg ml-3" name="category">
                                    <option value="art">Art</option>
                                    <option value="music">Music</option>
                                    <option value="photography">Photography</option>
                                    <option value="pfp">PFP</option>
                                </select>
                            </div>
                            <div>
                                {blockchainsOptions.map((blockchain) => (
                                    <button className={`${blockchainSelected?.name !== blockchain.name ? 'border-none' : 'border-dotted border-white border-2'} bg-gray-700 bg-opacity-60 rounded-lg p-2`} type="button" key={blockchain.id}
                                        onClick={() => handleBlockchainChange(blockchain)}>
                                        <div className="flex gap-4 items-center">
                                            <FaEthereum className="text-purple-900 text-lg" />
                                            <h1>{blockchain.name}</h1>
                                        </div>
                                        <p className=" text-gray-700 text-opacity-70">{blockchain.description}</p>
                                        <p>Estimated cost of contract deploy: </p>
                                        <p className=" text-mainColor">${blockchain.deployCost.toFixed(2)}</p>
                                    </button>
                                ))}
                            </div>
                            <button type="submit" className="px-8 py-2 rounded-xl bg-mainColor">Create</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
