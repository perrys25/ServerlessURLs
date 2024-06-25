import {auth} from "@/auth";
import {getRequestContext} from "@cloudflare/next-on-pages";
import isUrlHttp from "is-url-http";

export async function editLink(code: string, url: string) {
    const session = await auth()

    if (!isUrlHttp(url)) {
        return null
    }

    if (!session?.user?.id) {
        return null
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV

    const {metadata}: KVNamespaceGetWithMetadataResult<string, { author: string }> = await URLS_KV.getWithMetadata(code)
    if (!metadata || !metadata.author || metadata.author !== session.user.id) {
        return null
    }

    await URLS_KV.put(code, url, {metadata})
    return true
}

export async function deleteLink(code: string) {
    const session = await auth()

    if (!session?.user?.id) {
        return null
    }
    const context = getRequestContext();
    const URLS_KV = context.env.URLS_KV

    const {metadata}: KVNamespaceGetWithMetadataResult<string, { author: string }> = await URLS_KV.getWithMetadata(code)
    if (!metadata || !metadata.author || metadata.author !== session.user.id) {
        return null
    }

    await URLS_KV.delete(code)
    return true
}