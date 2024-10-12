import React from 'react'
import Header from '../components/sections/Header'
import { MdOutlineMailLock } from 'react-icons/md'
import Link from 'next/link'

export default function Auth() {



  return (
    <>
        <Header/>
        <div className='flex justify-center items-center h-screen bg-gradient-to-b from-mainSecondColor to-mainColor'>
        <>
            <div className="flex items-start justify-between p-4">
              <div>
                <h5 className="text-xl font-medium text-slate-800">Connect a Wallet</h5>
                <p className="text-slate-500 text-sm font-light">Choose which wallet to connect</p>
              </div>
            </div>

            <div className="px-4">
              <div className="mb-6">
                <p className="pt-3 text-xs uppercase text-slate-500">Popular</p>
                <button className="w-full mt-3 flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
                  <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamask" className="h-5 w-5 mr-2" />
                  Connect Wallet
                </button>

                <button className="w-full mt-2 flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
                  <img src="https://docs.material-tailwind.com/icons/coinbase.svg" alt="coinbase" className="h-5 w-5 mr-2 rounded-md" />
                  Connect with Coinbase
                </button>
              </div>

              <div>
                <p className="pt-3 text-xs uppercase text-slate-500">Other</p>
                <Link href={'/login'} className="mt-3 w-full flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
                <MdOutlineMailLock size={20} color="blue" className="mr-2" />
                Connect with Email
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 text-blue-gray-500 mt-2">
              <p className="text-sm text-slate-500">New to Ethereum wallets?</p>
              <button className="border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
                Learn More
              </button>
            </div>
            </>
        </div>
    </>
  )
}
