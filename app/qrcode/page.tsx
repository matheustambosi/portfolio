'use client'

import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Button, Input, Modal, ModalContent, useDisclosure, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { users } from "./data";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { AddIcon } from "../assets/icons/AddIcon";
import { useSession } from "next-auth/react";

export default function QrCode() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session, status } = useSession({
        required: true
    })


    const [page, setPage] = React.useState(1);
    const rowsPerPage = 4;

    const pages = Math.ceil(users.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users.slice(start, end);
    }, [page]);

    return (
        <>
            <div className="p-2">
                <div className="mb-2 flex justify-between">
                    <Button isIconOnly className="bg-orange-400 mr-2" onPress={onOpen}>
                        <AddIcon className="text-white"></AddIcon>
                    </Button>

                    <Input
                        isClearable
                        classNames={{
                            base: "w-full sm:max-w-[25%]",
                            inputWrapper: "border-1",
                        }}
                        placeholder="Pesquisar..."
                        size="md"
                        startContent={<SearchIcon className="text-default-300" />}
                    />
                </div>
                <Table
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="primary"
                                page={page}
                                total={pages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn key="name">NAME</TableColumn>
                        <TableColumn key="role">ROLE</TableColumn>
                        <TableColumn key="status">STATUS</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                        {(item) => (
                            <TableRow key={item.name}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Novo QRCode</ModalHeader>
                            <ModalBody>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Fechar
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Salvar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
