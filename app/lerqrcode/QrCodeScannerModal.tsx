import React from 'react'

import { Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import dynamic from 'next/dynamic';
const QrScan = dynamic(() => import('react-qr-reader'), { ssr: false })

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
                <QrScan
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
