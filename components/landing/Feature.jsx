import { AreaChart, Signature, Unlink } from "lucide-react";
export default function Feature() {
    return (
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
    )
};