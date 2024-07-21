"use client";

import getAllLinks from "@/server_functions/getAllLinks";
import { Copy, EllipsisVertical, ExternalLink, Eye, Loader2, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import deleteOneByAlias from "@/server_functions/deleteOneByAlias";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import editOneById from "@/server_functions/editOneById";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export default function page() {
    const [allLinks, setAllLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [openEditing, setOpenEditing] = useState(false);

    const handleDelete = async (id) => {
        try {
            const data = await deleteOneByAlias({ id: id });
            if (data) {
                toast.success("Link deleted successfully");
                setIsDeleted(true);
                setTimeout(() => {
                    setIsDeleted(false);
                }, 500);
            } else {
                toast.error("Something went wrong");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault();
        setIsEditing(true);
        const alias = e.target.alias.value;
        const url = e.target.url.value;

        try {
            const data = await editOneById({ id: e.target.id.value, url: url, ali: alias });
            if (data) {
                toast.success("Link edited successfully");
                setIsDeleted(true);
                setTimeout(() => {
                    setIsDeleted(false);
                }, 500);
            } else {
                toast.error("Something went wrong");
            }
        }
        catch (e) {
            toast.error("Something went wrong");
        }
        setIsEditing(false);
        setOpenEditing(false);
    }

    useEffect(() => {
        const fetchAllLinks = async () => {
            try {
                const data = await getAllLinks();
                setAllLinks(JSON.parse(data));
                console.log(JSON.parse(data));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        fetchAllLinks();
    }, [isDeleted]);
    return (
        <main className="px-6 md:px-20 lg:px-32 py-10 grid gap-7">
            <div className="grid gap-4 px-4 py-4 border-border border rounded-lg">
                <div>
                    <h2 className="text-lg">All Links</h2>
                    <p className="text-sm text-muted-foreground">list of yout lifetime shortened links.</p>
                </div>
                <div>
                    <div className="border border-border border-dashed rounded-lg">
                        {loading && (
                            <div className="grid place-items-center h-52">
                                <Loader2 className="animate-spin h-4 w-5" />
                            </div>
                        )}
                        {!loading && !allLinks.length ? (
                            <div className="grid place-items-center h-52">
                                <p className="text-sm text-muted-foreground">No links found.</p>
                            </div>
                        ) : null}
                        {allLinks && (
                            <div>
                                {allLinks.map((link) => (
                                    <div key={link._id} className="grid gap-2 p-4 linkList">
                                        <Link target="_blank" className="text-sm opacity-85 hover:underline flex items-center justify-between" href={`https://${location.host}/${link.alias}`}>
                                            <span>https://{location.host}/{link.alias}</span> <ExternalLink className="h-3 w-3" />
                                        </Link>
                                        <div className="flex gap-2 items-center">
                                            <p className="text-sm text-muted-foreground flex items-center gap-1 bg-accent/50 rounded-full px-2 cursor-pointer py-1 w-fit">{link.clicks > 0 ? link.clicks - 1 : link.clicks} <Eye className="h-4 w-4" /></p>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="secondary" className="h-6 w-6" size="icon">
                                                        <EllipsisVertical className="h-4 w-4 cursor-pointer" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="mt-4">
                                                    <DropdownMenuItem asChild>
                                                        <div className="flex items-center justify-between" onClick={() => { navigator.clipboard.writeText(`https://${location.host}/${link.alias}`); toast.success("Copied to clipboard"); }}>Copy <Copy className="h-4 w-4" /></div>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <AlertDialog open={openEditing}>
                                                            <AlertDialogTrigger asChild>
                                                                <div onClick={() => setOpenEditing(true)} className="relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">Edit <Pencil className="h-4 w-4" /></div>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogDescription>
                                                                        <form className="grid gap-3 text-start" method="post" onSubmit={handleEdit}>
                                                                            <Label htmlFor="alias">Alias</Label>
                                                                            <Input id="alias" name="alias" defaultValue={link.alias} />
                                                                            <Label htmlFor="url">Destination URL</Label>
                                                                            <Input id="url" name="url" defaultValue={link.destination_url} />
                                                                            <Label htmlFor="id">ID <span className="text-muted-foreground text-xs">(readonly)</span><span className="text-blue-400">*</span></Label>
                                                                            <Input id="id" name="id" value={link._id} readOnly />
                                                                            <Button disabled={isEditing} type="submit" variant="shine" className="w-full mt-2">{isEditing ? <Loader2 className="animate-spin h-4 w-4" /> : "Save"}</Button>
                                                                            <Button variant="outline" type="button" className="w-full" onClick={() => setOpenEditing(false)}>Close</Button>
                                                                        </form>
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <div onClick={() => handleDelete(link._id)} className="flex items-center justify-between">Delete <Trash className="h-4 w-4" /></div>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
