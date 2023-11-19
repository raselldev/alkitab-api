/**
 * The `useBook` function is a custom React hook that fetches book data from an API and returns the
 * loading state and book data.
 * @returns The `useBook` function returns an object with two properties: `loading` and `data`.
 */
import { useEffect, useState } from "react";

export default function useBook() {
    const [data, setData] = useState<Book[]>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('/api/book')
            .then((res) => res.json())
            .then((data: Data) => {
                setData(data.data)
                setLoading(false)
            })
    }, [])

    return { loading, data }
}

type Book = {
    id: number;
    abbr: string;
    name: string;
    chapter: number;
};

type Data = {
    data: Book[];
};