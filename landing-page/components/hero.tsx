"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <header className="relative isolate">
      <div className="">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1
              className="text-balance text-3xl font-semibold tracking-tight md:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              Track Your Winning Streaks on Chess.com
            </motion.h1>

            <motion.p
              className="text-pretty mt-4 text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Stay motivated and see your progress with Streak — the ultimate Chess.com Chrome extension for tracking
              wins and losses in real time.
            </motion.p>

            {/* CTA */}
            <motion.div
              className="mt-8 flex items-center justify-center gap-3"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              <Button asChild size="lg">
                <Link href="#install" aria-label="Jump to installation steps">
                  Download Now
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.figure
            className="mt-10 rounded-lg border bg-card p-2 shadow-sm md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <video
              className="aspect-video w-full rounded-md"
              controls
              preload="metadata"
              muted
              playsInline
              poster="/streak-demo-preview-video-poster.jpg"
            >
              {/* When you have your demo, place it at /streak-demo.mp4 */}
              <source src="/streak-demo.mp4" type="video/mp4" />
              {"Your browser does not support the video tag."}
            </video>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              Watch how Streak enhances your Chess.com experience
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </header>
  )
}
