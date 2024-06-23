export const codeLength = 7

export default async function generateCode(URLS_KV: KVNamespace): Promise<string> {
    let code = ""
    while (code.length < codeLength) {
        code = crypto.getRandomValues(new BigUint64Array(1))[0].toString(36).slice(-codeLength)
        if (await URLS_KV.get(code)) {
            code = "";
        }
    }
    return code;
}