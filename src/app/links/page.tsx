import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function LinkEditor() {
  const headersList = headers();
  const host = headersList.get("host");

  return (
    <div className="flex flex-grow flex-col">
      <div className="flex-grow" />
      <div className="my-auto flex flex-col">
        <div className="mx-auto w-max">
          <div className="flex max-w-md flex-col rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-lg sm:min-w-96">
            <div className="w-full space-y-4 p-6 md:p-8">
              <p className="text-md font-semibold leading-tight tracking-tight text-gray-900 md:text-lg">
                Unfortunately, due to a feature missing in Cloudflare KV, it is
                difficult to build a list of your previous links.
              </p>
              <p className="text-md font-semibold leading-tight tracking-tight text-gray-900 md:text-lg">
                If you know the shortened URL, you can still edit it.
              </p>
              <form
                className="flex flex-row space-x-2"
                action={async (data) => {
                  "use server";

                  const code = (data.get("code") as string).split("/").pop();
                  if (!code) return;
                  redirect(`/links/${code}`);
                }}
              >
                <input
                  type="text"
                  name="code"
                  className="w-full flex-grow rounded-lg bg-white p-1 pl-2 focus-visible:outline-none"
                  placeholder={`https://${host}/abc...`}
                />
                <button
                  type="submit"
                  className="flex flex-row rounded-lg bg-blue-600 px-2 py-1 text-white"
                >
                  <span className="pr-1">Edit</span>
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
