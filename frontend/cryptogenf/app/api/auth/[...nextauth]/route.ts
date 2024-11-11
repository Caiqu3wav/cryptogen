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
              profileImage: response.data.user?.profile_image,
            };
              
            if (!user.id || !user.name || !user.email) {
              throw new Error('Dados do usuário incompletos');
          }

                return user;
          } catch (error) {
            console.error('Failed to authorize', error);
            throw new Error('Credenciais inválidas');
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
        session.user.email = token.email as string;
        session.user.profileImage = token.picture as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.profileImage;
            }
      return token;
    }
    }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };