"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-card">
      <motion.div
        className="container mx-auto max-w-5xl px-4 py-8"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Streak - Chess.com Chromium based Extension
          </p>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="https://github.com/AvadhootSmart/Streak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline-offset-4 hover:underline"
            >
              GitHub
            </Link>
          </nav>
        </div>
      </motion.div>
    </footer>
  )
}
