import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react'

type Book = {
    id: number;
    abbr: string;
    name: string;
    chapter: number;
};

type Data = {
    data: Book[];
};

type ModalType = {
    children?: ReactNode
    isOpen: Boolean
    toggle: () => void
}



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
                <Dialog key={book.id}>
                    <DialogTrigger asChild>
                        <Button
                            style={{ margin: '3px', textAlign: 'left' }}
                            variant="outline">
                            {book.name}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{book.name}</DialogTitle>
                            <DialogDescription>
                                {Array.from({ length: book.chapter }, (_, index) => (
                                    <Button
                                        style={{ margin: '2px', width: '10%' }}
                                        key={index}>{index + 1}</Button>
                                ))}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}