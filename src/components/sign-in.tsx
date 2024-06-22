import AuthProvider from "@/components/authprovider";

export function SignIn() {
    return (
        <form
            action={async () =>{
                console.log("Calling Edge AuthProvider")
                await AuthProvider()
            }}
        >
            <button type="submit">Signin with GitHub</button>
        </form>
    )
}