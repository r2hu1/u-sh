"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShortUrl from "@/server_functions/shortUrl";
import { LucideCopy, X } from "lucide-react";
import { useState } from "react";
import { toast } from 'sonner';

export default function ShortUrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortedUrl, setShortedUrl] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (alias) {
            const data = await ShortUrl({
                url: url,
                ali: alias
            });
            if (JSON.parse(data).alias) {
                setShortedUrl(JSON.parse(data).alias);
                toast.success("URL shortened successfully!");
                setAlias("");
                setUrl("");
            }
            else if (JSON.parse(data).message) {
                toast.error(JSON.parse(data).message);
            }
        }
        else {
            const data = await ShortUrl({
                url: url,
            });
            if (JSON.parse(data).alias) {
                setShortedUrl(JSON.parse(data).alias);
                toast.success("URL shortened successfully!");
                setAlias("");
                setUrl("");
            }
            else if (JSON.parse(data).message) {
                toast.error(JSON.parse(data).message);
            }
        }
    }

    return (
        <form method="post" onSubmit={handleSubmit} className="grid gap-3 px-4 py-4 border-border border rounded-lg">
            <div className="mb-2">
                <h2 className="text-lg">Short Link</h2>
                <p className="text-sm text-muted-foreground">short your link in seconds.</p>
            </div>
            <Label htmlFor="url">Your URL</Label>
            <Input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/dfghj.." name="url" />
            <Label htmlFor="alias">Alias <span className="text-xs text-muted-foreground">(optional)<span className="text-blue-400">*</span></span></Label>
            <Input value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="somethi.." name="alias" />
            {shortedUrl && (
                <div className="mt-3 grid gap-3">
                    <Label htmlFor="shortedurl" className="flex items-center justify-between">Shorted URL <X className="h-3 w-3 cursor-pointer" onClick={() => setShortedUrl("")}/></Label>
                    <div className="flex gap-2">
                        <Input value={`https://${location.host}/${shortedUrl}`} name="shortedurl" readOnly />
                        <Button type="button" size="icon" className="!h-10 !w-12" onClick={() => { navigator.clipboard.writeText(shortedUrl); toast.success("Copied to clipboard") }}><LucideCopy className="h-4 w-4" /></Button>
                    </div>
                </div>
            )}
            <Button type="submit" variant="shine" className="mt-3">Shorten</Button>
        </form>
    )
};
