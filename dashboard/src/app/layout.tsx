import type { Metadata } from "next";
import { Quicksand, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-sans',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Teamagotchi",
  description: "Avatar* Team Spirit",
  appleWebApp: { capable: true, title: 'Teamagotchi' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
