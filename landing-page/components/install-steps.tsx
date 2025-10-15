"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

const steps: { number: number; title: string; description: ReactNode }[] = [
  {
    number: 1,
    title: "Download the ZIP File",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Click the download button above to get the Streak extension ZIP file.
      </p>
    ),
  },
  {
    number: 2,
    title: "Extract the Files",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Unzip the downloaded file to a folder on your computer.
      </p>
    ),
  },
  {
    number: 3,
    title: "Open Chrome Extensions Page",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        In Chrome, go to{" "}
        <a
          href="chrome://extensions/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          chrome://extensions/
        </a>
        .
      </p>
    ),
  },
  {
    number: 4,
    title: "Enable Developer Mode",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Turn on Developer Mode using the toggle in the top-right corner.
      </p>
    ),
  },
  {
    number: 5,
    title: "Load Unpacked Extension",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Click ‘Load unpacked’ and select the folder where you extracted the Streak files.
      </p>
    ),
  },
  {
    number: 6,
    title: "Start Playing!",
    description: (
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Visit Chess.com and enjoy real-time streak tracking while you play.
      </p>
    ),
  },
]

export function InstallSteps() {
  return (
    <div className="w-full">
      <motion.div
        className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
      >
        <div>
          <h2 className="text-balance text-2xl font-semibold tracking-tight md:text-3xl">How to Install Streak</h2>
          <p className="mt-2 max-w-[60ch] text-sm text-muted-foreground md:text-base">
            Follow these simple steps to start tracking your Chess.com performance.
          </p>
        </div>

        <Button asChild size="lg" className="shrink-0">
          {/* Place your ZIP at /streak-extension.zip to enable direct download */}
          <Link href="/streak-extension.zip" download aria-label="Download the Streak extension ZIP">
            Download Extension ZIP
          </Link>
        </Button>
      </motion.div>

      {/* Steps list */}
      <ol className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-2">
        {steps.map((s, idx) => (
          <motion.li
            key={s.number}
            className="rounded-lg border bg-card p-5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
          >
            <div className="flex items-start gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground font-semibold">
                {s.number}
              </div>
              <div>
                <h3 className="text-base font-medium md:text-lg">{s.title}</h3>
                {s.description}
              </div>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Quick tip block */}
      <motion.div
        className="mt-6 rounded-md border bg-secondary p-4 text-sm text-muted-foreground"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        If the download doesn&apos;t start, right-click the button and select{" "}
        <span className="font-mono">Save link as…</span>. Then follow steps 2–6.
      </motion.div>
    </div>
  )
}
