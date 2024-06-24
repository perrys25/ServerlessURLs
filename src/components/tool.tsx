"use client";

import React from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

export function Tool({name, menu, link}: {name: string | React.ReactNode, menu: React.ReactNode, link?: string} | {name: string | React.ReactNode, menu?: undefined, link: string} ) {

    const [open, setOpen] = React.useState(false);
    const pathname = usePathname();

    const isCurrent = pathname === link;

    if (menu) {
        return (
            <div className="px-4 overflow-visible relative my-auto">
                <button onClick={() => setOpen(!open)} className="text-blue-600">{name}</button>
                {
                    (open && !isCurrent) && <div className="z-40 absolute right-4 top-14">
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