'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { Atleta } from "@/app/types";
import TableAtletas from "./TableAtletas";

export default function Atletas() {
    const { data: session } = useSession({
        required: true
    })

    const [items, setItems] = useState<Atleta[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch(`${process.env.API_URL}/Atleta`, {
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
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Atleticas</BreadcrumbItem>
                    <BreadcrumbItem size="lg">Atletas</BreadcrumbItem>
                </Breadcrumbs>

                <TableAtletas refresh={refresh} atletas={items}></TableAtletas>
            </div>
        </>
    );
}
