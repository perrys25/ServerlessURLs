import React from "react";
import getAnalytics from "@/actions/getAnalytics";
import Link from "next/link";
import {headers} from "next/headers";

export default async function Home({params: {code}}: { params: { code: string } }): Promise<React.ReactNode> {
    const data = await getAnalytics(code);
    if (!data) {
        return (
            <div className="flex-grow flex flex-col">
                <div className="flex-grow"/>
                <div className="my-auto flex flex-col">
                    <div className="mx-auto w-max">
                        <div
                            className="bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col text-gray-900 w-[48rem]">
                            <div className="px-6 py-4 space-y-4 md:px-8 w-full text-lg">
                                <h1 className="text-2xl font-bold w-max mx-auto">You are not authorized to view that
                                    link</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow"/>
            </div>
        )
    }
    const headersList = headers();
    const host = headersList.get("host");
    console.log(headersList)
    const https = headersList.get("x-forwarded-proto") === "https";
    return (
        <div className="flex-grow flex flex-col">
            <div className="flex-grow"/>
            <div className="my-auto flex flex-col">
                <div className="mx-auto w-max">
                    <div
                        className="bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col text-gray-900 w-[48rem]">
                        <div className="px-6 py-4 space-y-4 md:px-8 w-full text-lg">
                            <h1 className="text-2xl font-bold w-max mx-auto">Link Details for <code
                                className="bg-gray-300 rounded-md px-1">{code}</code></h1>
                            <span className="flex flex-row">
                                Shortened URL:&nbsp;<Link href={`${https ? "https" : "http"}://${host}/${code}`}><p
                                className="text-blue-600 underline">{https ? "https" : "http"}://{host}/{code}</p></Link>
                            </span>
                            <span className="flex flex-row">
                                Original URL:&nbsp;<Link href={data.url}><p
                                className="text-blue-600 underline">{data.url}</p></Link>
                            </span>
                            <p>Total Clicks: {data.clicks}</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="flex-grow"/>
        </div>
    )
}