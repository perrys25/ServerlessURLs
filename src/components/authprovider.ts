"use server"
import {signIn} from "@/auth";

export default async function AuthProvider() {
    await signIn("github")
}