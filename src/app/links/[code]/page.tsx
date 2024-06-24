import React from "react";
import getAnalytics from "@/actions/getAnalytics";

export default async function Home({params: {code}}: { params: { code: string } }): Promise<React.ReactNode> {
    const data = await getAnalytics(code);
    if (!data) {
        return <InvalidCode/>
    }
    return (
        <div>
            <h1>Analytics for {data.url}</h1>
            <h2>Clicks: {data.clicks}</h2>
        </div>
    )
}

function InvalidCode() {
    return (
        <div>
            <h1>Invalid Code</h1>
        </div>
    )
}