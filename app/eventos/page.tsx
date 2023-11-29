'use client'

import { Evento, EventoList, Modalidade } from "@/app/types";
import { Button, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react";
import AddEditModal from "./AddEditModal";
import { format } from 'date-fns';
import DetalhesModal from "./DetalhesModal";

export default function Eventos() {
    const [items, setItems] = useState<EventoList[]>([]);
    const [modalidades, setModalidades] = useState<Modalidade[]>([]);
    const [evento, setEvento] = useState<Evento>();

    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenDetalhes, onOpen: onOpenDetalhes, onOpenChange: onOpenDetalhesChange } = useDisclosure();

    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch('http://localhost:43606/Evento', {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const response = await query.json()

            setItems(response)
        }

        getData()
    }, [refreshKey])

    function openAddEvento() {
        const getModalidades = async () => {
            const query = await fetch('http://localhost:43606/Modalidade', {
                headers: {
                    authorization: `Bearer ${session?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const response = await query.json()

            setModalidades(response)
        }
        getModalidades()
        onOpen()
    }

    function onOpenDetalhesModal(evento: Evento) {
        setEvento(evento)
        onOpenDetalhes()
    }

    return (
        <>
            <main className="h-[92%] flex justify-center">
                <div className="flex flex-col px-4 w-full md:w-4/6 lg:w-3/6 lg:px-16 bg-white">
                    {
                        (session?.user.tipoUsuario === 2 || session?.user.tipoUsuario === 3) &&
                        <Button className="bg-orange-400 text-white text-lg py-6 mt-4" onClick={openAddEvento}>Novo Evento</Button>
                    }

                    <div className="h-5/6 overflow-x-hidden mt-4">
                        {
                            items.length > 0 && items.map((item, index) => {
                                return (
                                    <div key={index} className="mt-6 w-full flex flex-col justify-center">
                                        <h1 className="text-2xl font-bold">{format(new Date(item.dtEvento), 'dd/MM/yyyy')}</h1>

                                        {
                                            item.eventos.length > 0 && item.eventos.map((item, index) => {
                                                return (
                                                    <div key={index} className="mt-6 w-full flex justify-between items-center px-4">
                                                        <h1 className="text-lg font-medium">{item.nomeEvento}</h1>
                                                        <Button isIconOnly onClick={(e) => onOpenDetalhesModal(item)}></Button>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </main >

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} modalidades={modalidades}></AddEditModal>
            <DetalhesModal isOpen={isOpenDetalhes} onOpenChange={onOpenDetalhesChange} item={evento}></DetalhesModal>
        </>
    );
}