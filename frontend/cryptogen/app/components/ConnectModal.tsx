import { SetStateAction } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import cyberGenLogo from '@/public/assets/logo.png'
import Image from "next/image";
import Link from "next/link";

interface ConnectWallet {
    isOpen: boolean,
    setIsOpen: (value: SetStateAction<boolean>) => void,
}

export default function ConnectModal({isOpen, setIsOpen}: ConnectWallet) {

  return (
    <>
      {isOpen && (
          <div className="relative flex flex-col py-2 items-center justify-center m-4 w-[30%] majortwo0.1:w-[40%] majorthree:w-[50%] majorfour2:w-[65%] 
           midtwo3:w-[94%] rounded-lg bg-white shadow-sm">
          <Image src={cyberGenLogo} alt="logo" className="w-20 rounded-full h-auto" />
          
            <>
            <div className="flex items-start justify-between p-4">
              <div>
                <h5 className="text-xl font-medium text-slate-800">Connect a Wallet</h5>
                <p className="text-slate-500 text-sm font-light">Choose which wallet to connect</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="relative h-8 w-8 text-blue-gray-500 transition-all hover:bg-blue-gray-500/10"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
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
      )}
    </>
  );
}
