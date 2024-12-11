import type { Metadata } from "next";
import "../globals.css";
import Topbar from "@/components/Topbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "کلینیک مشاوره و روان درمانی ابراز",
  description: "کلینیک مشاوره و روان درمانی ابراز",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='md:px-12 lg:px-20 xl:px-48 md:py-4 flex flex-col items-center gap-4 main-body backdrop-blur-md'>
        <Topbar />
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
