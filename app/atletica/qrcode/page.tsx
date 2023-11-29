'use client'

import React, { useEffect, useState } from "react";
import { BreadcrumbItem, Breadcrumbs, useDisclosure } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react";
import { QRCode } from "@/app/types";
import AddEditModal from "./AddEditModal";
import TableQrCode from "./TableQrCode";
import QrCodeModal from "./QrCodeModal";

export default function QRCodes() {
    const { data: session } = useSession({
        required: true
    })

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenQrCode, onOpen: onOpenQrCode, onOpenChange: onOpenChangeQrCode } = useDisclosure();


    const [qrCode, setQrCode] = useState<QRCode>();
    const [items, setItems] = useState<QRCode[]>([]);
    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch('http://localhost:43606/QRCode', {
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

    function openAddModal() {
        var qrCode: QRCode = {
            descricao: "",
            duracaoDias: 15
        }
        setQrCode(qrCode)
        onOpen()
    }

    function openQrCodeModal(item: QRCode) {
        setQrCode(item)
        onOpenQrCode()
    }

    return (
        <>
            <div className="p-2 h-5/6">
                <Breadcrumbs className="py-2">
                    <BreadcrumbItem size="lg">Atleticas</BreadcrumbItem>
                    <BreadcrumbItem size="lg">QRCodes</BreadcrumbItem>
                </Breadcrumbs>

                <TableQrCode refresh={refresh} qrCodes={items} openAddModal={openAddModal} openQrCodeModal={openQrCodeModal}></TableQrCode>
            </div>

            <QrCodeModal isOpen={isOpenQrCode} onOpenChange={onOpenChangeQrCode} item={qrCode}></QrCodeModal>
            <AddEditModal isOpen={isOpen} onOpenChange={onOpenChange} refresh={refresh} item={qrCode}></AddEditModal>
        </>
    );
}
