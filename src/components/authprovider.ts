"use server"
import {signIn} from "@/auth";

export default async function AuthProvider() {
    console.log("Calling AuthProvider with GitHub")
    await signIn("github")
}