import SignIn from "@/components/sign-in";
import React from "react";
import { Tool } from "@/components/tool";
import { auth } from "@/auth";
import Avatar from "boring-avatars";
import UserOptions from "@/components/useroptions";
import Link from "next/link";

export default async function Toolbar() {
  const session = await auth();

  return (
    <div className="flex h-12 flex-row space-x-3 bg-gray-200 shadow">
      <div className="my-auto px-4">
        <Link href={"/"}>
          <h1 className="text-lg font-bold">Serverless URL Shortener</h1>
        </Link>
      </div>
      <span className="mx-auto flex-grow" />
      {
        // eslint-disable-next-line @next/next/no-img-element
        session ? (
          <Tool
            name={
              session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile Image"
                  className="m-2 h-8 w-8 rounded-full shadow-md"
                />
              ) : (
                <div className="m-2 h-8 w-8 rounded-full shadow-md">
                  <Avatar
                    size={32}
                    name={new TextDecoder().decode(
                      await crypto.subtle.digest(
                        "SHA-256",
                        new TextEncoder().encode(
                          session.user?.email ?? "unknown",
                        ),
                      ),
                    )}
                    variant="beam"
                    colors={[
                      "#92A1C6",
                      "#146A7C",
                      "#F0AB3D",
                      "#C271B4",
                      "#C20D90",
                    ]}
                  />
                </div>
              )
            }
            menu={<UserOptions />}
            link={"/login"}
          />
        ) : (
          <Tool name={"Sign in"} menu={<SignIn />} link={"/login"} />
        )
      }
    </div>
  );
}
