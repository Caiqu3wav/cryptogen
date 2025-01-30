'use client'
import { MdAssignment, MdOutlineMailLock } from "react-icons/md"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader } from "./Loader"
import { modal } from "@/providers/Web3Provider"
import { useAccount } from 'wagmi'

export default function ConnectModal() {
const [isLoading, setIsLoading] = useState(false);
const { address, isConnected } = useAccount();
const [messageLogin, setMessageLogin] = useState<string | null>(null);
const router = useRouter();

const loginWithWallet = async () => {
         setIsLoading(true);
         if (!isConnected) {
            modal.open();
         } 
          setIsLoading(false);
        };
         
         useEffect(() => {
            if (isConnected && address) {
          setMessageLogin("Wallet connected with success, you can configure your user account with your wallet, redirecting to home page");

          setTimeout(() => {
            router.push('/');
          }, 3000);
          }
         }, [isConnected, router, address]);


  return (
    <div className="w-[50%] bg-white rounded-xl">
      {messageLogin !== null ? (
        <div className="bg-green-500 text-white p-4 rounded-md mb-4">
          <p>{messageLogin}</p>
        </div>
      ) : (
     <>
      <div className="flex items-start w-[50%] justify-between p-4">
        <div>
          <h5 className="text-xl font-medium text-slate-800">Connect a Wallet</h5>
          <p className="text-slate-500 text-sm font-light">Choose which wallet to connect</p>
        </div>
      </div>

      <div className="px-4">
        <div className="mb-6">
          <p className="pt-3 text-xs uppercase text-slate-500">Popular</p>
          <button className="w-full mt-3 flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800"
           onClick={loginWithWallet} >
            <img src="https://docs.material-tailwind.com/icons/metamask.svg" alt="metamask" className="h-5 w-5 mr-2" />
            Connect Wallet {isLoading && <Loader size={20}/>}
          </button>
        </div>

        <div>
        <p className="pt-3 text-xs uppercase text-slate-500">Other</p>
          <Link href={'/auth/login'} className="mt-3 w-full flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
            <MdOutlineMailLock size={20} color="blue" className="mr-2" />
            Connect with Email
          </Link>
        </div>
        
        <div>
          <Link href={'/auth/register'} className="mt-3 w-full flex items-center justify-center border border-slate-300 py-2 px-4 text-sm text-slate-600 transition-all hover:text-white hover:bg-slate-800">
            <MdAssignment size={20} color="blue" className="mr-2" />
            SignUp
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
       )}
    </div>
  );
}
