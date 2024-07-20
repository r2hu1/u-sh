"use client";

import getRecentLinks from "@/server_functions/getRecentLinks";
import { useEffect, useState } from "react";

export default function RecentUrls() {
    const [rectLinks, setRectLinks] = useState([]);
    const retAndSet = async () => {
        try{
            const data = await getRecentLinks();
            setRectLinks(JSON.parse(data));
        }
        catch(err){
            console.log(err);
        }
    };
    useEffect(() => {
        retAndSet();
    }, []);
    return (
        <div className="grid gap-4 px-4 py-4 border-border border rounded-lg">
            <div>
                <h2 className="text-lg">Recent Links</h2>
                <p className="text-sm text-muted-foreground">list of yout recently shortened links.</p>
            </div>
            <div className="border border-dashed border-border rounded-lg">
                {rectLinks.map((e) => {
                    <div key={e._id}>
                        <p className="text-sm text-muted-foreground">{e.alias}</p>
                    </div>
                })}
            </div>
        </div>
    );
}