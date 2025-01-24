import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet } from 'wagmi/chains';


export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
    name: 'CryptoGen',
    description: 'A NFT Marketplace Web3 Site',
    url: 'https://cryptogen.example.com',
    icons: ['https://github.com/Caiqu3wav/cryptogen/blob/main/frontend/cryptogenf/public/assets/logo.png?raw=true'],
  };

  export const config = defaultWagmiConfig({
    chains: [mainnet],
    projectId,
    metadata,
    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
  });