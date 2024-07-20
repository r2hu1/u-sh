"use client";
import { Loader2 } from "lucide-react";

export default function Page(){

    return(
        <main className="h-full w-full absolute flex items-center justify-center">
            <div className="grid gap-2 text-center place-items-center">
                <Loader2 className="h-5 w-5 animate-spin"/>
                <h2 className="text-muted-foreground">In dev</h2>
            </div>
        </main>
    )
};