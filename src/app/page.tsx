"use client";

import React, {FormEvent, useEffect} from "react";
import {usePathname} from "next/navigation";
import {toast, ToastContainer} from "react-toastify";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt, faChartSimple, faCopy, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
    const [code, setCode] = React.useState<string>();
    const [host, setHost] = React.useState<string>();

    useEffect(() => {
        setHost(location.host);
    }, [])

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let url = formData.get("url") as string;
        if (!(url.startsWith("http://") || url.startsWith("https://"))) {
            url = `https://${url}`;
        }
        const response = await fetch("/api/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({url}),
        });
        if (!response.ok) {
            toast("Invalid Link", {type: "error"});
        }
        const json: any = await response.json();
        setCode(json.code);
        toast("URL Shortened!", {type: "success"});
    }

    return (
        <>
            <div className="max-w-7xl mx-auto w-full">
                <div className="m-8 bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col">
                    <h1 className="mx-auto p-2 font-semibold text-4xl">Serverless URLs</h1>
                    <p className="pt-3 pb-1">Paste your long URL here</p>
                    <form className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0" onSubmit={onSubmit}>
                        <input type="text"
                               name="url"
                               className="focus-visible:outline-none p-1 pl-2 rounded-lg md:bg-white w-full md:flex-grow"
                               placeholder="https://example.com/..."/>
                        <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded-lg flex flex-row">
                            <span className="pr-1">
                                <FontAwesomeIcon icon={faBolt}/>
                            </span>
                            Shorten
                        </button>
                    </form>
                    <p className="pt-3 pb-1">Your Shortened URL</p>
                    <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0">
                        <input type="text"
                               name="url"
                               value={code ? `https://${host}/${code}` : ""}
                               className="focus-visible:outline-none p-1 pl-2 rounded-lg md:bg-gray-300 w-full md:flex-grow"
                               placeholder={`https://${host}/...`} readOnly id="shortenedURL"/>
                        <button onClick={() => {
                            const text: HTMLInputElement = document.getElementById("shortenedURL") as HTMLInputElement;
                            if (!text) return;
                            if (code === undefined || code === "") return;
                            text.select();
                            text.setSelectionRange(0, 99999);
                            navigator.clipboard.writeText(text.value);
                            toast("Copied to clipboard!", {type: "success"});
                        }} type="button" className="bg-gray-600 text-white py-1 px-2 rounded-lg flex flex-row" disabled={!code}>
                             <span className="pr-1">
                                <FontAwesomeIcon icon={faCopy}/>
                            </span>
                            Copy
                        </button>
                        <Link href={code ? `/links/${code}`: {}}
                              className={"bg-gray-600 text-white py-1 px-2 rounded-lg flex flex-row"}>
                            <span className="pr-1">
                                <FontAwesomeIcon icon={faChartSimple}/>
                            </span>
                            Stats
                        </Link>
                        <Link href={code ? `/links/${code}#edit`: {}}
                              className={"bg-gray-600 text-white py-1 px-2 rounded-lg flex flex-row"}>
                            <span className="pr-1">
                                <FontAwesomeIcon icon={faPenToSquare}/>
                            </span>
                            Edit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
