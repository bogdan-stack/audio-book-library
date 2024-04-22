"use client";

import { Book, Audiobook, Chapter } from "@/types";
import MediaItem from "@/components/MediaItem";
//import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUserAuth";

interface SearchContentProps {
  books: Book[];
  audiobooks: Audiobook[];
  chapters: Chapter[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  books,
  audiobooks,
  chapters
}) => {
  const onPlay = useOnPlay(books);
  const user = useUser();

  if (books.length === 0 || !user) {
    return (
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        Nu a fost găsit nici un Audiobook.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {books.map((book: Book) => (
        <div
          key={book.id}
          className="flex items-center gap-x-4 w-full"
        >
          <div className="flex-1">
          {chapters.map((chapter: Chapter) => (
  <MediaItem
    key={chapter.chapter_id}
    onClick={(id: string) => onPlay(id)}
    data={chapter}
  />
))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchContent;