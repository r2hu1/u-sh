"use client";
import { Button } from "@/components/ui/button";
import { findFinalUrlAndRedirect } from "@/server_functions/findFinalUrlAndRedirect";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);

    const finalRedirect = async () => {
        setLoading(true);
        const data = await findFinalUrlAndRedirect(params.id);
        if (data) {
            window.location.replace(JSON.parse(data));
            setLoading(false);
        }
        else {
            setIsError(true);
            setLoading(false);
        }
    };
    useEffect(() => {
        finalRedirect();
    }, []);
    return (
        <main className="h-full w-full absolute flex items-center justify-center">
            {!loading && isError ? (
                <div className="grid gap-2 text-center place-items-center px-6 max-w-xs">
                    <TriangleAlert className="h-5 w-5" />
                    <h2 className="text-muted-foreground">The link you are trying to access does not exist.</h2>
                    <Button variant="outline" asChild><Link href="/">Back To Homepage</Link></Button>
                </div>
            ) : (
                <div className="grid gap-2 text-center place-items-center">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <h2 className="text-muted-foreground">Redirecting.</h2>
                </div>
            )}
        </main>
    )
};