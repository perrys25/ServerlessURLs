import {redirect} from "next/navigation";
import {headers} from "next/headers";

export default function LinkEditor() {
    const headersList = headers();
    const host = headersList.get("host");


    return (
        <div className="flex-grow flex flex-col">
            <div className="flex-grow"/>
            <div className="my-auto flex flex-col">
                <div className="mx-auto w-max">
                    <div
                        className="bg-gray-100 shadow-lg rounded-2xl p-4 flex flex-col text-gray-900 max-w-md sm:min-w-96">
                        <div className="p-6 space-y-4 md:p-8 w-full">
                            <p className="text-md font-semibold leading-tight tracking-tight text-gray-900 md:text-lg">
                                Unfortunately, due to a feature missing in Cloudflare KV, it is difficult to build a list of your previous links.
                            </p>
                            <p  className="text-md font-semibold leading-tight tracking-tight text-gray-900 md:text-lg">
                                If you know the shortened URL, you can still edit it.
                            </p>
                            <form className="flex flex-row space-x-2" action={async (data) => {
                                "use server";

                                const code = (data.get("code") as string).split("/").pop();
                                if (!code) return;
                                redirect(`/links/${code}`)
                            }}>
                                <input type="text"
                                       name="code"
                                       className="focus-visible:outline-none p-1 pl-2 rounded-lg bg-white w-full flex-grow"
                                       placeholder={`https://${host}/abc...`}/>
                                <button type="submit" className="bg-blue-600 text-white py-1 px-2 rounded-lg flex flex-row">
                                    <span className="pr-1">
                                        Edit
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-grow"/>
        </div>
    )
}