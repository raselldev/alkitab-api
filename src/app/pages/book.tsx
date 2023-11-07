import { useEffect, useState } from 'react'

type Book = {
    id: number;
    abbr: string;
    name: string;
    chapter: number;
};

type Data = {
    data: Book[];
};

export default function Book() {
    const [data, setData] = useState<Book[]>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch('pages/api/book')
            .then((res) => res.json())
            .then((data: Data) => {
                setData(data.data)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>Please Try Again</p>
    return (
        <div>
            {data.map((book) => (
                <p key={book.id}>{book.name}</p>
            ))}
        </div>
    )
}