'use client'

import { useSession } from "next-auth/react"

export default function Eventos() {
    const { data: session, status } = useSession({
        required: true
    })

    if (status === "loading") {
        return <></>
    }

    return (
        <main className="px-4">
            Eventos
        </main>
    )
}
