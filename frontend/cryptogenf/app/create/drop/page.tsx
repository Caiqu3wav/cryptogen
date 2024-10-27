import Header from "@/app/components/sections/Header";

export default function CreateDrop() {


    
    return (
        <>
            <Header />
            <div className='flex items-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
                <div className='h-screen text-white'>
                    <div>
                        <h1 className='text-3xl'>Create a new Drop</h1>
                    </div>
                    <form action="" className="flex flex-col gap-3">
                        <div>
                            <label htmlFor="dropName">Drop Name</label>
                            <input type="text" className="ml-3 bg-gray-400 rounded-md" name="dropName" id="dropName" />
                        </div>
                        <div>
                            <label htmlFor="dropDescription">Drop Description</label>
                            <input type="text" className="ml-3 bg-gray-400 rounded-md" name="dropDescription" id="dropDescription" />
                        </div>
                        <div>
                            <label htmlFor="dropImage">Drop Image</label>
                            <input type="file" className="ml-3 bg-gray-400 rounded-md" name="dropImage" id="dropImage" />
                        </div>
                        <div>
                            <label htmlFor="collection">Associated Collection</label>
                            <select className="ml-3 bg-gray-400 rounded-md" name="collection" id="collection">
                                <option value="collection1">Collection 1</option>
                                <option value="collection2">Collection 2</option>
                                <option value="collection3">Collection 3</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="dropDate">Drop Date</label>
                            <input type="date" className="ml-3 bg-gray-400 rounded-md" name="dropDate" id="dropDate" />
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input type="number" className="ml-3 bg-gray-400 rounded-md" name="price" id="price" placeholder="Price in ETH" />
                        </div>
                        <div>
                            <label htmlFor="supply">Total Supply</label>
                            <input type="number" className="ml-3 bg-gray-400 rounded-md" name="supply" id="supply" placeholder="Total supply" />
                        </div>
                        <div>
                            <label htmlFor="blockchain">Blockchain</label>
                            <select className="ml-3 bg-gray-400 rounded-md" name="blockchain" id="blockchain">
                                <option value="ethereum">Ethereum</option>
                            </select>
                        </div>
                        <button type="submit" className="px-8 py-2 rounded-xl bg-mainColor">Create Drop</button>
                    </form>
                </div>
            </div>
        </>
    )
}
