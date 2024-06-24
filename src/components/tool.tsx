"use client";

import React from "react";
import Link from "next/link";

export function Tool({name, menu, link}: {name: string | React.ReactNode, menu: React.ReactNode, link?: undefined} | {name: string | React.ReactNode, menu?: undefined, link: string} ) {

    const [open, setOpen] = React.useState(false);

    if (menu) {
        return (
            <div className="px-4 my-auto overflow-visible relative">
                <button onClick={() => setOpen(!open)} className="text-blue-600 hover:underline py-auto">{name}</button>
                {
                    open && <div className="z-40 absolute right-4">
                        {menu}
                    </div>
                }
            </div>
        )
    } else if (link) {
        return (
            <div className="px-4 my-auto">
                <Link href={link} className="text-blue-600 hover:underline">{name}</Link>
            </div>
        )
    } else {
        return <></>
    }
}