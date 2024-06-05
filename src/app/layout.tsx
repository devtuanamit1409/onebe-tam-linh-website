import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NTS",
  description: "NTSe",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const language = cookieStore.get("language")?.value || "vi";

  return (
    <html lang={language}>
      <body className={inter.className}>
        <LanguageProvider initialLanguage={language}>
          <Header />
          <div
            id="top-content"
            className="desktop:mt-[100px] mobile:mt-[72px]"
          ></div>
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
