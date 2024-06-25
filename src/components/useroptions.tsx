import React from "react";
import { signOut } from "@/auth";

async function MenuItem({
  name,
  link,
  className,
}: {
  name: string;
  link: string | (() => Promise<void>);
  className?: string;
}) {
  if (typeof link === "string") {
    return (
      <a
        href={link}
        className={`block rounded-md px-4 py-2 text-gray-900 hover:bg-gray-200 ${className}`}
      >
        {name}
      </a>
    );
  }
  return (
    // <a onClick={async () => await link()} className="block px-4 py-2 text-gray-900 hover:bg-gray-200">{name}</a>
    <form action={link}>
      <button
        type="submit"
        className={`block w-full rounded-md px-4 py-2 text-left text-gray-900 hover:bg-gray-200 ${className}`}
      >
        {name}
      </button>
    </form>
  );
}

export default async function UserOptions() {
  return (
    <>
      <div className="flex max-w-md flex-col rounded-2xl bg-gray-100 text-gray-900 shadow-lg sm:min-w-96">
        <div className="space-y-2 p-2 md:p-4">
          <MenuItem name={"My Links"} link={"/links"} />
          <MenuItem
            name={"Log Out"}
            link={async () => {
              "use server";
              await signOut();
            }}
          />
        </div>
      </div>
    </>
  );
}
