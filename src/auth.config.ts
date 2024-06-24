import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import Keycloak from "next-auth/providers/keycloak";
import type { NextAuthConfig } from "next-auth"
import {Provider} from "@auth/core/providers";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {faKey} from "@fortawesome/free-solid-svg-icons";
import {faDiscord, faGithub} from "@fortawesome/free-brands-svg-icons";

export let providers: {
    provider: Provider,
    icon: IconProp,
    name: string,
    color: string,
}[] =  []

console.log(process.env.TEST_AUTH === 'true')

if (process.env.TEST_AUTH === 'true') {
    providers.push({
        provider: Keycloak,
        icon: faKey,
        name: "Keycloak",
        color: "#8f7907",
    })
} else {
    providers.push({
        provider: GitHub,
        icon: faGithub,
        name: "GitHub",
        color: "#333",
    },
        {
            provider: Discord,
            icon: faDiscord,
            name: "Discord",
            color: "#5865F2",
        })
}

export default {
    // pages: {
    //     signIn: "/login",
    // },
    providers: providers.map(({provider}) => provider),
} satisfies NextAuthConfig