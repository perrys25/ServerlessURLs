import React from "react";
import {signOut} from "@/auth";

async function MenuItem({name, link, className}: { name: string, link: string | (() => Promise<void>), className?: string}) {
    if (typeof link === "string") {
        return (
            <a href={link} className={`block px-4 py-2 text-gray-900 hover:bg-gray-200 rounded-md ${className}`}>{name}</a>
        )
    }
    return (
        // <a onClick={async () => await link()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200">{name}</a>
        <form action={async () => {
            "use server";
            await link()
        }}  className={`block px-4 py-2 text-gray-900 hover:bg-gray-200 rounded-md ${className}`}>
            <button type="submit">{name}</button>
        </form>
    )
}

export default async function UserOptions() {
    return (
        <>
            <div
                className="bg-gray-100 shadow-lg rounded-2xl flex flex-col text-gray-900 max-w-md sm:min-w-96">
                <div className="p-2 space-y-2 md:p-4">
                    <MenuItem name={"My Links"} link={"/links"}/>
                    <MenuItem name={"Log Out"} link={async () => signOut()}/>
                </div>
            </div>
        </>
    )
}