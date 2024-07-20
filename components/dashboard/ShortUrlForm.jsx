"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ShortUrl from "@/server_functions/shortUrl";
import { ExternalLink, Loader2, LucideCopy, X } from "lucide-react";
import { useState } from "react";
import { toast } from 'sonner';
import { Checkbox } from "../ui/checkbox";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function ShortUrlForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortedUrl, setShortedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [isNeddedQr, setIsNeddedQr] = useState(false);
    const [isShorted, setIsShorted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (alias) {
            const data = await ShortUrl({
                url: url,
                ali: alias
            });
            if (JSON.parse(data).alias) {
                setShortedUrl(`https://${location.host}/${JSON.parse(data).alias}`);
                toast.success("URL shortened successfully!");
                setIsShorted(true);
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
                setShortedUrl(`https://${location.host}/${JSON.parse(data).alias}`);
                toast.success("URL shortened successfully!");
                setIsShorted(true);
                setAlias("");
                setUrl("");
            }
            else if (JSON.parse(data).message) {
                toast.error(JSON.parse(data).message);
            }
        }
        setLoading(false);
    }

    return (
        <form method="post" onSubmit={handleSubmit} className="grid gap-3 px-4 py-4 border-border border rounded-lg">
            <div className="mb-2">
                <h2 className="text-lg">Short Link</h2>
                <p className="text-sm text-muted-foreground">short your link in seconds.</p>
            </div>
            <Label htmlFor="url">Your URL</Label>
            <Input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com/dfghj.." id="url" />
            <Label htmlFor="alias">Alias <span className="text-xs text-muted-foreground">(optional)</span><span className="text-blue-400">*</span></Label>
            <Input maxLength={10} value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="somethi.." id="alias" />
            <div className="flex gap-2 items-center mt-1">
                <Checkbox id="qrcode" onCheckedChange={(e) => setIsNeddedQr(e)} />
                <Label htmlFor="qrcode">Also generate qr code <span className="text-xs text-muted-foreground">(optional)</span><span className="text-blue-400">*</span></Label>
            </div>
            <Button type="submit" variant="shine" className="mt-3" disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Shorten"}</Button>
            <AlertDialog open={isShorted}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Link Shortened Successfully</AlertDialogTitle>
                        <AlertDialogDescription>
                            <p>Here is your shortened link, copy it and share it with anyone with just one click</p>
                            <div className="mt-3 grid gap-3">
                                {isNeddedQr && (
                                    <div className="grid gap-2">
                                        <img className="rounded-lg mx-auto" src={`https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`} alt="qr-code" width={200} height={200} />
                                        <Button variant="outline" className="w-fit mx-auto flex items-center gap-2" onClick={() => window.open(`https://api.qrserver.com/v1/create-qr-code/?data=${shortedUrl}&size=200x200`)}>Open in new tab <ExternalLink className="h-4 w-4" /></Button>
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Input value={shortedUrl} name="shortedurl" readOnly />
                                    <Button variant="pulse" type="button" size="icon" className="!h-10 !w-12" onClick={() => { navigator.clipboard.writeText(shortedUrl); toast.success("Copied to clipboard") }}><LucideCopy className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsShorted(false)} className="w-full bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground">Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </form>
    )
};
