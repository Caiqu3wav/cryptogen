import Header from "@/app/components/sections/Header";

export default function Collection() {
    return (
        <>
           <Header/>
          <div className='flex items-center h-screen bg-gradient-to-b hero-sec min-h-[600px]'>
            <div className='h-screen text-white'>
              <div>
              <h1 className='text-3xl'>Create a new collection</h1>
              </div>
                <form action="" className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="">Collection Name</label>
                        <input type="text" className="ml-3 bg-gray-400 rounded-md" name="name" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Collection Description</label>
                        <input type="text" className="ml-3 bg-gray-400 rounded-md" name="description" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Collection Category</label>
                        <input type="text" className="ml-3 bg-gray-400 rounded-md" name="category" id="" />
                    </div>
                    <div>
                        <label htmlFor="">Collection Image</label>
                        <input type="file" className="ml-3 bg-gray-400 rounded-md" name="image" id="" />
                    </div>

                    <div>
                        <label htmlFor="">Blockchain</label>
                        <select className="ml-3 bg-gray-400 rounded-md" name="blockchain" id="blockchain">
                        <option value="ethereum">
                            <div>
                                Ethereum
                            </div>
                        </option>
                        </select>
                    </div>
                    <button type="submit" className="px-8 py-2 rounded-xl bg-mainColor">Create</button>
                </form>
                
                </div>
              </div>
        </>
      )
}
