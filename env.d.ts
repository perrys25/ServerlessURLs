// Generated by Wrangler on Sun Jun 23 2024 19:55:06 GMT-0400 (Eastern Daylight Time)
// by running `wrangler types --env-interface CloudflareEnv env.d.ts`

interface CloudflareEnv {
	URLS_KV: KVNamespace;
	AUTH_SECRET: string;
	AUTH_KEYCLOAK_ID: string;
	AUTH_KEYCLOAK_SECRET: string;
	AUTH_KEYCLOAK_ISSUER: string;
	AUTH_TRUST_HOST: string;
	NODE_ENV: string;
	TEST_AUTH: string;
	AUTH_D1: D1Database;
}
