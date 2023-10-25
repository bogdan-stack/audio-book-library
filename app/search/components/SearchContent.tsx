"use client";

import { Book } from "@/types";
import MediaItem from "@/components/MediaItem";
//import LikeButton from "@/components/LikeButton";
//import useOnPlay from "@/hooks/useOnPlay";


interface SearchContentProps {
  books: Book[];
}

const SearchContent: React.FC<SearchContentProps> = ({
  books
}) => {
  //const onPlay = useOnPlay(Books);

  if (books.length === 0) {
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
            <MediaItem
              onClick={(id: string) => {}}
              data={book}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchContent;