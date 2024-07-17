import { Link2 } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Header(){
    return(
        <header className="flex items-center justify-between px-6 py-5 md:px-20 lg:px-32">
        <div>
          <Link2 className="h-6 w-6" />
           
        </div>
        <div className="flex items-center gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/">Login</Link>
          <Link className={buttonVariants({ variant: "shine" })} href="/">Get Started</Link>
        </div>
      </header>
    )
};