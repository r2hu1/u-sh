import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Star } from "lucide-react";

export default function Hero() {
    return(
        <section className="py-14 px-6 md:px-20 lg:px-32">
        <div className="grid gap-2 text-center place-items-center sm:max-w-lg md:max-w-2xl sm:mx-auto lg:max-w-[900px]">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl">Open-Source url shortener built with <span className="underline underline-offset-[5px] decoration-blue-400">nextjs</span> & <span className="underline underline-offset-[5px] decoration-blue-400">mongodb</span></h1>
          <p className="text-muted-foreground sm:mt-2 text-sm sm:text-base max-w-2xl">I have coded this url shortner using nextjs 14, shadcn/ui & mongodb client mongoose with detailed analytics of links being clicked!</p>
          <div className="flex items-center gap-3 mt-3">
            <Link href="/" className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-1")}><Star className="h-3.5 w-3.5" />Star on Github</Link>
            <Link href="/" className={buttonVariants({ variant: "outline" })}>Get Started</Link>
          </div>
        </div>
      </section>
    )
};