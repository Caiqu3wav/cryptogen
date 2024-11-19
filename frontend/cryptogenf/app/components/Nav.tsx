/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState, useEffect} from 'react'
import SearchInput from '../ui/SearchInput.jsx';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';

export default function Nav() {
  const [isActive, setIsActive] = useState(false);

  
  const toggleMenu = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    const handleEscKeyPress = (e: any) => {
      if (e.keycode === 27 && isActive) {
        setIsActive(false);
      }
    };

    if (isActive) {
      document.body.style.setProperty("overflow", "hidden");
    } else {
      document.body.style.setProperty("overflow", "auto");
    }

    document.addEventListener("keydown", handleEscKeyPress);

    return () => {
      document.removeEventListener("keydown", handleEscKeyPress);
    };
  }, [isActive]);


  const sideList = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Explore',
      path: '/explore',
    },
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'MarketPlace',
      path: '/marketplace',
    },
    {
      title: 'Collections',
      path: '/collections',
    },
  ];

  return (     
    <>
    <nav className='flex flex-col gap-2 items-center'>
      <SearchInput/>
      <ul className='flex gap-6 items-center text-rose-300 majorfour2:hidden'>
        <li><Link href={'/marketplace'}>Explore</Link></li>
        <li><Link href={'/about'}>About</Link></li>
        <li><Link href={'/marketplace'}>MarketPlace</Link></li>
        <li><Link href={'/collections'}>Collections</Link></li>
        <li><Link href={'/artists'}>Artists</Link></li>
      </ul>
      <button aria-label="Open Menu" onClick={toggleMenu} className="btn-hamburguer hidden majorfour2:flex">
          <GiHamburgerMenu size={45} className="text-white" />
        </button>
    </nav>
     {isActive && (
      <div className="z-10 fixed inset-0 transition-opacity">
        <div
          onClick={() => setIsActive(false)}
          className="absolute inset-0 bg-black opacity-50"
          tabIndex="0"
        ></div>
      </div>
    )}

    <aside
      className={`transform bg-gradient-to-b from-black to-blue-500 top-0 left-0 w-64 lowtwo2:w-44 lowthreetwo:w-36 text-white font-extrabold fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 ${isActive ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {sideList.map(({ title, path }, index) => (
        <Link href={path} key={index}>
          <span className="flex items-center p-4 hover:bg-purple-500 hover:text-black">
            <span className="border-b-4 border-purple-950">{title}</span>
          </span>
        </Link>
      ))}
    </aside>
    </>
)
}
