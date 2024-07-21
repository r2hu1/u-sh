import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

export default function RootLayout({ children }) {
  return (
    <main>
      <Header />
      {children}
      <Footer/>
    </main>
  );
}
