import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Passoword", type: "password" }
            },
            authorize(credentials, req) {
                 if (credentials?.email === "admin" && credentials?.password === "admin") {
                    return {
                        id: "1",
                        email: "admin@gmail.com"
                    }
                 }

                 return null
            }
        })
    ]
}