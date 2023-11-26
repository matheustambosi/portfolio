'use client'

import { useSession } from 'next-auth/react'
import React, {  } from 'react'

export default function Footer() {
    const { data: session, status } = useSession()

    return session?.user && (
        <div className="w-full h-16 bg-orange-400 flex items-center justify-center text-white">
            Footer
        </div>
    )
}
