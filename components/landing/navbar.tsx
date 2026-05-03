"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { Menu, ArrowRight } from "lucide-react"
import { useState } from "react"

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Reviews", href: "#testimonials" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/6 bg-background/50 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-0.5 text-xl font-bold tracking-tight">
          <span className="text-primary">PR</span>
          <span className="text-foreground">ism</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium tracking-wide text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button size="sm" nativeButton={false} render={<Link href="/auth/sign-in" />}>
            Get Started
            <ArrowRight className="ml-1 size-3.5" />
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="dark w-72 border-white/6 bg-background">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="mt-12 flex flex-col gap-6 px-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button className="mt-4 w-full" nativeButton={false} render={<Link href="/auth/sign-in" />}>Get Started</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
