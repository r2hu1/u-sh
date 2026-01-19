import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';
import { Analytics } from "@vercel/analytics/react";

const inter = Bricolage_Grotesque({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
    title: "URL Shortener - Free Link Shortener with Analytics",
    description: "Open-Source URL shortener built with Next.js & MongoDB. Track your link's clicks, get detailed analytics, and shorten URLs for free. Lifetime free service with advanced features.",
    keywords: ["URL shortener", "link shortener", "short links", "analytics", "click tracking", "free", "open source", "Next.js", "MongoDB"],
    authors: [{ name: "Agamya Samuel" }],
    creator: "URL Shortener",
    publisher: "URL Shortener",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://s.agamya.dev'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "URL Shortener - Free Link Shortener with Analytics",
        description: "Open-Source URL shortener built with Next.js & MongoDB. Track your link's clicks, get detailed analytics, and shorten URLs for free.",
        url: '/',
        siteName: 'URL Shortener',
        images: [
            {
                url: '/preview.png',
                width: 1200,
                height: 630,
                alt: 'URL Shortener Preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "URL Shortener - Free Link Shortener with Analytics",
        description: "Open-Source URL shortener built with Next.js & MongoDB. Track your link's clicks, get detailed analytics, and shorten URLs for free.",
        images: ['/preview.png'],
        creator: '@AgamyaSamuel', // Replace with actual Twitter handle
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <NextTopLoader
                        color="#60a5fa"
                        initialPosition={0.08}
                        crawlSpeed={200}
                        height={3}
                        crawl={true}
                        showSpinner={false}
                        easing="ease"
                        speed={200}
                        shadow="0 0 10px #60a5fa,0 0 5px #60a5fa"
                        template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                        zIndex={160000}
                        showAtBottom={false}

                    />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        {children}
                        <Analytics />
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
