import React from 'react'

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Pagination, Input } from "@nextui-org/react";
import { DeleteIcon } from "@/app/assets/icons/DeleteIcon";
import { toast } from 'react-toastify';
import { getSession } from 'next-auth/react';
import { SearchIcon } from '@/app/assets/icons/SearchIcon';

export default function TableAtletas({ atletas, refresh }: any) {
    const [page, setPage] = React.useState(1);
    const [filterValue, setFilterValue] = React.useState("");

    const columns = [
        { name: "ATLETA", uid: "nomeAtleta" },
        { name: "MODALIDADE", uid: "modalidade" },
        { name: "AÇÕES", uid: "actions" },
    ]

    async function deleteAtleta(codigo: string) {
        const session = await getSession()

        fetch(`${process.env.API_URL}/Atleta/${codigo}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${session?.user.token}`
            }
        }).then((res) => {
            if (res.ok) {
                toast('Deletado com sucesso', { type: 'success', autoClose: 2000 })
                refresh()
            } else {
                const data = res.json()

                data.then((error) => {
                    toast(error.mensagem, { type: 'error', autoClose: 2000 })
                })
            }
        })
    }

    const rowsPerPage = 10;

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let filteredAtletas = [...atletas];

        if (hasSearchFilter) {
            filteredAtletas = filteredAtletas.filter((user) =>
                user.nome.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        return filteredAtletas;
    }, [atletas, filterValue, hasSearchFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems]);

    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1)
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
    }, [])

    return (
        <>
            <div className="mb-2 flex justify-end items-center">
                <Input
                    isClearable
                    classNames={{
                        base: "w-full sm:max-w-[25%]",
                        inputWrapper: "border-1",
                    }}
                    placeholder="Pesquisar..."
                    size="md"
                    startContent={<SearchIcon className="text-default-300" />}
                    value={filterValue}
                    onClear={() => onClear()}
                    onValueChange={onSearchChange}
                />
            </div>

            <Table
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="default"
                            page={page}
                            total={pages}
                            onChange={(page: number) => setPage(page)}
                        />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column: any) => (
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items} emptyContent={'Não foram encontrados registros.'}>
                    {(item: any) => (
                        <TableRow key={item.codigoAtleta}>
                            <TableCell>
                                <div className="flex flex-col">
                                    <p className="text-bold text-sm capitalize truncate">{item.nomeAtleta}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <p className="text-bold text-sm capitalize truncate">{item.modalidade}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="relative flex items-center gap-2">
                                    <Tooltip color="danger" content="Remover Atleta">
                                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                            <div onClick={(e) => deleteAtleta(item.codigoAtleta)}>
                                                <DeleteIcon />
                                            </div>
                                        </span>
                                    </Tooltip>
                                </div >
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}
