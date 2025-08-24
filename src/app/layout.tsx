import type { Metadata } from "next";
import { Open_Sans } from "next/font/google"; // import Open Sans
import "./globals.css";
import ThemeRegistry from "@/components/ThemeRegistry";

// Configure Open Sans
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"], // choose weights you need
});

export const metadata: Metadata = {
  title: "Marketplace Dashboard",
  description: "A modern marketplace dashboard with filtering and sorting capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased`}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
