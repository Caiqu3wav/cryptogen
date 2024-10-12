import { FaSearchengin } from 'react-icons/fa6'

export default function SearchInput() {
  return (
    <form className="flex border-b-2 pb-2 border-blue-50">
    <input type="text" placeholder="What you lookin 4?" className="rounded-tl-xl w-[600px] majorthree:w-[300px] text-black
     midthree:w-[150px] px-2 bg-black bg-opacity-40
     h-[40px]" />
    <div className="rounded-br-xl bg-black bg-opacity-40 flex items-center text-center px-2"><button type="submit">
      <FaSearchengin className="text-gray-400 text-2xl"/></button>
    </div>
    </form>
  )
}