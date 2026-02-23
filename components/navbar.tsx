"use client"

import Link from "next/link"
import { Flower2 } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Flower2 className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-foreground">BloomHealth</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Home
          </Link>
          <Link
            href="/intake"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Get Started
          </Link>
        </nav>
        <Link
          href="/intake"
          className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get My Plan
        </Link>
      </div>
    </header>
  )
}
