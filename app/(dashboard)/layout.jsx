import Header from "@/components/dashboard/Header";
import Footer from "@/components/landing/Footer";

export default function Layout({children}){
    return(
        <main>
            <Header/>
            {children}
            <Footer/>
        </main>
    )
}