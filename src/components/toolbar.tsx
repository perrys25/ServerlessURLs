import SignIn from "@/components/sign-in";
import React from "react";
import {Tool} from "@/components/tool";
import {auth} from "@/auth";
import Avatar from 'boring-avatars';
import UserOptions from "@/components/useroptions";
import Link from "next/link";

export default async function Toolbar() {
    const session = await auth()

    return (
        <div className="bg-gray-200 h-12 shadow flex flex-row space-x-3">
            <div className="px-4 my-auto">
                <Link href={"/"}>
                    <h1 className="font-bold text-lg">Serverless URL Shortener</h1>
                </Link>
            </div>
            <span className="flex-grow mx-auto"/>
            {
                // eslint-disable-next-line @next/next/no-img-element
                session ? <Tool name={session.user?.image ? (<img src={session.user.image} alt="Profile Image"
                                                                  className="w-8 h-8 rounded-full py-2 mx-2 shadow-md"/>) : (
                        <div className="w-8 h-8 rounded-full py-auto mx-2 shadow-sm">
                            <Avatar
                                size={40}
                                name={new TextDecoder().decode((await crypto.subtle.digest('SHA-256', new TextEncoder().encode(session.user?.email ?? 'unknown'))))}
                                variant="beam"
                                colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                            /></div>)} menu={<UserOptions/>} link={"/login"}/> :
                    <Tool name={"Sign in"} menu={<SignIn/>} link={"/login"}/>
            }
        </div>
    )
}