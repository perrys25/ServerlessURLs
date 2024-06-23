"use server";

import { signIn } from "@/auth"

export function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                console.log("Signin with GitHub")
                await signIn("github")
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}