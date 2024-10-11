"use client"

import Navbar from "@/components/Navbar"
import usePassage from "@/hooks/usePassage"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function Home() {
  const router = useSearchParams()
  const abbr = router.get("book") as string
  const num = parseInt(router.get("number") as string)

  const { loading, data } = usePassage(abbr, num.toString())
  if (loading) return <span className="loading loading-spinner loading-lg"></span>
  if (!data || !data.bible) return <p>Data is undefined or null.</p>

  return (
    <>
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          fontWeight: 900,
          fontSize: 35,
        }}
      >
        {data.bible.book.name}
      </h1>
      <p
        style={{
          fontWeight: 900,
        }}
      >
        {data.bible.book.title}
      </p>
      {data.bible.book.chapter.verses.map((v) => (
        <p key={v.number}>
          <b>{v.number}</b>. {v.text}
        </p>
      ))}
      <div className="pt-5">
        {num > 1 ? (
          <>
            <Link
              href={{ pathname: '/passage', query: { book: abbr, number: num - 1 } }}
            >
              <button>
                <ChevronLeft />
              </button>
            </Link>

            <Link
              href={{ pathname: '/passage', query: { book: abbr, number: num + 1 } }}
            >
              <button>
                <ChevronRight />
              </button>
            </Link>
          </>
        ) : (
          <Link
            href={{ pathname: '/passage', query: { book: abbr, number: num + 1 } }}
          >
            <button>
              <ChevronRight />
            </button>
          </Link>
        )}
      </div>
    </>
  )
}
