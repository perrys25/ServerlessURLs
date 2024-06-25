import React from "react";
import getAnalytics from "@/actions/getAnalytics";
import Link from "next/link";
import { headers } from "next/headers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteLink, editLink } from "@/actions/editLink";
import { redirect } from "next/navigation";

export default async function Home({
  params: { code },
}: {
  params: { code: string };
}): Promise<React.ReactNode> {
  const data = await getAnalytics(code);
  if (!data) {
    return (
      <div className="flex flex-grow flex-col">
        <div className="flex-grow" />
        <div className="my-auto flex flex-col">
          <div className="mx-auto w-max">
            <div className="flex w-[48rem] flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-lg">
              <div className="w-full space-y-4 px-6 py-4 text-lg md:px-8">
                <h1 className="mx-auto w-max text-2xl font-bold">
                  You are not authorized to view that link
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow" />
      </div>
    );
  }
  const headersList = headers();
  const host = headersList.get("host");
  const https = headersList.get("x-forwarded-proto") === "https";
  return (
    <div className="flex flex-grow flex-col">
      <div className="flex-grow" />
      <div className="my-auto flex flex-col space-y-8">
        <div className="mx-auto w-max">
          <div className="flex w-[48rem] flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-lg">
            <div className="w-full space-y-4 px-6 py-4 text-lg md:px-8">
              <h1 className="mx-auto w-max text-2xl font-bold">
                Link Details for{" "}
                <code className="rounded-md bg-gray-300 px-1">{code}</code>
              </h1>
              <span className="flex flex-row">
                Shortened URL:&nbsp;
                <Link href={`${https ? "https" : "http"}://${host}/${code}`}>
                  <p className="text-blue-600 underline">
                    {https ? "https" : "http"}://{host}/{code}
                  </p>
                </Link>
              </span>
              <span className="flex flex-row">
                Original URL:&nbsp;
                <Link href={data.url}>
                  <p className="text-blue-600 underline">{data.url}</p>
                </Link>
              </span>
              <p>Total Clicks: {data.clicks}</p>
            </div>
          </div>
        </div>
        <div className="mx-auto w-max">
          <div className="flex w-[48rem] flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-lg">
            <div className="w-full px-6 py-4 text-lg md:px-8">
              <h1 className="mx-auto w-max text-2xl font-bold">Edit Link</h1>
              <p className="pb-1 pt-3">New URL</p>
              <form
                className="flex flex-row space-x-2"
                action={async (data) => {
                  "use server";
                  if (!code) return;
                  let url = data.get("url") as string;
                  if (
                    !(url.startsWith("http://") || url.startsWith("https://"))
                  ) {
                    url = `https://${url}`;
                  }
                  await editLink(code, url);
                  redirect(`/links/${code}`);
                }}
              >
                <input
                  type="text"
                  name="url"
                  className="w-full rounded-lg p-1 pl-2 focus-visible:outline-none md:bg-white"
                  placeholder="https://example.com/..."
                />
                <button
                  type="submit"
                  className="flex flex-row rounded-lg bg-blue-600 px-2 py-1 text-white"
                >
                  <span className="my-auto w-6 pr-1">
                    <FontAwesomeIcon icon={faRotateRight} />
                  </span>
                  Update
                </button>
              </form>
              <p className="pb-1 pt-3">Delete Link</p>
              <form
                className="flex flex-row space-x-2"
                action={async () => {
                  "use server";
                  if (!code) return;
                  await deleteLink(code);
                  redirect("/");
                }}
              >
                <button
                  type="submit"
                  className="flex w-full flex-row rounded-lg bg-red-600 px-2 py-1 text-white"
                >
                  <span className="mx-auto flex flex-row">
                    <span className="my-auto w-6 pr-1">
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                    Delete
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-grow" />
    </div>
  );
}
