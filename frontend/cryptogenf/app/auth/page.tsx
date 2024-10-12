import React from 'react'
import Header from '../components/sections/Header'
import ConnectModal from '../components/ConnectModal'

export default function Auth() {


  return (
    <>
        <Header/>
        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
          <ConnectModal/>
        </div>
    </>
  )
}
