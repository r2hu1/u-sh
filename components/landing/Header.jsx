import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center border-b justify-between px-5 py-3 md:px-20 lg:px-32 mb-10">
      <div className="flex items-center gap-2">
        <Link2 className="h-5 w-5" />
        <span className="font-medium">u-sh</span>
      </div>
      <div className="flex items-center gap-3">
        <IfLoggedInElse ifNot={
          <Link className={buttonVariants({ variant: "outline",size: "sm" })} href="/sign-in">Login</Link>
        } ifUser={
          <SignOutButton redirectUrl="/">
            <Button variant="outline" size="sm">Logout</Button>
          </SignOutButton>
        } />
        <IfLoggedInElse ifNot={
          <Link className={buttonVariants({ variant: "shine", size: "sm" })} href="/sign-up">Get Started</Link>
        } ifUser={
          <Link className={buttonVariants({ variant: "shine", size: "sm" })} href="/dashboard">Dashboard</Link>
        } />
      </div>
    </header>
  )
};