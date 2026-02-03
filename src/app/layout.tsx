import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderDynamic from "@/components/header/HeaderDynamic";
import FooterWithNav from "@/components/footer/FooterWithNav";
import { ThemeModeProvider } from "@/components/buttons/ThemeModeContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Template Next App",
    default: "Template Next App",
  },
  description: "APP_DESCRIPTION",
  // description er står under sidens navn i søgemaskiner, SEO
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-900`}>
        <HeaderDynamic />
        <ThemeModeProvider>
          <main className="px-4">
            {children}
          </main>
        </ThemeModeProvider>
        <FooterWithNav />
      </body>
    </html>
  );
}
