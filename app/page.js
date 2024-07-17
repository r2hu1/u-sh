import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AreaChart, Link2, Signature, Star, Unlink, BellRing, Check } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  const pricing_features = [
    {
      title: "unlimited links",
      description: "max 200 links per month",
    },
    {
      title: "detailed stats",
      description: "statistics for each link",
    },
    {
      title: "link's functionality",
      description: "disable, pause links etc",
    },
  ]
  return (
    <main>
      <header className="flex items-center justify-between px-6 py-5 md:px-20 lg:px-32">
        <div>
          <Link2 className="h-6 w-6" />
        </div>
        <div className="flex items-center gap-3">
          <Link className={buttonVariants({ variant: "outline" })} href="/">Login</Link>
          <Link className={buttonVariants({ variant: "shine" })} href="/">Get Started</Link>
        </div>
      </header>

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

      <section className="mb-14 mt-3 px-6 md:px-20 lg:px-32 text-center w-fit mx-auto flex flex-wrap gap-5 items-center justify-center">
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl">400+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">registered users</p>
        </div>
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl underline underline-offset-[5px] decoration-blue-400">24300+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">links shorted</p>
        </div>
        <div className="grid !gap-0">
          <h1 className="text-2xl font-medium md:text-3xl">45300+</h1>
          <p className="text-muted-foreground text-sm sm:text-base">link clicks</p>
        </div>
      </section>

      <section className="px-6 md:px-20 lg:px-32 mb-10">
        <div className="grid gap-2 max-w-sm md:max-w-lg mx-auto lg:max-w-xl">
          <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center">What it <span className="underline underline-offset-[5px] decoration-blue-400">requires</span> & How to get <span className="underline underline-offset-[5px] decoration-blue-400">started</span>?</h2>
          <p className="text-muted-foreground mx-auto text-sm sm:text-base text-center max-w-md">
            The usage of this url shortener is easy and completely free without any subscription need.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3 items-center justify-center">
          <div className="border border-border py-4 px-4 rounded-md grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm cursor-pointer transition hover:-translate-y-2">
            <Signature className="h-5 w-5" />
            <h3 className="text-lg -mb-1">Login or Sign Up</h3>
            <p className="text-sm sm:text-base text-muted-foreground">login or sign up to your accout using your socials google/github without passwords and email.</p>
          </div>
          <div className="border border-border py-4 px-4 rounded-md grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm cursor-pointer transition hover:-translate-y-2">
            <Unlink className="h-5 w-5" />
            <h3 className="text-lg -mb-1">Short your links</h3>
            <p className="text-sm sm:text-base text-muted-foreground">you can short any kind of links e.g youtube, instagram facebook & or custom link with just one click.</p>
          </div>
          <div className="border border-border py-4 px-4 rounded-md grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm cursor-pointer transition hover:-translate-y-2">
            <AreaChart className="h-5 w-5" />
            <h3 className="text-lg -mb-1">Get analytics</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Get analytics of your links and clicks either the user is using chrome & analized regions.</p>
          </div>
          <div className="border border-border py-4 px-4 rounded-md grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm cursor-pointer transition hover:-translate-y-2">
            <AreaChart className="h-5 w-5" />
            <h3 className="text-lg -mb-1">Get analytics</h3>
            <p className="text-sm sm:text-base text-muted-foreground">Get analytics of your links and clicks either the user is using chrome and analized regions.</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 lg:px-32 mt-14 mb-14">
        <div className="grid gap-2">
          <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center">Pricing & Plans</h3>
          <p className="text-muted-foreground mx-auto text-sm sm:text-base text-center max-w-md">There is no need of any subscription. You can use it for free. But you can donote me if you want.</p>
        </div>
        <div className="mt-7 grid sm:grid-cols-2 gap-3 place-content-center w-fit mx-auto">
          <Card className={"max-w-[300px]"}>
            <CardHeader>
              <CardTitle className="text-xl -mb-1">0$ Yearly</CardTitle>
              <CardDescription>100% off for 1 year for lifetime</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {pricing_features.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                <Check className="mr-2 h-4 w-4" /> Get Started
              </Button>
            </CardFooter>
          </Card>

          <Card className={"max-w-[300px]"}>
            <CardHeader>
              <CardTitle className="text-xl -mb-1">0$ Yearly</CardTitle>
              <CardDescription>100% for 1 year for lifetime</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div>
                {pricing_features.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" /> Get Started
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </main>
  )
}