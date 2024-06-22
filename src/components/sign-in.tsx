import AuthProvider from "@/components/authprovider";

export function SignIn() {
    return (
        <form
            action={async () => await AuthProvider()}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}