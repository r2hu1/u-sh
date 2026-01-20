import { Link2 } from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import IfLoggedInElse from "../helpers/ifLoggedInElse";
import { SignOutButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 bg-secondary/80 px-2.5 py-0.5 border border-input rounded-md">
        <Link2 className="h-4 w-4" />
        <span className="text-lg">u-sh</span>
      </div>
      <div className="flex items-center gap-3">
        <IfLoggedInElse
          ifNot={
            <Link
              className={buttonVariants({ variant: "outline", size: "sm" })}
              href="/sign-in"
            >
              Login
            </Link>
          }
          ifUser={
            <SignOutButton redirectUrl="/">
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </SignOutButton>
          }
        />
        <IfLoggedInElse
          ifNot={
            <Link
              className={buttonVariants({ variant: "shine", size: "sm" })}
              href="/sign-up"
            >
              Get Started
            </Link>
          }
          ifUser={
            <Link
              className={buttonVariants({ variant: "shine", size: "sm" })}
              href="/dashboard"
            >
              Dashboard
            </Link>
          }
        />
      </div>
    </header>
  );
}
