import Header from "@/app/components/sections/Header";

export default function CreateNFTItem() {
    return (
        <>
            <Header />
            <div className='flex items-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
                <div className='h-screen text-white'>
                    <div>
                        <h1 className='text-3xl'>Create a new NFT item</h1>
                    </div>
                    <form action="" className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="name">NFT Name</label>
                            <input type="text" className="ml-3 bg-gray-400 rounded-md" name="name" id="name" />
                        </div>
                        <div>
                            <label htmlFor="description">NFT Description</label>
                            <input type="text" className="ml-3 bg-gray-400 rounded-md" name="description" id="description" />
                        </div>
                        <div>
                            <label htmlFor="category">NFT Category</label>
                            <input type="text" className="ml-3 bg-gray-400 rounded-md" name="category" id="category" />
                        </div>
                        <div>
                            <label htmlFor="image">NFT Image</label>
                            <input type="file" className="ml-3 bg-gray-400 rounded-md" name="image" id="image" />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="ml-3 bg-gray-400 rounded-md" name="price" id="price" placeholder="Price in ETH" />
                        </div>
                        <div>
                            <label htmlFor="supply">Supply</label>
                            <input type="number" className="ml-3 bg-gray-400 rounded-md" name="supply" id="supply" placeholder="Total supply" />
                        </div>
                        <div>
                            <label htmlFor="blockchain">Blockchain</label>
                            <select className="ml-3 bg-gray-400 rounded-md" name="blockchain" id="blockchain">
                                <option value="ethereum">Ethereum</option>
                            </select>
                        </div>
                        <button type="submit" className="px-8 py-2 rounded-xl bg-mainColor">Create NFT</button>
                    </form>
                </div>
            </div>
        </>
    )
}