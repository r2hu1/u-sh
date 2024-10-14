import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Review() {
    return (
        <section className="px-6 md:px-20 lg:px-32 mb-16 max-w-5xl sm:mx-auto">
            <div className="sm:text-center mb-7 grid gap-2 max-w-xs md:max-w-lg sm:mx-auto lg:max-w-xl">
                <h2 className="text-3xl font-semibold lg:text-5xl sm:text-center">What our <span className="underline underline-offset-[5px] decoration-blue-400">customers</span> are <span className="underline underline-offset-[5px] decoration-blue-400">saying</span>?</h2>
                <p className="text-muted-foreground mx-auto text-base md:text-lg sm:text-center max-w-md">
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
                                    <AvatarFallback>AR</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Agam Riyandana</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@agam-riyandana</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">This URL shortener is incredibly easy to use. With a clean and intuitive interface, I can shorten my links in seconds. It’s perfect for quickly sharing concise links without any hassle. Highly recommended for anyone who needs a reliable URL shortener!</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="max-w-sm">
                        <div className="bg-card shadow-xs py-4 px-4 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/r2hu1.png" />
                                    <AvatarFallback>RR</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Rahul Rajput :))</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@r2hu1</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">Speed is crucial for me, and this URL shortener delivers every time. It generates links almost instantly and has never failed me. I can rely on it for all my link shortening needs without worrying about downtime. A fantastic tool for anyone looking for self!</p>
                        </div>
                    </CarouselItem>
                    <CarouselItem className="max-w-sm">
                        <div className="bg-card shadow-xs py-4 px-4 rounded-lg border border-border">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/daya3611.png" />
                                    <AvatarFallback>DG</AvatarFallback>
                                </Avatar>
                                <div className="grid !gap-0">
                                    <h2 className="text-lg font-normal">Dayanand Gawade</h2>
                                    <span className="-mt-1 text-sm text-muted-foreground">@daya3611</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 sm:text-base">Security is a big concern for me, and this URL shortener meets all my expectations. It provides secure links and protects my data. I feel confident using it for my business communications. An excellent choice for anyone needing a secure URL shortener!</p>
                        </div>
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    )
};