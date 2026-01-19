import Header from "@/components/dashboard/Header";
import Footer from "@/components/landing/Footer";

export const metadata = {
    title: "Dashboard - URL Shortener",
    description: "Manage your shortened URLs, view analytics, and track click performance on your links.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function Layout({children}){
    return(
        <main>
            <Header/>
            {children}
            <Footer/>
        </main>
    )
}