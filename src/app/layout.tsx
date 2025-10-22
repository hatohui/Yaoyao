import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/nav/NavBar";
import TanstackProvider from "@/config/TanstackProvider";
import ThemeProvider from "@/components/common/ThemeProvider";
import dynamic from "next/dynamic";
import enableGsapPlugins from "@/config/gsap";
import "./globals.css";

const AuthHydrator = dynamic(() => import("@/components/auth/AuthHydrator"));

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
  title: "Yaoyao After Dinner - Post Furum Restaurant",
  description:
    "Welcome to Yaoyao After Dinner! 🐾✨ Join us post Furum for a delightful culinary experience hosted by Yaoyao. Discover authentic flavors, cozy ambiance, and heartwarming dishes that make every evening special. Come hungry, leave happy! 💜",
  keywords: [
    "Yaoyao Restaurant",
    "Post Furum",
    "After Dinner",
    "Restaurant",
    "Dining",
    "Food",
    "Yaoyao",
  ],
  authors: [{ name: "Yaoyao" }],
  openGraph: {
    title: "Yaoyao After Dinner - Post Furum Restaurant",
    description:
      "Welcome to Yaoyao After Dinner! 🐾✨ Join us post Furum for a delightful culinary experience. Discover authentic flavors, cozy ambiance, and heartwarming dishes that make every evening special.",
    type: "website",
    siteName: "Yaoyao After Dinner",
    locale: "en_US",
    images: [
      {
        url: "/images/yaoyao.jpg",
        width: 1200,
        height: 630,
        alt: "Yaoyao After Dinner Restaurant",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaoyao After Dinner - Post Furum Restaurant",
    description:
      "Welcome to Yaoyao After Dinner! 🐾✨ Join us at Post Furum for a delightful culinary experience. Cozy ambiance, authentic flavors, and heartwarming dishes await!",
    images: ["/images/yaoyao.jpg"],
    creator: "@Yaoyao",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const locale = await getLocale();
  enableGsapPlugins();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('theme-storage');
                  var theme = 'system';
                  if (stored) {
                    theme = JSON.parse(stored).theme || 'system';
                  }
                  
                  var resolved = theme;
                  if (theme === 'system') {
                    resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  
                  if (resolved === 'dark') {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} antialiased bg-white dark:bg-dark-bg text-slate-900 dark:text-dark-text`}
      >
        <ThemeProvider>
          <TanstackProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <NavBar />
              <main>{children}</main>
              <AuthHydrator />
            </NextIntlClientProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
