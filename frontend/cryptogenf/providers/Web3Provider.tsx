'use client';

import { wagmiAdapter, projectId } from '@/lib/reownConfig'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react';
import { mainnet } from '@reown/appkit/networks';
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi';

const queryClient = new QueryClient();

if (!projectId) {
    throw new Error('Project ID is not defined');
}

const metadata = {
    name: 'CryptoGen',
    description: 'A NFT Marketplace Web3 Site',
    url: 'https://cryptogen.example.com',
    icons: ['https://github.com/Caiqu3wav/cryptogen/blob/main/frontend/cryptogenf/public/assets/logo.png?raw=true'],
  };

export const modal = createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    metadata,
    networks: [mainnet],
    defaultNetwork: mainnet,
    features: {
        analytics: true,
    }
});

function Web3Provider({ children, cookies }: { children: React.ReactNode; cookies: string | null }) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);
    
    return (
        <>
            <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}

export default Web3Provider;