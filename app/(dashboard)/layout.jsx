import Header from "@/components/dashboard/Header";

export default function Layout({children}){
    return(
        <main>
            <Header/>
            {children}
        </main>
    )
}