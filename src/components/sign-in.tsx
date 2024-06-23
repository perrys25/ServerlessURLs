import { signIn } from "@/auth"

export default async function SignIn() {
    return (
        <form
            action={async () => {
                "use server";
                console.log("Signin with GitHub")
                await signIn("github", {redirectTo: "/"})
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}