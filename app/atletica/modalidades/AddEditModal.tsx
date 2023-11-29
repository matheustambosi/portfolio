import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Switch } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [descricao, setDescricao] = useState("")
    const [buscandoAtletas, setBuscandoAtletas] = useState(true)

    async function submitModalidade(closeModal: any) {
        const req = {
            Descricao: descricao,
            BuscandoAtletas: buscandoAtletas
        } as any

        const session = await getSession()

        if (item.codigo) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Modalidade/` + item.codigo, {
                method: 'PUT',
                body: JSON.stringify(req),
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res.ok) {
                    toast('Alterado com sucesso', { type: 'success', autoClose: 2000 })
                    refresh()
                    closeModal()
                } else {
                    const data = res.json()

                    data.then((error) => {
                        toast(error.mensagem, { type: 'error', autoClose: 2000 })
                    })
                }
            })
        } else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Modalidade`, {
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
    }

    const situacoes = [
        { text: "Ativa", value: 1 },
        { text: "Inativa", value: 0 }
    ]

    useEffect(() => {
        if (item) {
            setDescricao(item.descricao)
            setBuscandoAtletas(item.buscandoAtletas)
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nova Modalidade</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Descrição" value={descricao} onChange={(e: any) => setDescricao(e.target.value)} />

                                <Switch className="mt-4" size="sm" isSelected={buscandoAtletas} onValueChange={setBuscandoAtletas}>
                                    Buscando Atletas
                                </Switch>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={(e: any) => submitModalidade(onClose)}>
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
