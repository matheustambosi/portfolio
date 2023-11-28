import React, { useEffect, useState } from 'react'

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import QRCode from 'react-qr-code';
import QRCodeLink from 'qrcode'

export default function QrCodeModal({ isOpen, onOpenChange, item }: any) {
    const [qrCode, setQrCode] = useState("")
    const [qrCodeLink, setQrCodeLink] = useState("")

    useEffect(() => {
        if (item) {
            setQrCode(item.codigo)

            if (item.codigo)
                QRCodeLink.toDataURL(item.codigo,
                    {
                        width: 600,
                        margin: 3
                    }, function (err, url) {
                        setQrCodeLink(url)
                    })
        }
    }, [item])

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(close) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">QRCode</ModalHeader>
                            <ModalBody className="w-full flex items-center">
                                <QRCode value={qrCode} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={close}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={close}>
                                    <a href={qrCodeLink} download={`${item.descricao}.png`}>Baixar QRCode</a>
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
