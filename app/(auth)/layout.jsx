import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function Layout({ children }) {
    return (
        <main className="absolute h-full w-full flex items-center justify-center px-6">
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <ClerkLoaded>
                {children}
            </ClerkLoaded>
            <ClerkLoading>
                <Loader2 className="animate-spin h-6 w-6" />
            </ClerkLoading>
        </main>
    )
};