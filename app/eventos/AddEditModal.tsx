import React, { useEffect, useState } from 'react'

import { Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Checkbox } from "@nextui-org/react";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import DateTimePicker from 'react-datetime-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function AddEditModal({ refresh, isOpen, onOpenChange }: any) {
    const [nomeEvento, setNomeEvento] = useState("")
    const [enderecoEvento, setEnderecoEvento] = useState("");
    const [dtEvento, setDtEvento] = useState<Value>(new Date());
    const [visivelSemAtletica, setVisivelSemAtletica] = useState(false);
    const [visivelComAtletica, setVisivelComAtletica] = useState(false);
    const [visivelAtleta, setVisivelAtleta] = useState(false);

    async function criarEvento(closeModal: any) {
        const req = {
            NomeEvento: nomeEvento,
            EnderecoEvento: enderecoEvento,
            DtEvento: dtEvento,
            VisivelSemAtletica: visivelSemAtletica,
            VisivelComAtletica: visivelComAtletica,
            VisivelAtleta: visivelAtleta,
            Situacao: 1
        } as any

        const session = await getSession()

        const res = await fetch('http://localhost:43606/Evento', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                authorization: `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
            }
        })

        if (res.ok) {
            toast('Criado com sucesso', { type: 'success', autoClose: 2000 })
            refresh()
            closeModal()
        } else {
            const data = res.json()

            data.then((error) => {
                toast(error.mensagem, { type: 'error', autoClose: 2000 })
            })
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Novo Evento</ModalHeader>
                            <ModalBody className="grid grid-cols-12">
                                <Input className="col-span-12" type="text" label="Evento" value={nomeEvento} onChange={(e: any) => setNomeEvento(e.target.value)} />

                                <Input className="col-span-12" type="text" label="Endereço" value={enderecoEvento} onChange={(e: any) => setEnderecoEvento(e.target.value)} />

                                <div className="col-span-12">
                                    <h1>Data Evento</h1>
                                    <DateTimePicker onChange={setDtEvento} value={dtEvento} />
                                </div>

                                <div className="col-span-12">
                                    <h1 className="my-3">Visibilidade:</h1>
                                    <Checkbox isSelected={visivelSemAtletica} onValueChange={setVisivelSemAtletica}>Usuários Sem Atletica</Checkbox>
                                    <Checkbox isSelected={visivelComAtletica} onValueChange={setVisivelComAtletica}>Usuários da sua Atlética</Checkbox>
                                    <Checkbox isSelected={visivelAtleta} onValueChange={setVisivelAtleta}>Atletas da sua Atlética</Checkbox>
                                </div>

                                {
                                    visivelAtleta && <h1>CAMPO MODALIDADES</h1>
                                }
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={(e: any) => criarEvento(onClose)}>
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
