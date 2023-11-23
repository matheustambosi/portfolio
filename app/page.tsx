'use client'

import { Button, Image } from "@nextui-org/react";
import logo from '@/app/assets/images/logo.png';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  return (
    <main className="bg-orange-400 h-full flex flex-col justify-center items-center px-4">
      <Image
        alt="logo"
        src={logo.src}
        className="mb-8"
      ></Image>

      <h1 className="text-3xl font-bold mb-12 text-white text-center">Fique por dentro do que acontece na sua atletica</h1>

      <div className="flex gap-6">
        <Button className="text-2xl py-8 bg-white text-orange-400" onClick={(e) => router.push('/login')}>
          Entrar
        </Button>

        <Button className="text-2xl py-8 bg-white text-orange-400" onClick={(e) => router.push('/cadastrar-se')}>
          Cadastrar-se
        </Button>
      </div>
    </main >
  )
}
