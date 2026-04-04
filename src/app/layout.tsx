import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { ThemeProvider } from "./ThemeContext"; // Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zorvyn Dashboard",
  description: "Financial Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      {/* Added dark:bg-slate-950 and transition-colors to the body */}
      <body className="min-h-full flex bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <ThemeProvider>
          <Sidebar />
          <main className="w-full flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 overflow-y-auto">
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}