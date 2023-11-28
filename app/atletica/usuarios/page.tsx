'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Usuario } from "@/app/types";
import AddEditModal from "./AddEditModal";
import TableUsuarios from "./TableUsuarios";

export default function Atleticas() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [usuario, setUsuario] = useState<Usuario>();
    const [items, setItems] = useState<Usuario[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch('http://localhost:43606/Usuario', {
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

    function openEditModal(item: Usuario) {
        setUsuario(item)
        onOpen()
    }

    function openAddModal() {
        var usuario: Usuario = {
            nome: "",
            email: "",
            tipoUsuario: 1
        }
        setUsuario(usuario)
        onOpen()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Atleticas</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Usuários</BreadcrumbItem>
                </Breadcrumbs>

                <TableUsuarios refresh={refresh} usuarios={items} openEditModal={openEditModal} openAddModal={openAddModal}></TableUsuarios>
            </div>

            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={usuario}></AddEditModal>
        </>
    );
}
