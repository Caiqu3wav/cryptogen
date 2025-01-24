import { useAccount, useConnect, useDisconnect, useSignMessage, } from 'wagmi';
import { RiWallet3Fill } from 'react-icons/ri';
import { useEffect, useState } from 'react';

export default function WalletButton() {
    const { address, isConnected } = useAccount();
    const {connect, connectors} = useConnect();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();
    const [nonce, setNonce] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchNonce = async () => {
           const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/nonce`);
           const data = await res.json();
           setNonce(data.nonce);
        };
          fetchNonce();
    }, []);

    const handleConn = async () => {
        if (isConnected) {
            disconnect();
            return;
        }

        try {
            const connector = connectors[0];
            await connect({ connector });

            setLoading(true);

            const signature = await signMessageAsync({ message: nonce });

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wallet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ address, signature }),
              });            
              
              if (res.ok) {
                alert('Wallet connected!');
              } else {
                alert('Verification Failer!');
                disconnect();
              }
        } catch(err) {
            console.error(err);
            disconnect();
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
      onClick={handleConn}
      className="flex items-center text-lg justify-center gap-2 rounded-2xl bg-slate-500 px-2 py-2"
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