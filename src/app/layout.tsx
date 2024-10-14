import type { Metadata } from 'next'
import { Roboto } from "next/font/google"
import classNames from 'classnames'
import './globals.css'
import { Suspense } from 'react'


export const metadata: Metadata = {
  title: 'Alkitab API',
  icons: {
    shortcut: "/logo.svg",
  },
  description: 'This is a simple Bible API that provides access to various Bible passages and verses.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cn = classNames
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased p-8",
        )}>
        <Suspense>
          {children}
        </Suspense>

      </body>
    </html>
  )
}