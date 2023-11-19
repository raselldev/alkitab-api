import { useEffect, useState } from "react";

type Passage = {
    bible: Bible;
};

type Bible = {
    title: string;
    book: Book;
};

type Book = {
    name: string;
    book_id: string;
    title: string;
    chapter: Chapter;
};

type Chapter = {
    chap: string;
    verses: Verse[];
};

type Verse = {
    number: string;
    title?: string;
    text: string;
};

export default function usePassage(abbreviation: string, number: string) {
    const [data, setData] = useState<Passage | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`api/passage?passage=${abbreviation}&num=${number}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result: Passage = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [abbreviation, number]);

    return { loading, data };
}
