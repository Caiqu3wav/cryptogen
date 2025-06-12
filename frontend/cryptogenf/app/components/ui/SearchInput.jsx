import { FaSearchengin } from 'react-icons/fa6'

export default function SearchInput() {
  return (
    <form className="flex border-b-2 pb-2 border-blue-50 w-[95%] items-center justify-center">
    <input type="text" placeholder="What you lookin 4?" className="rounded-tl-xl w-full  text-gray-400 px-2 bg-black/40
     h-[40px]" />
    <div className="rounded-br-xl bg-black/40 h-[40px] flex items-center text-center px-2"><button type="submit">
      <FaSearchengin className="text-gray-400 text-2xl low:text-xl"/></button>
    </div>
    </form>
  )
}