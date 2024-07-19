import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Review() {
    return (
        <section className="px-6 md:px-20 lg:px-32 mb-16 mt-4 max-w-5xl mx-auto">
            <div className="text-center mb-7 grid gap-2 max-w-xs md:max-w-lg mx-auto lg:max-w-xl">
                <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center">What our <span className="underline underline-offset-[5px] decoration-blue-400">customers</span> are <span className="underline underline-offset-[5px] decoration-blue-400">saying</span>?</h2>
                <p className="text-muted-foreground mx-auto text-sm sm:text-base text-center max-w-md">
                    See what our customers are saying about us. not an actual customer just to show.
                </p>
            </div>
            <Carousel>
                <CarouselContent>
                    <CarouselItem className="max-w-sm">
                        <div className="bg-card shadow-xs py-4 px-4 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/agam-riyandana.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Agam Riyandana</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@agam-riyandana</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">Super reliable and fast. The custom alias feature is perfect for branding, and the analytics offer excellent insights. Love it!</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="max-w-sm">
                        <div className="bg-card shadow-xs py-4 px-4 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/r2hu1.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Rahul Rajput :))</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@r2hu1</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">Fantastic URL shortener! It's easy to use, and the analytics are great for tracking link performance. (im the coder :)))!</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="max-w-sm">
                        <div className="bg-card shadow-xs py-4 px-4 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/daya3611.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Dayanand Gawade</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@daya3611</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">Best URL shortener I've used. It's simple and effective, with excellent analytics for detailed performance tracking.</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    )
};