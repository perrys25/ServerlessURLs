"use client";

import React, {FormEvent} from "react";

export default function URLShortener({children}: {children?: React.ReactNode}): React.ReactNode {
    const [code, setCode] = React.useState<string>();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const url = formData.get("url") as string;
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url}),
        });
        if (!response.ok) {
            return;
        }
        const json: any = await response.json();
        setCode(json.code);
    }

    return (
        <>
            {children}
            <div className="max-w-7xl mx-auto">
                <div className="m-8 bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col">
                    <h1 className="mx-auto p-2 font-semibold text-4xl">Serverless URLs</h1>
                    <form className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0" onSubmit={onSubmit}>
                        <input type="text"
                               name="url"
                               className="focus-visible:outline-none p-1 pl-2 rounded-r-lg md:bg-white w-full md:flex-grow"
                               placeholder="https://example.com/..."/>
                        <input type="submit" value="Shorten" className="bg-blue-600 text-white py-1 px-2 rounded-lg"/>
                    </form>
                    <div className="flex flex-col mt-4"> Shortened Code: {code ?? "None"} </div>
                </div>
            </div>
        </>
    );
}