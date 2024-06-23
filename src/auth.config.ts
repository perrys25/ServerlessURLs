import GitHub from "next-auth/providers/github"
import Discord from "next-auth/providers/discord"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [GitHub, Discord],
} satisfies NextAuthConfig