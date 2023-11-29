'use client'

import { BuscandoAtletas } from "@/app/types";
import { Button, Checkbox, CheckboxGroup } from "@nextui-org/react";
import { getSession, useSession } from "next-auth/react"
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Generate() {
    const [items, setItems] = useState<BuscandoAtletas[]>([]);
    const [selected, setSelected] = useState([""]);

    const { data: session } = useSession({
        required: true
    })

    const [refreshKey, setRefreshKey] = useState(0);

    function refresh() {
        setRefreshKey(oldKey => oldKey + 1)
    }

    useEffect(() => {
        const getData = async () => {
            const ses = await getSession()

            const query = await fetch('http://localhost:43606/Modalidade/BuscandoAtletas', {
                headers: {
                    authorization: `Bearer ${ses?.user.token}`,
                    'Content-Type': 'application/json',
                }
            })

            const response = await query.json()

            var alreadyActives = response.filter((res: any) => res.inscrito === true)

            let selected = [] as string[]
            alreadyActives.forEach((actives: any) => {
                selected.push(actives.codigoModalidade.toString())
            })
            setSelected(selected)

            setItems(response)
        }
        getData()
    }, [refreshKey])

    async function salvarAtleta() {
        const req = {
            ModalidadesAtivas: selected
        } as any

        const res = await fetch('http://localhost:43606/Atleta/SalvarAtleta', {
            method: 'POST',
            body: JSON.stringify(req),
            headers: {
                authorization: `Bearer ${session?.user.token}`,
                'Content-Type': 'application/json',
            }
        })

        if (res.ok) {
            toast('Salvo com sucesso', { type: 'success', autoClose: 2000 })
            refresh()
        } else {
            const data = res.json()

            data.then((error) => {
                toast(error.mensagem, { type: 'error', autoClose: 2000 })
            })
        }
    }

    return (
        <>
            <main className="h-5/6 flex justify-center bg-orange-100 shadow-lg">
                <div className="flex flex-col justify-evenly px-16 bg-white shadow-[rgba(0,0,1,0.5)_0px_0px_10px_0px]">
                    <h1 className="text-center text-xl">Fique por dentro do que acontece no seu time!</h1>

                    <div className="flex flex-col justify-evenly h-3/6">
                        <h1 className="text-lg">Selecione abaixo as modalidades que deseja seguir:</h1>

                        <CheckboxGroup
                            className="mt-6 h-3/5 overflow-y-auto overflow-x-hidden"
                            value={selected}
                            onValueChange={setSelected}
                        >
                            {items.length > 0 ? items.map((item, index) => {
                                return (
                                    <Checkbox value={item.codigoModalidade.toString()} key={index}>
                                        <h1 className="text-md">
                                            {item.descricao}
                                        </h1>
                                    </Checkbox>
                                )
                            }) : null
                            }
                        </CheckboxGroup>
                    </div>

                    <Button className="bg-orange-400 text-white text-lg py-6 mt-4" onClick={salvarAtleta}>Salvar</Button>
                </div>
            </main>
        </>
    );
}