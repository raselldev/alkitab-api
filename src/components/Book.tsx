import useBook, { BookType } from '@/hooks/useBook';
import { useState } from 'react';
import Link from 'next/link';

export default function Book() {
    const { loading, data } = useBook();
    const [selectedBook, setSelectedBook] = useState<BookType | null>(null); // Store the selected book object

    const openModal = (book: BookType) => {
        setSelectedBook(book); // Set the selected book
        const modal = document.getElementById('bookModal') as HTMLDialogElement;
        if (modal) {
            modal.showModal();
        }
    };

    if (loading) return <span className="loading loading-spinner loading-lg"></span>
    if (!data) return <p>Please Try Again</p>

    return (
        <div className='container mx-auto grid grid-cols-3 xs:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {data.map((book: BookType) => (
                <div key={book.id}>
                    <button className='btn btn-primary btn-block btn-md hover:btn-secondary'
                        onClick={() => openModal(book)}>
                        {book.name}
                    </button>
                </div>
            ))}

            {/* Modal */}
            <dialog id="bookModal" className="modal">
                <div className="modal-box container mx-auto">
                    <h3 className="font-bold text-lg text-center m-2 pb-2">{selectedBook ? selectedBook.name : "No book selected"}</h3>

                    <div className='container mx-auto grid grid-cols-6 gap-4'>
                        {selectedBook?.chapter && Array.from({ length: selectedBook.chapter }, (_, index) => (
                            <Link
                                key={index}
                                href={{ pathname: '/passage', query: { book: selectedBook.abbr, number: index + 1 } }}
                            >
                                <button className='btn btn-md btn-outline btn-neutral btn-block'>
                                    {index + 1}
                                </button>
                            </Link>
                        ))}
                    </div>
                    <p className="text-left text-xs pt-4">Press ESC key or click outside to close</p>
                </div>

                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </dialog>
        </div>
    );
}
