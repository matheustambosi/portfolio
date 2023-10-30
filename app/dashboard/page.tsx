'use client'

import { useSession } from "next-auth/react"

export default function Home() {
    const { data: session, status } = useSession({
        required: true
    })

    if (status === "loading") {
        return <></>
    }

    return (
        <main className="min-h-screen flex justify-center items-center">
            <h1>Dashboard</h1>
        </main>
    )
}
