import type { Metadata } from "next";
import "./globals.css";
import SessionProvider  from './providers/authProviders'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import WagmiProviderComp from "@/lib/wagmi/wagmi-provider";
import { headers } from "next/headers";
import { cookieToInitialState } from "wagmi";
import { config } from "@/lib/wagmi/config";


export const metadata: Metadata = {
  title: "CryptoGen",
  description: "A nft marketplace web3 site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body>
        <WagmiProviderComp initialState={initialState}>
        {children}
        </WagmiProviderComp>
      </body>
    </html>
    </SessionProvider>
  );
}
