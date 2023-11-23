import React from 'react'

import { Button, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { QrReader } from "react-qr-reader";


export default function QrCodeScannerModal({ isOpen, onOpenChange, associarAtletica }: any) {
  function callback(result: any, close: any) {
    console.log(result)

    if (result && result?.text) {
      associarAtletica(result?.text)
      close()
    }
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
                  onResult={(result, error) => callback(result, onClose)}
                  constraints={{ facingMode: "environment" }}
                  scanDelay={5000}
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
