import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import NavBar from "@/components/nav/NavBar";
import TanstackProvider from "@/config/TanstackProvider";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
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

export const metadata: Metadata = {
  title: "Yaoyao dinner",
  description: "FURUM's yaoyao dinner system (?)",
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
    <html lang={locale}>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <TanstackProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NavBar />
            <AuthHydrator />
            {children}
            <ToastContainer />
          </NextIntlClientProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
