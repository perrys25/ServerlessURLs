import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { D1Adapter } from "@auth/d1-adapter"
import {getRequestContext} from '@cloudflare/next-on-pages'

function AUTH_D1() {
    if (process.env.NODE_ENV === 'development') {
        return getRequestContext().env.AUTH_D1
    } else {
        return process.env.AUTH_D1
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    debug: true,
    adapter: D1Adapter(AUTH_D1()),
    session: { strategy: "jwt" },
    ...authConfig,
})