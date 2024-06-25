"use client";

import React, { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faChartSimple,
  faCopy,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [code, setCode] = React.useState<string>();
  const [host, setHost] = React.useState<string>();

  useEffect(() => {
    setHost(location.host);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let url = formData.get("url") as string;
    if (!(url.startsWith("http://") || url.startsWith("https://"))) {
      url = `https://${url}`;
    }
    const response = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) {
      toast("Invalid Link", { type: "error" });
    }
    const json: any = await response.json();
    setCode(json.code);
    toast("URL Shortened!", { type: "success" });
  }

  return (
    <>
      <div className="mx-auto w-full max-w-7xl">
        <div className="m-8 flex flex-col rounded-2xl bg-gray-100 p-4 shadow-lg">
          <h1 className="mx-auto p-2 text-4xl font-semibold">
            Serverless URLs
          </h1>
          <p className="pb-1 pt-3">Paste your long URL here</p>
          <form
            className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0"
            onSubmit={onSubmit}
          >
            <input
              type="text"
              name="url"
              className="w-full rounded-lg p-1 pl-2 focus-visible:outline-none md:flex-grow md:bg-white"
              placeholder="https://example.com/..."
            />
            <button
              type="submit"
              className="flex flex-row rounded-lg bg-blue-600 px-2 py-1 text-white"
            >
              <span className="pr-1">
                <FontAwesomeIcon icon={faBolt} />
              </span>
              Shorten
            </button>
          </form>
          <p className="pb-1 pt-3">Your Shortened URL</p>
          <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
            <input
              type="text"
              name="url"
              value={code ? `https://${host}/${code}` : ""}
              className="w-full rounded-lg p-1 pl-2 focus-visible:outline-none md:flex-grow md:bg-gray-300"
              placeholder={`https://${host}/...`}
              readOnly
              id="shortenedURL"
            />
            <button
              onClick={() => {
                const text: HTMLInputElement = document.getElementById(
                  "shortenedURL",
                ) as HTMLInputElement;
                if (!text) return;
                if (code === undefined || code === "") return;
                text.select();
                text.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(text.value);
                toast("Copied to clipboard!", { type: "success" });
              }}
              type="button"
              className="flex flex-row rounded-lg bg-gray-600 px-2 py-1 text-white"
              disabled={!code}
            >
              <span className="pr-1">
                <FontAwesomeIcon icon={faCopy} />
              </span>
              Copy
            </button>
            <Link
              href={code ? `/links/${code}` : {}}
              className={
                "flex flex-row rounded-lg bg-gray-600 px-2 py-1 text-white"
              }
            >
              <span className="pr-1">
                <FontAwesomeIcon icon={faChartSimple} />
              </span>
              Stats
            </Link>
            <Link
              href={code ? `/links/${code}#edit` : {}}
              className={
                "flex flex-row rounded-lg bg-gray-600 px-2 py-1 text-white"
              }
            >
              <span className="pr-1">
                <FontAwesomeIcon icon={faPenToSquare} />
              </span>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
