import type { Metadata } from "next";
import { Lora, Montserrat } from "next/font/google";
import "../../styles/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import HeaderNew from "@/components/layout/HeaderNew";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });

export const metadata: Metadata = {
  title: "NTS",
  description: "NTSe",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} ${lora.variable}`}>
        <NextTopLoader
          color="#28A645"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #28A645,0 0 5px #28A645"
        />
        <NextIntlClientProvider messages={messages}>
          <HeaderNew locale={locale} />
          <div
            id="top-content"
            className="desktop:mt-[100px] mobile:mt-[72px]"></div>
          <main>{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
