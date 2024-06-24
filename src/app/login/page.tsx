import React from "react";
import SignIn from "@/components/sign-in";
import {auth} from "@/auth";
import {redirect} from "next/navigation";

export default async function Page() {
    const session = await auth()

    if (session) {
        redirect("/")
    }

    return (
        <div className="flex-grow flex flex-col">
            <div className="flex-grow"/>
            <div className="my-auto flex flex-col">
                <div className="mx-auto w-max">
                    <SignIn/>
                </div>
            </div>
            <div className="flex-grow"/>
        </div>
    )
}