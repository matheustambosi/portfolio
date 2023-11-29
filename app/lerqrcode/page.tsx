'use client'

import { getSession, useSession } from "next-auth/react"
import { Button, useDisclosure } from "@nextui-org/react";
import React, { useState } from "react";
import { AlertIcon } from "../assets/icons/AlertIcon";
import { toast } from "react-toastify";
import QrCodeScannerModal from "./QrCodeScannerModal";

async function associarAtletica(codigoAtletica: string) {
    const session = await getSession()

    await fetch(`http://localhost:43606/Usuario/AssociarAtletica/${codigoAtletica}`, {
        method: 'POST',
        headers: {
            authorization: `Bearer ${session?.user.token}`,
            'Content-Type': 'application/json',
        }
    }).then((res) => {
        if (res.ok) {
            toast("QRCode lido com sucesso, faça o login novamente para atualizar o sistema.", { type: 'success', autoClose: 3000 })
        }
    })
}

export default function Generate() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const { data: session } = useSession({
        required: true
    })

    return (
        <>
            <main className="h-screen flex flex-col">
                <div className="flex flex-col justify-center items-center bg-orange-400 w-full py-6">
                    <h1 className="p-6 text-xl text-center text-white">Escaneie o <span className="font-bold">QRCode de sua atletica</span> para ficar por dentro dos eventos!</h1>

                    <Button onClick={onOpen}>LER QRCODE</Button>
                </div>

                <div className="flex flex-col justify-center items-center bg-orange-400 w-full h-full">
                    <AlertIcon className="text-white"></AlertIcon>

                    <h2 className="p-6 text-base text-center text-white">Caso não tenha acesso ao QRCode, entre em contato com os representantes de sua atética.</h2>
                </div>
            </main>

            {
                isOpen && <QrCodeScannerModal isOpen={isOpen} onOpenChange={onOpenChange} associarAtletica={associarAtletica}></QrCodeScannerModal>
            }
        </>
    );
}