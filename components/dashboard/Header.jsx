"use client";
import {
	ClerkLoaded,
	ClerkLoading,
	SignOutButton,
	UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { BarChart2, BarChart2Icon, Loader2, PanelTopOpen } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "../modetoggle";

export default function Header() {
	const [pathName, setPathName] = useState("");
	const defaultClass =
		"transition h-10 rounded-l-lg border-r-2 border-transparent hover:border-blue-400 text-center hover:bg-accent/40 grid place-content-center text-base";
	const activeClass = "border-r-2 border-blue-400 bg-accent/40";
	const getPageUrl = () => {
		setPathName(window.location.pathname);
		return true;
	};
	useEffect(() => {
		getPageUrl();
	}, []);
	return (
		<header className="px-6 md:px-20 lg:px-44 py-4 flex items-center justify-between">
			<Sheet>
				<SheetTrigger asChild>
					<div className="flex items-center justify-center h-10 w-10 rounded-lg cursor-pointer transition">
						<BarChart2Icon className="h-6 w-6 rotate-[90deg]" />
					</div>
				</SheetTrigger>
				<SheetContent
					side="left"
					className="flex flex-col justify-between sm:max-w-xs"
				>
					<SheetHeader>
						<SheetDescription className="mt-10">
							<div className="grid gap-2">
								<Link
									onClick={() => {
										setPathName("/");
									}}
									className={cn(defaultClass, pathName == "/" && activeClass)}
									href="/"
								>
									Home
								</Link>
								<Link
									onClick={() => {
										setPathName("/dashboard");
									}}
									className={cn(
										defaultClass,
										pathName == "/dashboard" && activeClass,
									)}
									href="/dashboard"
								>
									Dashboard
								</Link>
								<Link
									onClick={() => {
										setPathName("/dashboard/links");
									}}
									className={cn(
										defaultClass,
										pathName == "/dashboard/links" && activeClass,
									)}
									href="/dashboard/links"
								>
									All Links
								</Link>
								<Link
									onClick={() => {
										setPathName("/dashboard/statistics");
									}}
									className={cn(
										defaultClass,
										pathName == "/dashboard/statistics" && activeClass,
									)}
									href="/dashboard/statistics"
								>
									Statistics
								</Link>
							</div>
						</SheetDescription>
					</SheetHeader>
					<SheetFooter>
						<SheetDescription className="mt-10 grid gap-7 w-full">
							{/* <div className="flex items-center justify-between">
                                <Link href="https://github.com/r2hu1/url-shortner">Github Repo</Link>
                                <Link href="mailto:hi@rahul.eu.org">Hire Me</Link>
                                <Link href="https://rahul.eu.org">My Portfolio</Link>
                            </div> */}
							<div className="flex items-center justify-between gap-3">
								<div className="grid !gap-0.5">
									<div className="border rounded-lg overflow-hidden">
										<ModeToggle btnClassName="border-0 rounded-none" />
									</div>
									<span className="text-xs text-opacity-75 text-center">
										Change Theme
									</span>
								</div>
								<SignOutButton redirectUrl="/">
									<Button>Logout</Button>
								</SignOutButton>
							</div>
						</SheetDescription>
					</SheetFooter>
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
		</header>
	);
}
