import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';

export default function AddEditModal({ refresh, isOpen, onOpenChange, item }: any) {
    const [nomeAtletica, setNomeAtletica] = useState("")
    const [situacaoAtletica, setSituacaoAtletica] = useState("");
    const [universidade, setUniversidade] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");

    const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSituacaoAtletica(e.target.value);
    };

    async function submitAtletica(closeModal: any) {
        var situacao: Number = +situacaoAtletica

        const req = {
            nomeAtletica: nomeAtletica,
            universidade: universidade,
            cidade: cidade,
            estado: estado,
            situacao: situacao
        } as any

        const session = await getSession()

        if (item.codigo) {
            fetch('http://localhost:43606/Atletica/' + item.codigo, {
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
            fetch('http://localhost:43606/Atletica', {
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
            setNomeAtletica(item.nome)
            setSituacaoAtletica(item.situacao.toString())
            setUniversidade(item.universidade)
            setCidade(item.cidade)
            setEstado(item.estado)
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Nova Atletica</ModalHeader>
                            <ModalBody className="grid grid-cols-12">
                                <Input className="col-span-12" type="text" label="Nome" value={nomeAtletica} onChange={(e: any) => setNomeAtletica(e.target.value)} />

                                <Input className="col-span-12" type="text" label="Universidade" value={universidade} onChange={(e: any) => setUniversidade(e.target.value)} />

                                <Input className="col-span-8" type="text" label="Cidade" value={cidade} onChange={(e: any) => setCidade(e.target.value)} />

                                <Input className="col-span-4" type="text" label="Estado" value={estado} onChange={(e: any) => setEstado(e.target.value)} />

                                {
                                    item.codigo &&
                                    <Select
                                        label="Situação"
                                        className="col-span-12"
                                        selectedKeys={situacaoAtletica}
                                        onChange={handleSelectionChange}
                                    >
                                        {situacoes.map((situacao) => (
                                            <SelectItem key={situacao.value} value={situacao.value}>
                                                {situacao.text}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                }
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
            </Modal >
        </>
    )
}
