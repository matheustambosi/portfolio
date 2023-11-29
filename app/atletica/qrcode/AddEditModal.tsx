import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [duracaoDias, setDuracaoDias] = useState(15)
    const [descricao, setDescricao] = useState("")

    async function submitAtletica(closeModal: any) {
        var duracao: Number = +duracaoDias

        const req = {
            DuracaoDias: duracao,
            Descricao: descricao
        } as any

        const session = await getSession()

        fetch('http://localhost:43606/QRCode', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                authorization: `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            if (res.ok) {
                toast('Registrado com sucesso', { type: 'success', autoClose: 2000 })
                refresh()
                closeModal()
            } else {
                const data = res.json()

                data.then((error) => {
                    toast(error.mensagem, { type: 'error', autoClose: 2000 })
                })
            }
        })
    }

    useEffect(() => {
        if (item) {
            setDuracaoDias(item.duracaoDias)
            setDescricao(item.descricao)
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Novo QRCode</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Descrição" value={descricao} onChange={(e: any) => setDescricao(e.target.value)} />

                                <Input type="text" label="Duração QRCode (dias)" value={duracaoDias.toString()} onChange={(e: any) => setDuracaoDias(e.target.value)} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={(e: any) => submitAtletica(onClose)}>
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
