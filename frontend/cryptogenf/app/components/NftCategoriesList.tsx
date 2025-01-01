

export default function NftCategoriesList() {
    const tags = ["All", "Images", "Music", "Collections", "Drops", "Avatars"];

  return (
    <div className="flex flex-col items-center justify-center w-full pb-3">
    <div className='flex my-2 self-center gap-3 midtwo2:gap-1 midtwo2:text-sm'>
            {tags.map((tag) => (
                <button key={tag} className='px-4 midtwo2:px-2 rounded-lg bg-black bg-opacity-25 text-white'>{tag}</button>
            ))}
        </div>
            <div className="flex gap-3 items-center justify-center">
        <label htmlFor="orderBy" className="text-blue-300">Order By: </label>
        <select id="orderBy" className='bg-black flex items-center justify-center text-center bg-opacity-25 text-white rounded-lg'>
    <option value="recent">Recent</option>
    <option value="popular">Popular</option>
    <option value="price-asc">Price: Low to High</option>
    <option value="price-desc">Price: High to Low</option>
    <option value="date-newest">Newest</option>
    <option value="date-oldest">Oldest</option>
    <option value="rarity-high">Rarity: High to Low</option>
    <option value="rarity-low">Rarity: Low to High</option>
    <option value="favorites-high">Favorites: High to Low</option>
    <option value="auction-ending-soon">Auction Ending Soon</option>
</select>
        </div>
        </div>
  )
}
