import { useAccount, useDisconnect } from 'wagmi';
import { RiWallet3Fill } from 'react-icons/ri';
import { useState } from 'react';
import { modal } from '@/providers/Web3Provider';

export default function WalletButton() {
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [loading, setLoading] = useState(false);

    const handleConn = async () => {
      try {
        setLoading(true);
        if (!isConnected) {
           modal.open();
        } else {
          disconnect();
        }
      } catch (error) {
        console.error('Error connecting/disconnecting:', error);
      } finally {
        setLoading(false);
      }
    };


    return (
        <button
      onClick={handleConn}
      className="flex items-center text-lg justify-center gap-2 rounded-2xl bg-slate-500 hover:bg-purple-400 hover:text-white transition-colors duration-300
       px-2 py-2">
      <RiWallet3Fill />
      <p>|</p>
      {isConnected ? (
        <p>{loading ? 'Verifying...' : `${address.slice(0, 6)}...${address.slice(-4)}`}</p>
      ) : (
        <p>Add Wallet</p>
      )}
    </button>
    );
}