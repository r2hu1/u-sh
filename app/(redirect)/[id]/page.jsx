"use client";
import { Button } from "@/components/ui/button";
import { Loader2, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Redirect to API route which handles analytics and redirect
        // The API route will capture analytics and perform the redirect
        const redirectToApi = async () => {
            try {
                // Use the API route which handles analytics capture and redirect
                window.location.href = `/api/${params.id}`;
            } catch (error) {
                setIsError(true);
                setLoading(false);
            }
        };
        
        redirectToApi();
    }, [params.id]);
    
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