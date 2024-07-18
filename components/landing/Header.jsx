import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 md:px-20 lg:px-32">
      <div>
        <Link2 className="h-6 w-6" />
      </div>
      <div className="flex items-center gap-3">
        <IfLoggedInElse ifNot={
          <Link className={buttonVariants({ variant: "outline" })} href="/sign-in">Login</Link>
        } ifUser={
          <SignOutButton redirectUrl="/">
            <Button variant="outline">Logout</Button>
          </SignOutButton>
        } />
        <IfLoggedInElse ifNot={
          <Link className={buttonVariants({ variant: "shine" })} href="/sign-up">Get Started</Link>
        } ifUser={
          <Link className={buttonVariants({ variant: "shine" })} href="/dashboard">Dashboard</Link>
        } />
      </div>
    </header>
  )
};