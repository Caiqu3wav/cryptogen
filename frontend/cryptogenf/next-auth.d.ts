import { DefaultSession  } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string | null;
      profileImage: string | null;
      walletAddress: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string | null;
    email: string | null;
    profileImage: string | null;
    walletAddress: string | null;
  }
}