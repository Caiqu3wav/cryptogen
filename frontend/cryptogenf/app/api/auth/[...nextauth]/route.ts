import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email@example.com" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
             authorize: async (credentials) => {
                if (!credentials) return null;

                const { email, password } = credentials;
                
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/login`, {
              email,
              password,
            });

            const user = {
              id: response.data.user?.id,
              name: response.data.user?.name,
              email: response.data.user?.email,
              profileImage: response.data.user?.profile_image || null,
              walletAddress: response.data.user?.wallet_address || null,
              };
              
            if (!user.id || !user.email) {
              throw new Error('Dados do usuário incompletos');
          }

                return user;
          } catch (error) {
            console.error('Failed to authorize', error);
            throw new Error('Credenciais inválidas');
          }
        },
      }),
          // Wallet Authentication
          CredentialsProvider({
            name: 'Wallet',
            credentials: {
              walletAddress: { label: "Wallet Address", type: "text" },
              signature: { label: "Signature", type: "text" }
            },
            authorize: async (credentials) => {
              if (!credentials) return null;
      
              const { walletAddress, signature } = credentials;
      
              try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/wallet`, {
                  walletAddress,
                  signature
                });
      
                const user = {
                  id: response.data.user?.id,
                  name: response.data.user?.name || null,
                  email: response.data.user?.email || null,
                  profileImage: response.data.user?.profile_image || null,
                  walletAddress: response.data.user?.wallet_address || null
                };
      
                if (!user.id || !user.walletAddress) {
                  throw new Error("Invalid wallet login");
                }
      
                return user;
              } catch (error) {
                console.error("Failed to authorize wallet", error);
                throw new Error("Wallet authentication failed");
              }
            },
          }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string | null;
        session.user.walletAddress = token.walletAddress as string | null;
        session.user.profileImage = token.picture as string | null;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email || null;
        token.picture = user.profileImage || null;
        token.walletAddress = user.walletAddress || null;
            }
      return token;
    }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };