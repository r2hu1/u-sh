import { AreaChart, Shapes, Signature, Unlink } from "lucide-react";
export default function Feature() {
    return (
        <section className="px-6 md:px-20 lg:px-32 mb-10">
            <div className="grid gap-2 max-w-xs md:max-w-lg sm:mx-auto lg:max-w-xl">
                <h2 className="text-3xl font-semibold lg:text-5xl sm:text-center">What it <span className="underline underline-offset-[5px] decoration-blue-400">requires</span> & How to get <span className="underline underline-offset-[5px] decoration-blue-400">started</span>?</h2>
                <p className="text-muted-foreground mx-auto text-base md:text-lg sm:text-center max-w-md">
                    The usage of this url shortener is easy and completely free without any subscription need.
                </p>
            </div>
            <div className="mt-7 flex flex-wrap gap-3 items-center justify-center">
                <div className="bg-card shadow-sm border border-border py-4 px-4 rounded-lg grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm">
                    <Signature className="h-5 w-5" />
                    <h3 className="text-lg -mb-1">Login or Sign Up</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">login or sign up to your accout using your socials google/github without passwords and email.</p>
                </div>
                <div className="bg-card shadow-sm border border-border py-4 px-4 rounded-lg grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm">
                    <Unlink className="h-5 w-5" />
                    <h3 className="text-lg -mb-1">Short your links</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">you can short any kind of links e.g youtube, instagram facebook & or custom link with just one click.</p>
                </div>
                <div className="bg-card shadow-sm border border-border py-4 px-4 rounded-lg grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm">
                    <Shapes className="h-5 w-5" />
                    <h3 className="text-lg -mb-1">Share your links</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">share your shorten links with anyone with just one click using social or copy your link.</p>
                </div>
                <div className="bg-card shadow-sm border border-border py-4 px-4 rounded-lg grid gap-2 sm:max-w-xs md:max-w-xs lg:max-w-sm">
                    <AreaChart className="h-5 w-5" />
                    <h3 className="text-lg -mb-1">Get analytics</h3>
                    <p className="text-sm sm:text-base text-muted-foreground">Get analytics of your links and clicks either the user is using chrome and analized regions.</p>
                </div>
            </div>
        </section>
    )
};