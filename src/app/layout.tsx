import type { Metadata } from 'next'
import { Roboto } from "next/font/google"
import classNames from 'classnames'
import './globals.css'

export const fontSans = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: '400'
})


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
          fontSans.variable
        )}>
        {children}
      </body>
    </html>
  )
}