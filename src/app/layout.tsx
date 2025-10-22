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
  title: "Yaoyao After Dinner",
  description: "Yaoyao after dinner by Yaoyao",
  openGraph: {
    title: "Yaoyao after dinner by Yaoyao",
    description: "Yaoyao after dinner by Yaoyao",
    type: "website",
    images: [
      {
        url: "/images/yaoyao.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yaoyao After Dinner",
    description: "Yaoyao after dinner by Yaoyao",
    images: ["/images/yaoyao.jpg"],
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
