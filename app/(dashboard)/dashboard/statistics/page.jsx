"use client";
import { getUserData } from "@/server_functions/getUserData";
import { ExternalLink, Eye, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function page() {
    const [totalLinks, setTotalLinks] = useState([]);
    const [top5Links, setTop5Links] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);
    const [loading, setLoading] = useState(true);

    const getAllData = async () => {
        const [allClicks, topLinks, allLinks] = await getUserData();
        setTotalLinks(JSON.parse(allLinks));
        setTop5Links(JSON.parse(topLinks));
        setTotalClicks(Math.ceil(allClicks / 2));
        setLoading(false);
    };

    useEffect(() => {
        getAllData();
    }, []);
    return (
        <main className="px-6 md:px-20 lg:px-32 py-10 grid gap-7">
            <div className="border rounded-lg grid grid-cols-2 bg-card shadow-sm">
                <div className="text-center p-4 border-r border-border">
                    <h2 className="text-2xl">{totalLinks.length}</h2>
                    <span className="text-sm text-muted-foreground">Links Created</span>
                </div>
                <div className="text-center p-4">
                    <h2 className="text-2xl">{totalClicks}</h2>
                    <span className="text-sm text-muted-foreground">Lifetime Clicks</span>
                </div>
            </div>

            <div className="border border-border rounded-lg px-4 py-4 bg-card shadow-sm">
                <div>
                    <h2 className="text-lg">Top 5 Links</h2>
                    <p className="text-sm text-muted-foreground">the top 5 links by clicks</p>
                </div>
                <div className="border-dashed rounded-lg mt-4 border border-border">
                    {loading && (
                        <div className="grid place-items-center h-52">
                            <Loader2 className="animate-spin h-4 w-5" />
                        </div>
                    )}
                    {!loading && !top5Links.length ? (
                        <div className="grid place-items-center h-52">
                            <p className="text-sm text-muted-foreground">No links found.</p>
                        </div>
                    ) : null}
                    {top5Links.filter((link) => link.clicks).map((link) => (
                        <div className="grid gap-2 p-4 linkList">
                            <Link target="_blank" className="text-sm opacity-85 flex items-center justify-between" href={`https://${location.host}/${link.alias}`}>
                                <span className="hover:underline">https://{location.host}/{link.alias}</span> <p className="text-sm text-muted-foreground flex items-center gap-1 bg-accent/50 rounded-full px-2 cursor-pointer py-1 w-fit">{Math.ceil(link.clicks / 2)} <Eye className="h-4 w-4" /></p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="border border-border rounded-lg px-4 py-4 bg-card shadow-sm">
                <div>
                    <h2 className="text-lg">All Links & Clicks</h2>
                    <p className="text-sm text-muted-foreground">all your links and their clicks</p>
                </div>
                <div className="border-dashed rounded-lg mt-4 border border-border">
                    {loading && (
                        <div className="grid place-items-center h-52">
                            <Loader2 className="animate-spin h-4 w-5" />
                        </div>
                    )}
                    {!loading && !totalLinks.length ? (
                        <div className="grid place-items-center h-52">
                            <p className="text-sm text-muted-foreground">No links found.</p>
                        </div>
                    ) : null}
                    {totalLinks.map((link) => (
                        <div className="grid gap-2 p-4 linkList">
                            <Link target="_blank" className="text-sm opacity-85 flex items-center justify-between" href={`https://${location.host}/${link.alias}`}>
                                <span className="hover:underline">https://{location.host}/{link.alias}</span> <p className="text-sm text-muted-foreground flex items-center gap-1 bg-accent/50 rounded-full px-2 cursor-pointer py-1 w-fit">{Math.ceil(link.clicks / 2)} <Eye className="h-4 w-4" /></p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
