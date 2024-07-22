import MainChart from "@/components/dashboard/MainChart";
import ShortUrlFormAndRecentLinks from "@/components/dashboard/ShortUrlFormAndRecentLinks";
import createUserAtSignUp from "@/server_functions/createUserAtSignUp";



export default async function page() {
    await createUserAtSignUp();
    return (
        <main className="px-6 md:px-20 lg:px-44 py-10 grid md:gap-3 gap-7 md:grid-cols-2">
            <ShortUrlFormAndRecentLinks />
            <div>
                <MainChart />
            </div>
        </main>
    )
}