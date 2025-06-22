import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Smarnika – Personal Knowledge Management with AI | Organize Your Digital Brain",
  description:
    "Smarnika is an AI-powered personal knowledge management app that helps you capture, organize, and retrieve information seamlessly. Boost your productivity with smart, connected knowledge.",
  keywords: [
    "personal knowledge management",
    "personal knowledge management app",
    "AI note-taking app",
    "PKM app",
    "second brain app",
    "second brain software",
    "AI productivity tool",
    "AI productivity app",
    "note taking app with AI",
    "zettelkasten app",
    "AI note organizer",
    "digital garden tool",
    "knowledge management software",
    "connected thoughts app",
    "smart note-taking system",
    "idea management tool",
    "AI tool for organizing notes",
    "build a second brain",
    "best PKM app",
    "AI-powered notetaking",
    "note-taking for researchers",
    "personal knowledge base",
    "Smarnika app",
    "Smarnika second brain",
    "Smarnika knowledge management",
    "top PKM tools with AI",
  ],
  openGraph: {
    title: "Smarnika – Your AI-Powered Second Brain",
    description:
      "Capture, organize, and retrieve information with AI. Boost productivity with Smarnika's intelligent knowledge system.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-right" />
            <PerformanceMonitor />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
