'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Atletica } from "@/app/types";
import AddEditModal from "./AddEditModal";
import TableAtletica from "./TableAtletica";

export default function Atleticas() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [atletica, setAtletica] = useState<Atletica>();
    const [items, setItems] = useState<Atletica[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch(`${process.env.API_URL}/Atletica`, {
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

    function openEditModal(item: Atletica) {
        setAtletica(item)
        onOpen()
    }

    function openAddModal() {
        var atletica: Atletica = {
            nome: "",
            universidade: "",
            cidade: "",
            estado: "",
            situacao: 1
        }
        setAtletica(atletica)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Administrador</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Atleticas</BreadcrumbItem>
                </Breadcrumbs>

                <TableAtletica refresh={refresh} atleticas={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableAtletica>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={atletica}></AddEditModal>
        </>
    );
}
