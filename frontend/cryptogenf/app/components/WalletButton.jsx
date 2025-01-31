import { useAccount, useDisconnect, useSignMessage } from 'wagmi';
import { RiWallet3Fill } from 'react-icons/ri';
import { useState } from 'react';
import { modal } from '@/providers/Web3Provider';
import { useSession } from 'next-auth/react';

export default function WalletButton() {
  const { data: session } = useSession();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const [loading, setLoading] = useState(false);
    const { signMessageAsync } = useSignMessage();

    const handleConn = async () => {
      try {
        setLoading(true);
        if (!isConnected) {
          modal.open(); 
        } else {
          disconnect();
        }
        
        // Verifica se o usuário já está conectado e executa a lógica de backend
        if (isConnected && address) {
          const userId = session?.user?.id || null;
  
          const endpoint = userId
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet/link`
            : `${process.env.NEXT_PUBLIC_BACKEND_URL}/wallet`;
  
          const nonceRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/nonce`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
  
          const { nonce } = await nonceRes.json();
          if (!nonce) throw new Error('Nonce not found');
  
          const signature = await signMessageAsync({ message: nonce });
  
          const authResponse = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              walletAddress: address,
              signature,
              nonce,
              ...(userId ? { userId } : {}),
            }),
          });
  
          const result = await authResponse.json();
  
          if (authResponse.ok) {
            console.log('Wallet authenticated:', result);
          } else {
            console.error('Authentication failed:', result);
          }
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