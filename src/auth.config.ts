import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import Keycloak from "next-auth/providers/keycloak";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Provider } from "@auth/core/providers";

export let providers: {
  provider: Provider;
  icon: IconProp;
  color: string;
}[] = [];

console.log(process.env.TEST_AUTH === "true");

if (process.env.TEST_AUTH === "true") {
  providers.push({
    provider: Keycloak,
    icon: faKey,
    color: "#8f7907",
  });
} else {
  providers.push(
    {
      provider: GitHub,
      icon: faGithub,
      color: "#333",
    },
    {
      provider: Discord,
      icon: faDiscord,
      color: "#5865F2",
    },
    {
      provider: Google,
      icon: faGoogle,
      color: "#4285F4",
    },
  );
}

export const providerData = providers.map(({ provider, ...args }) => {
  if (typeof provider === "function") {
    return {
      provider: provider(),
      ...args,
    };
  } else {
    return {
      provider: provider,
      ...args,
    };
  }
});

export default {
  pages: {
    signIn: "/login",
  },
  providers: providers.map(({ provider }) => provider),
} satisfies NextAuthConfig;
