import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { RiWallet3Fill } from 'react-icons/ri';
import { useState } from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function WalletButton() {
    const { address, isConnected } = useAccount();
    const { open } = useWeb3Modal();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const [loading, setLoading] = useState(false);

    const handleConn = async () => {
      try {
        setLoading(true);
        if (!isConnected) {
          await open();

          if (address) {
            await handleBackend(address);
            console.log('Wallet connected:', address);
          }
        } else {
          disconnect();
        }
      } catch (error) {
        console.error('Error connecting/disconnecting:', error);
      } finally {
        setLoading(false);
      }
    };

    const handleBackend = async (walletAddress) => {
      try {
       const nonceRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/nonce`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', },
        });

        const { nonce } = await nonceRes.json();
        if (!nonce) {
          throw new Error('Nonce not found');
        }

        const signature = await signMessageAsync({ message: nonce });

        const authResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wallet`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', },
          body: JSON.stringify({ 
            address: walletAddress, 
            signature,
            nonce,
           }),
       });

        const result = await authResponse.json();

        if (authResponse.ok) {
          console.log('Authentication successful:', result);
        } else {
          console.error('Authentication failed:', result);
        }
      } catch (error) {
        console.error('Error signing message:', error);
      }
    };

    return (
        <button
      onClick={handleConn}
      className="flex items-center text-lg justify-center gap-2 rounded-2xl bg-slate-500 hover:bg-purple-400 hover:text-white transition-colors duration-300
       px-2 py-2"
    >
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