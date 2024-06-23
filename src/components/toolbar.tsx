import SignIn from "@/components/sign-in";
import React from "react";
import {Tool} from "@/components/tool";
import {auth} from "@/auth";

export default async function Toolbar() {
    const session = await auth()

    return (
        <div className="bg-gray-200 h-12 shadow flex flex-row space-x-3">
            <div className="px-4 my-auto">
                <h1 className="font-bold text-lg">Serverless URL Shortener</h1>
            </div>
            <span className="flex-grow mx-auto"/>
            {
                // eslint-disable-next-line @next/next/no-img-element
                session ? <Tool name={<img src={session.user?.image ?? "./example"} alt="Profile Image"
                                           className="w-8 h-8 rounded-full my-auto mx-2 shadow-sm"/>} menu={<SignIn/>}/> :
                    <Tool name={"Sign in"} menu={<SignIn/>}/>
            }
        </div>
    )
}