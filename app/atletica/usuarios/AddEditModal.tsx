import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [nomeUsuario, setNomeUsuario] = useState("")
    const [emailUsuario, setEmailUsuario] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("")

    const handleSelectionTipoUsuario = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoUsuario(e.target.value);
    };

    async function submitAtletica(closeModal: any) {
        var tipo: Number = +tipoUsuario

        const req = {
            Nome: nomeUsuario,
            Email: emailUsuario,
            TipoUsuario: tipo
        } as any

        const session = await getSession()

        if (item.codigo) {
            fetch('http://localhost:43606/Usuario/' + item.codigo, {
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
            fetch('http://localhost:43606/Usuario', {
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

    const tiposUsuario = [
        { text: "Universitário", value: 1 },
        { text: "Representante", value: 2 }
    ]

    useEffect(() => {
        if (item) {
            setNomeUsuario(item.nome)
            setEmailUsuario(item.email)
            setTipoUsuario(item.tipoUsuario.toString())
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nova Atletica</ModalHeader>
                            <ModalBody>
                                <Input type="text" label="Nome" value={nomeUsuario} onChange={(e: any) => setNomeUsuario(e.target.value)} />

                                <Input type="text" label="Email" value={emailUsuario} onChange={(e: any) => setEmailUsuario(e.target.value)} />

                                <Select
                                    label="Tipo Usuário"
                                    placeholder="Selecione"
                                    selectedKeys={tipoUsuario}
                                    onChange={handleSelectionTipoUsuario}
                                >
                                    {tiposUsuario.map((tipoUsuario) => (
                                        <SelectItem key={tipoUsuario.value} value={tipoUsuario.value}>
                                            {tipoUsuario.text}
                                        </SelectItem>
                                    ))}
                                </Select>
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
