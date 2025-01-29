import { createAppKitClient } from '@reown/appkit'
import { configureChains, createClient } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const chains = [mainnet]
const { provider, webSocketProvider  } = configureChains(chains, [publicProvider()]);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const appKitClient = createAppKitClient({
    wagmiClient,
    appName: "Cryptogen",
    chains,
});

export { wagmiClient, appKitClient }