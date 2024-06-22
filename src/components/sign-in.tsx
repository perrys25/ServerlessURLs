import AuthProvider from "@/components/authprovider";

export function SignIn() {
    return (
        <form
            action={() => AuthProvider()}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}