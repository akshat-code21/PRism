import { Figtree, Geist_Mono } from "next/font/google"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Providers } from "@/components/providers"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: {
    default: "PRism - AI-Powered GitHub PR Reviews",
    template: "%s | PRism",
  },
  description:
    "Get instant, AI-powered code reviews for your GitHub pull requests. PRism analyses diffs, highlights issues, and helps you ship better code faster.",
  keywords: [
    "GitHub",
    "pull request",
    "code review",
    "AI",
    "PRism",
    "developer tools",
  ],
  authors: [{ name: "PRism" }],
  openGraph: {
    title: "PRism - AI-Powered GitHub PR Reviews",
    description:
      "Instant AI code reviews for GitHub pull requests. Ship better code, faster.",
    siteName: "PRism",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRism - AI-Powered GitHub PR Reviews",
    description:
      "Instant AI code reviews for GitHub pull requests. Ship better code, faster.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", figtree.variable)}
    >
      <body className="min-h-svh bg-background overflow-x-hidden">
        <ThemeProvider>
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
