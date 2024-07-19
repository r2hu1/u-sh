"use client";
import { ClerkLoaded, ClerkLoading, SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Loader2, PanelTopOpen } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";

export default function Header() {
    return (
        <header className="px-6 md:px-20 lg:px-32 py-4 flex items-center justify-between">
            <Sheet>
                <SheetTrigger asChild>
                    <div className="flex items-center justify-center border border-border rounded-lg h-10 w-10 hover:bg-secondary cursor-pointer transition">
                        <PanelTopOpen className="h-4 w-4 rotate-[90deg]" />
                    </div>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetDescription className="mt-10">
                            in dev
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>

            <ClerkLoaded>
                <div className="flex items-center gap-3">
                    <SignOutButton redirectUrl="/">
                        <Button variant="outline">Logout</Button>
                    </SignOutButton>
                    <UserButton />
                </div>
            </ClerkLoaded>
            <ClerkLoading>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="w-20">
                        <Loader2 className="h-5 w-5 animate-spin" />
                    </Button>
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </ClerkLoading>
        </header>
    );
};
