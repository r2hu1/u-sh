"use client";

import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import getRecentLinks from "@/server_functions/getRecentLinks";

export default function RecentUrls() {
    const [rectLinks, setRectLinks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentLinks = async () => {
            try {
                const data = await getRecentLinks();
                setRectLinks(JSON.parse(data));
            } catch (err) {
                console.log(err);
            }
        };
        fetchRecentLinks();
        setLoading(false);
    }, []);

    return (
        <div className="grid gap-4 px-4 py-4 border-border border rounded-lg">
            <div>
                <h2 className="text-lg">Recent Links</h2>
                <p className="text-sm text-muted-foreground">list of yout recently five shortened links.</p>
            </div>
            <div className="border border-dashed border-border rounded-lg">
                {loading && (
                    <div className="grid place-items-center h-52">
                        <Loader2 className="animate-spin h-4 w-5" />
                    </div>
                )}

                {!loading && rectLinks.length === 0 ? (
                    <div className="grid place-items-center h-52">
                        <p className="text-sm text-muted-foreground">No links found.</p>
                    </div>
                ) : null}

                {rectLinks && (
                    <div>
                        {rectLinks.map((link) => (
                            <div key={link.id} className="grid gap-4 p-4 linkList">
                                <Link target="_blank" className="text-sm flex items-center justify-between w-full opacity-85 hover:underline" href={`https://${location.host}/${link.alias}`}>
                                    <span>https://{location.host}/{link.alias}</span> <ExternalLink className="h-3 w-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}