import React from "react";
import getAnalytics from "@/actions/getAnalytics";
import Link from "next/link";
import {headers} from "next/headers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBolt, faRotateRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import {deleteLink, editLink} from "@/actions/editLink";
import {redirect} from "next/navigation";

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
    const https = headersList.get("x-forwarded-proto") === "https";
    return (
        <div className="flex-grow flex flex-col">
            <div className="flex-grow"/>
            <div className="my-auto flex flex-col space-y-8">
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
                <div className="mx-auto w-max">
                    <div
                        className="bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col text-gray-900 w-[48rem]">
                        <div className="px-6 py-4 md:px-8 w-full text-lg">
                            <h1 className="text-2xl font-bold w-max mx-auto">Edit Link</h1>
                            <p className="pt-3 pb-1">New URL</p>
                            <form className="flex flex-row space-x-2" action={async (data) => {
                                "use server";
                                if (!code) return;
                                let url = data.get("url") as string;
                                if (!(url.startsWith("http://") || url.startsWith("https://"))) {
                                    url = `https://${url}`;
                                }
                                await editLink(code, url);
                                redirect(`/links/${code}`)
                            }}>
                                <input type="text"
                                       name="url"
                                       className="focus-visible:outline-none p-1 pl-2 rounded-lg md:bg-white w-full"
                                       placeholder="https://example.com/..."/>
                                <button type="submit"
                                        className="bg-blue-600 text-white py-1 px-2 rounded-lg flex flex-row">
                            <span className="pr-1 w-6 my-auto">
                                <FontAwesomeIcon icon={faRotateRight}/>
                            </span>
                                    Update
                                </button>
                            </form>
                            <p className="pt-3 pb-1">Delete Link</p>
                            <form className="flex flex-row space-x-2" action={async () => {
                                "use server";
                                if (!code) return;
                                await deleteLink(code)
                                redirect("/")

                            }}>
                                <button type="submit"
                                        className="bg-red-600 text-white py-1 px-2 rounded-lg flex flex-row w-full">
                                    <span className="mx-auto flex flex-row">
                                        <span className="pr-1 w-6 my-auto">
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </span>
                                    Delete
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow"/>
        </div>
    )
}