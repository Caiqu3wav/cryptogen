

export default function NftCategoriesList() {
    const tags = ["All", "Images", "Music", "Collections", "Drops", "Avatars"];

  return (
    <div className="flex items-center justify-center w-full">
    <div className='flex my-3 self-center gap-3'>
            {tags.map((tag) => (
                <button key={tag} className='px-4 rounded-lg bg-black bg-opacity-25 text-white'>{tag}</button>
            ))}
        </div>
        </div>
  )
}
