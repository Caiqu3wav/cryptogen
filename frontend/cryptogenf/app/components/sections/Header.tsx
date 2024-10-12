'use client'
import React, { useState } from 'react'
import cyberGenLogo from '@/public/assets/logo.png'
import Image from 'next/image'
import Nav from '../Nav'
import Link from 'next/link'
import { IoAccessibility } from "react-icons/io5"
import {useSession} from 'next-auth/react'
import ProfileModal from '../ProfileModal'
import { CgProfile } from "react-icons/cg";

export default function Header() {
const {data: session} = useSession();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <header className='flex fixed top-0 z-50 justify-between items-center
     bg-gradient-to-b from-blue-300 to-transparent h-32 px-3 w-full'>
      <Link href="/" className='flex items-center border-solid border-r-2 rounded-3xl border-white pr-6 h-full'>
      <Image src={cyberGenLogo} className="w-20 rounded-full"  alt="logo" />
      </Link>
      <Nav/>
      <div className='w-fit'>
      {!session ? (
        <>
        <Link href={'/auth'} className='w-[100px] flex items-center justify-around h-8 
      rounded-lg bg-gradient-to-br from-purple-600 to-black text-white'>
        <p>Login</p> 
      <IoAccessibility size={20}/>
      </Link>
      </>
    ) : (
        <>
        <p className='mr-6 text-white'>{session.user?.name}</p>
        <button onClick={() => setProfileModalOpen(!profileModalOpen)} className='mr-6'>
          {session.user?.profilePic ? (
            <Image src={session.user.profilePic} alt='profile pic' className='rounded-full w-[60px]'/>
          ) : (
            <CgProfile size={60} className='text-white'/>
          )}
        </button>
      {profileModalOpen && <ProfileModal isOpen={profileModalOpen} setIsOpen={setProfileModalOpen}/>}
      </>
    )
  }
      </div>
    </header>
  )
}
