"use client";

import React from "react";
import Link from "next/link";

export function Tool({name, menu, link}: {name: string, menu: React.ReactNode, link?: undefined} | {name: string, menu?: undefined, link: string} ) {

    const [open, setOpen] = React.useState(false);

    if (menu) {
        return (
            <div className="px-4 my-auto overflow-visible relative">
                <button onClick={() => setOpen(!open)} className="text-blue-600 hover:underline py-3">{name}</button>
                {
                    open && <div className="z-40 absolute w-96" style={{
                        transform: "translateX(--leftOffset)",
                    }}>
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