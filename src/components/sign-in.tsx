import {signIn} from "@/auth"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import React from "react";
import {faDiscord, faGithub, faGoogle} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import {providers} from "@/auth.config";

function OauthButton({provider, icon, name, color}: {
    provider: string,
    icon: IconProp,
    name: string,
    color: string
}): React.ReactNode {
    return (
        <form
            action={async () => {
                "use server";
                await signIn(provider, {redirectTo: "/"})
            }}
            className={"flex flex-row flex-grow"}
        >
            <button type="submit" className="rounded-lg text-white font-semibold flex flex-col w-full"
                    style={{background: color}}>
                <div className="flex flex-row w-full">
                    <FontAwesomeIcon icon={icon} className="m-2 w-8 h-8"/>
                    <span className="m-auto">
                        <span className="ml-1 text-lg flex flex-row">
                            <p className={"hidden md:flex"}>
                                Sign in with&nbsp;
                            </p>
                            {name}
                        </span>
                    </span>
                    <span className="w-8 m-2"/>
                </div>
            </button>
        </form>
    )
}

export default async function SignIn() {
    return (
        <>
            <div
                className="bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col text-gray-900 max-w-md sm:min-w-96">
                <div className="p-6 space-y-4 md:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Sign in to your account
                    </h1>
                    <div className="space-y-4 md:space-y-6">
                        {
                            providers.map(({provider, icon, name, color}) => (
                                <OauthButton provider={provider.name} key={provider.name} icon={icon} name={name} color={color}/>
                            ))
                        }
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link href="/sign-up"
                                                             className="font-medium text-primary-600 hover:underline">Sign
                            up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}