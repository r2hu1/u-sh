import MainChart from "@/components/dashboard/MainChart";
import ShortUrlForm from "@/components/dashboard/ShortUrlForm";
import createUserAtSignUp from "@/server_functions/createUserAtSignUp";

export default async function page() {
    await createUserAtSignUp();
    return (
        <main className="px-6 md:px-20 lg:px-32 py-10 grid gap-7">
            <ShortUrlForm/>
            <div className="grid gap-4 px-4 py-4 border-border border rounded-lg">
                <div>
                    <h2 className="text-lg">Recent Links</h2>
                    <p className="text-sm text-muted-foreground">list of yout recently shortened links.</p>
                </div>
                <div className="h-40 grid place-content-center border border-dashed border-border rounded-lg">
                    <p className="text-center text-sm text-muted-foreground">No links yet</p>
                </div>
            </div>

            <div>
                <MainChart />
            </div>
        </main>
    )
}