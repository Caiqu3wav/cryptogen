import type { Metadata } from "next";
import "./globals.css";
import SessionProvider  from './providers/authProviders'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import Web3Provider from "@/providers/Web3Provider";

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
  const headersObj = await headers();
  const cookies = headersObj.get("cookie");

  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body>
      <Web3Provider cookies={cookies}>
        {children}
        </Web3Provider>
      </body>
    </html>
    </SessionProvider>
  );
}
