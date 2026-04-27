import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Villa Management System",
  description: "Aplikasi manajemen villa dan reservasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <nav className="border-b bg-white">
          <div className="flex h-16 items-center px-6 max-w-6xl mx-auto gap-6">
            <h2 className="text-xl font-bold tracking-tight mr-4">VillaFlow</h2>
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">Dashboard</a>
            <a href="/villas" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Kelola Villa</a>
            <a href="/reservations" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Reservasi</a>
          </div>
        </nav>
        <main className="flex-1 w-full max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
