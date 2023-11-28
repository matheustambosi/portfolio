'use client'

import React, { useRef } from "react"
import { Input, Card, CardBody, Button, Image } from "@nextui-org/react";
import logo from '@/app/assets/images/logo.png';
import { toast } from "react-toastify";
import { BackIcon } from "../assets/icons/BackIcon";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPage() {
    const { data: session } = useSession()
    const router = useRouter()

    if (session) {
        redirect('/eventos')
    }

    const userName = useRef("")
    const email = useRef("")
    const password = useRef("")
    const confPassword = useRef("")

    async function cadastrar() {
        var request = {
            nome: userName.current,
            email: email.current,
            senha: password.current,
            repeticaoSenha: confPassword.current
        }

        validarRequest(request)

        const res = await fetch('http://localhost:43606/Autenticacao/Cadastro', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.ok) {
            
        } else {
            const data = res.json()

            data.then((error) => {
                toast(error.mensagem, { type: 'error', autoClose: 2000 })
            })
        }
    }

    function validarRequest(request: any) {
        if (request.senha !== request.repeticaoSenha)
            toast('As senhas não são iguais', { hideProgressBar: true, autoClose: 2000, type: 'error' })
    }

    return (
        <div className="flex flex-col h-full justify-center items-center bg-orange-400">

            <div className="w-4/5 md:w-4/6 lg:w-2/5 flex flex-col items-center">
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

                <Card className="w-full md:w-4/5 lg:w-4/5 shadow-lg">
                    <CardBody>
                        <div className="mb-8">
                            <Input type="email" variant="underlined" label="Email" onChange={(e: any) => (email.current = e.target.value)} />
                            <Input type="text" variant="underlined" label="Usuário" onChange={(e: any) => (userName.current = e.target.value)} />
                            <Input type="password" variant="underlined" label="Senha" onChange={(e: any) => (password.current = e.target.value)} />
                            <Input type="password" variant="underlined" label="Confirmação Senha" onChange={(e: any) => (confPassword.current = e.target.value)} />
                        </div>

                        <Button color="primary" onClick={cadastrar} className="bg-orange-400">Cadastrar-se</Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
