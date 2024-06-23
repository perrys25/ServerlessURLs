import React, {FormEvent} from "react";
import URLShortener from "@/components/url-shortener";
import SignIn from "@/components/sign-in";

export default async function Home() {
    return (
        <URLShortener>
            <SignIn/>
        </URLShortener>
    )
}
