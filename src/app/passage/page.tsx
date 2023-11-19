"use client"

import Navbar from "@/components/Navbar"
import { Skeleton } from "@/components/ui/skeleton"
import usePassage from "@/hooks/usePassage"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Button } from '@/components/ui/button';

export default function Home() {
    const router = useSearchParams()
    const abbr = router.get("book") as string
    const num = parseInt(router.get("number") as string);

    const { loading, data } = usePassage(abbr, num.toString())
    if (loading) return <Skeleton className="w-[100%] h-[20px] rounded-full" />
    if (!data || !data.bible) return <p>Data is undefined or null.</p>
    return (
        <>
            <Navbar />
            <h1 style={{
                textAlign: 'center',
                fontWeight: 900,
                fontSize: 35
            }}>{data.bible.book.name}</h1>
            <p style={{
                fontWeight: 900
            }}
            >{data.bible.book.title}</p>
            {data.bible.book.chapter.verses.map((v) => (
                <p key={v.number}><b>{v.number}</b>. {v.text}</p>
            ))}
            {/* <div className="pt-5">
                <Button variant="outline" size="icon" className="mr-2">
                    <ChevronLeft />
                </Button>
                <Button variant="outline" size="icon">
                    <ChevronRight />
                </Button>
            </div> */}
        </>
    )
}
