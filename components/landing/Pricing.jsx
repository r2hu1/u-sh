import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function Pricing() {
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
        <section className="px-6 md:px-20 lg:px-32 mt-16 mb-14">
            <div className="grid gap-2">
                <h3 className="text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center">Pricing & Plans</h3>
                <p className="text-muted-foreground mx-auto text-sm sm:text-base text-center max-w-md">There is no need of any subscription. You can use it for free. But you can donote me if you want.</p>
            </div>
            <div className="mt-7 grid sm:grid-cols-2 gap-3 sm:place-content-center sm:w-fit sm:mx-auto">
                <Card className={"sm:max-w-[300px]"}>
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

                <Card className={"sm:max-w-[300px]"}>
                    <CardHeader>
                        <CardTitle className="text-xl -mb-1">Donate Me</CardTitle>
                        <CardDescription>help me to get a high end pc</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div>
                            <div
                                className="mb-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        personal response
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        get a quote
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className="mb-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        help in your projects
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        minor bugs and fixes
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div
                                className="mb-1 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-400" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        initial reviewer
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        get feedback for project
                                    </p>
                                </div>
                            </div>
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
    )
};
