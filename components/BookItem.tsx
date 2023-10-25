"use client";

import { Book } from "@/types";
import  useLoadImage from "@/hooks/useLoadImage";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface BookItemProps {
  data: Book;
  onClick: (id: string) => void
};

const BookItem: React.FC<BookItemProps> = ({
  data,
  onClick
}) => {
  const imagePath = useLoadImage(data);
  return (
    <div
    onClick={() => onClick(data.id)}
    className="
    relative
    group
    flex
    flex-col
    items-center
    justify-center
    rounded-md
    overflow-hidden
    gap-x-4
    bg-neutral-400/5
    cursor-pointer
    hover:bg-neutral-400/10
    transition
    p-3
    "
    >
        <div
        className="
        relative
        aspect-square
        w-full
        h-full
        rounded-md
        overflow-hidden
        ">
          <Image
          className="object-cover"
          src={imagePath || '/images/album3.jpg'}
          fill
          alt="Image"
          />
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">
              {data.denumire}
            </p>
          </div>
          <div className="
          absolute
          bottom-14
          right-5
          ">
            <PlayButton />
          </div>
    </div>
  );
}

export default BookItem;