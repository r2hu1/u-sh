import MainChart from "@/components/dashboard/MainChart";
import ShortUrlForm from "@/components/dashboard/ShortUrlForm";
import createUserAtSignUp from "@/server_functions/createUserAtSignUp";

export default async function page() {
    await createUserAtSignUp();
    return (
        <main className="px-6 md:px-20 lg:px-32 py-10 grid gap-7">
            <ShortUrlForm/>

            <div>
                <MainChart />
            </div>
        </main>
    )
}