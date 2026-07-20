import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CHINTAPALLI VENKATA SAI SANTOSH | Futuristic 3D Portfolio",
  description: "Portfolio of Chintapalli Venkata Sai Santosh - Full Stack Developer, Machine Learning Engineer, Python Developer, and Data Analyst. Specializing in next-gen web systems, predictive ML models, and high-performance applications.",
  keywords: [
    "Sai Santosh Chintapalli",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Python Developer",
    "Data Analyst",
    "Blockchain Developer",
    "MCA Graduate Portfolio",
    "React Developer",
    "3D Portfolio"
  ],
  authors: [{ name: "CHINTAPALLI VENKATA SAI SANTOSH" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full bg-bg-dark text-slate-100 font-inter antialiased overflow-x-hidden selection:bg-primary/30 selection:text-primary custom-cursor-active">
        <div className="noise-overlay" />
        <div className="relative min-h-screen w-full flex flex-col bg-mesh">
          {children}
        </div>
      </body>
    </html>
  );
}
