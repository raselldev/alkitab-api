/**
 * The above function is a wrapper component that provides theme functionality to its children using
 * the NextThemesProvider component from the next-themes library.
 * @param {ThemeProviderProps}  - The `ThemeProvider` component is a wrapper component that provides
 * theme functionality to its children components. It uses the `ThemeProviderProps` type from the
 * `next-themes` package.
 * @returns The `ThemeProvider` component is being returned.
 */
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
