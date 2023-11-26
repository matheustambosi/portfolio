'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Modalidade, Usuario } from "@/app/types";
import AddEditModal from "./AddEditModal";
import TableModalidades from "./TableModalidades";

export default function Modalidades() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [modalidade, setModalidade] = useState<Modalidade>();
    const [items, setItems] = useState<Modalidade[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch('http://localhost:43606/Modalidade', {
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

    function openEditModal(item: Modalidade) {
        setModalidade(item)
        onOpen()
    }

    function openAddModal() {
        var modalidade: Modalidade = {
            descricao: "",
            buscandoAtletas: true
        }
        setModalidade(modalidade)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Atleticas</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Modalidades</BreadcrumbItem>
                </Breadcrumbs>

                <TableModalidades refresh={refresh} modalidades={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableModalidades>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={modalidade}></AddEditModal>
        </>
    );
}
