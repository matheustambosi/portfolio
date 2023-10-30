'use client'

import { useSession } from "next-auth/react"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

export default function Home() {
  const { data: session, status } = useSession({
    required: true
  })

  if (status === "loading") {
    return <></>
  }

  return (
    <main className="bg-orange-400 px-4">
    </main>
  )
}
