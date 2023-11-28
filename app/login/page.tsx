'use client'

import React, { useRef } from "react"
import { Input, Card, CardBody, Button, Image } from "@nextui-org/react";
import logo from '@/app/assets/images/logo.png';
import { signIn, useSession } from "next-auth/react";
import { BackIcon } from "../assets/icons/BackIcon";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    if (session) {
        router.replace('/eventos')
    }

    const email = useRef("")
    const password = useRef("")

    const onSubmit = async (e: any) => {
        const res = await signIn("credentials", {
            email: email.current,
            password: password.current,
            redirect: false
        })

        if (res?.ok)
            router.replace('/eventos')
        else
            toast(res?.error, { type: 'error', autoClose: 2000 })
    }

    return (
        <div className="flex flex-col h-full justify-center items-center bg-orange-400">

            <div className="w-3/5 md:w-2/5 lg:w-1/5 flex flex-col items-center">
                <Button
                    onClick={(e) => router.push('/')}
                    isIconOnly
                    className="mb-5 self-start bg-white shadow-lg"
                >
                    <BackIcon className="text-black" />
                </Button>

                <Image
                    alt="logo"
                    src={logo.src}
                    className="mb-8"
                ></Image>

                <Card className="w-full shadow-lg">
                    <CardBody>
                        <div className="mb-8">
                            <Input type="email" variant="underlined" label="Email" onChange={(e: any) => (email.current = e.target.value)} />
                            <Input type="password" variant="underlined" label="Senha" onChange={(e: any) => (password.current = e.target.value)} />
                        </div>

                        <Button color="primary" onClick={onSubmit} className="bg-orange-400">Entrar</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
