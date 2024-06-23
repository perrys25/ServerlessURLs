import SignIn from "@/components/sign-in";
import React from "react";
import {Tool} from "@/components/tool";

export default function Toolbar() {
    return (
        <div className="bg-gray-200 h-12 shadow flex flex-row space-x-3">
            <div className="px-4 my-auto">
                <h1 className="font-bold text-lg">Serverless URL Shortener</h1>
            </div>
            <span className="flex-grow mx-auto"/>
            <Tool name={"Sign in"} menu={<SignIn/>}/>
        </div>
    )
}