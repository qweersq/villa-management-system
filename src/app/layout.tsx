import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
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
      className={`${outfit.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50">
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-lg">
          <div className="flex h-16 items-center justify-between px-6 max-w-6xl mx-auto">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105 duration-300">
                <div className="bg-slate-900 text-white p-1.5 rounded-lg shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                </div>
                <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">Villa Management System</span>
              </a>
              <div className="hidden md:flex items-center gap-2">
                <a href="/" className="text-sm font-medium text-slate-600 transition-all hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md">Dashboard</a>
                <a href="/villas" className="text-sm font-medium text-slate-600 transition-all hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md">Kelola Villa</a>
                <a href="/reservations" className="text-sm font-medium text-slate-600 transition-all hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-md">Reservasi</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-600 flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold text-white">ID</span>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1 w-full max-w-6xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
