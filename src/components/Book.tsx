import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useBook from '@/hooks/useBook';
import { DialogTrigger } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';


export default function Book() {
    const { loading, data } = useBook()
    if (loading) return <Skeleton className="w-[100%] h-[20px] rounded-full" />
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
                                    <Link key={index} href={{ pathname: '/passage', query: { book: book.abbr, number: index + 1 } }}>
                                        <Button
                                            style={{ margin: '2px', width: '10%' }}
                                        >{index + 1}
                                        </Button>
                                    </Link>
                                ))}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}