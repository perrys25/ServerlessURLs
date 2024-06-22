import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { D1Adapter } from "@auth/d1-adapter"
import {getRequestContext} from '@cloudflare/next-on-pages'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: D1Adapter(getRequestContext().env.AUTH_D1),
    session: { strategy: "jwt" },
    ...authConfig,
})