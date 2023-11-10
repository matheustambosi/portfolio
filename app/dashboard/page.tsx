'use client'

import { useSession } from "next-auth/react"
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { QrReader } from "react-qr-reader";

export default function Generate() {
    const [data, setData] = useState("No result");
    const [qrCodeValue, setQrCodeValue] = useState("");

    const { data: session, status } = useSession({
        required: true
    })

    if (status === "loading") {
        return <></>
    }

    return (
        <main className="min-h-screen flex justify-center items-center">
            <div>Generate QR</div>

            {qrCodeValue != "" && (
                <QRCode value={qrCodeValue} />
            )}

            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result.getText);
                    }

                    if (!!error) {
                        console.info(error);
                    }

                }
                }
                constraints={{ facingMode: "environment" }}
                className="w-2/5 h-2/5"
            />
            <p>{data}</p>

            <input
                onChange={(e) => {
                    setQrCodeValue(e.target.value);
                }}
            />
        </main>
    );
}