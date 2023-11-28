import React from 'react'

import { Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import QrReader from "react-qr-reader";


export default function QrCodeScannerModal({ isOpen, onOpenChange, associarAtletica }: any) {
  const handleScan = (data: any, close: any) => {
    if (data) {
      associarAtletica(data)
      close()
    }
  }

  const handleError = (err: any) => {
    console.error(err)
  }

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Escanear QRCode</ModalHeader>
              <ModalBody>
                <QrReader
                  onScan={(e) => handleScan(e, onClose)}
                  onError={handleError}
                  facingMode='environment'
                  delay={2000}
                  className="w-full"
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
