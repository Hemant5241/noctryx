import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: "Om Shinde // AI Systems Engineer & Architect",
  description:
    "Engineering portfolio of Om Shinde. AI Systems Engineer specializing in autonomous agent workflows, neural vector search, edge computer vision, and low-latency inference systems.",
  keywords: [
    "Om Shinde",
    "AI Engineer",
    "Machine Learning Engineer",
    "Agentic AI",
    "Vector Search",
    "Computer Vision",
    "LLM Systems",
    "PyTorch",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Om Shinde" }],
  openGraph: {
    title: "Om Shinde // AI Systems Engineer & Architect",
    description:
      "Engineering intelligent architectures where statistical models meet deterministic reliability.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F4F1EA] text-[#0D0D0D] selection:bg-[#FF3B00] selection:text-white">
        <Header />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
