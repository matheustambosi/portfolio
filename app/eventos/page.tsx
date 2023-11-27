'use client'

import { Evento } from "@/app/types";
import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react";
import AddEditModal from "./AddEditModal";
import { format } from 'date-fns';

export default function Eventos() {
    const [items, setItems] = useState<Evento[]>([]);

    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

    return (
        <>
            <main className="h-5/6 flex justify-center bg-orange-100 shadow-lg">
                <div className="flex flex-col w-full md:w-4/6 lg:w-3/6 px-16 bg-white shadow-[rgba(0,0,1,0.5)_0px_0px_10px_0px]">
                    {
                        (session?.user.tipoUsuario === 2 || session?.user.tipoUsuario === 3) &&
                        <Button className="bg-orange-400 text-white text-lg py-6 mt-4" onClick={onOpen}>Novo Evento</Button>
                    }

                    <h1 className="text-2xl text-center mt-6 font-bold">Eventos</h1>

                    <div className="h-4/6 overflow-x-hidden mt-4">
                        {
                            items.length > 0 && items.map((item, index) => {
                                return (
                                    <Card key={item.codigo} className="mt-6">
                                        <CardBody className="w-full flex flex-col justify-center rounded-lg">
                                            <h1 className="text-xl font-bold">{format(new Date(item.dtEvento), 'dd/MM/yyyy')}</h1>
                                            <h1 className="text-lg">{item.nomeEvento}</h1>
                                            <h1 className="text-lg">{item.enderecoEvento}</h1>
                                        </CardBody>
                                    </Card>
                                )
                            })
                        }
                    </div>
                </div>
            </main >

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh}></AddEditModal>
        </>
    );
}