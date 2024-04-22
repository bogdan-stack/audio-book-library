"use client";
import { Book, Chapter } from "@/types";
import { Audiobook} from "@/types";
import BookItem from "@/components/BookItem";
import AudiobookItem from "@/components/AudiobookItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUserAuth";
import useOnPlayChapter from "@/hooks/useOnPlayChapter";

interface PageContentProps {
    books: Book[];
    audiobooks: Audiobook[];
    chapters: Chapter[];
}

const PageContent: React.FC<PageContentProps> = ({
    books,
    audiobooks,
    chapters
}) => {
    const onPlay = useOnPlayChapter(chapters);
    const user = useUser();
    const mergedData = audiobooks.map(audiobook => {
        const chapter = chapters.find(chapter => chapter.audiobook_id === audiobook.audiobook_id);
        return { audiobook, chapter };
      });

    if (audiobooks.length === 0 || !user) {
        return (
        <div className="
        mt-4
        text-neutral-400
        ">
            Nici un audiobook disponibil!
        </div>
        )
    }
  return (
    <>
    <div
    className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4
    "
    >
    {books.map((item) => (
        <BookItem
            key={item.id}
            onClick={(id:string) => onPlay(id)}
            data={item}
        />
    ))}
    </div>

    <div
    className="
    grid
    grid-cols-2
    sm:grid-cols-3
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-8
    gap-4
    mt-4
    "
    >
    {mergedData.map((item) => (
        <AudiobookItem
            key={item.audiobook.audiobook_id}
            onClick={(id:string) => onPlay(id)}
            audiobookData={item.audiobook}
            chapterData={item.chapter}
        />
    ))}
    </div>

    </>
  )
}

export default PageContent