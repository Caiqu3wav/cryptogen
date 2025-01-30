import { cookieStorage, createStorage } from "wagmi"
import { mainnet } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

export const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const networks = [mainnet];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage(cookieStorage),
  ssr: true,
  projectId,
  networks,
});

export const config = wagmiAdapter.wagmiConfig;