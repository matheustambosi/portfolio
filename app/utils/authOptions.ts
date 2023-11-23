import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { toast } from "react-toastify";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const request = {
                    email: credentials?.email,
                    senha: credentials?.password
                }

                var res = await fetch('http://localhost:43606/Autenticacao/Login', {
                    method: 'POST',
                    body: JSON.stringify(request),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json()

                if (res.ok && data) {
                    return {
                        id: data.codigo,
                        nome: data.nome,
                        token: data.token,
                        tipoUsuario: data.tipoUsuario
                    }
                } else {
                    throw Error(data.mensagem)
                }

                return null
            }
        })
    ],

    pages: {
        signIn: "/login"
    },

    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as any;
            return session;
        }
    }
}