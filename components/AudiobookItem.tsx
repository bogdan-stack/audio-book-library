"use client";

import { Book } from "@/types";
import { Audiobook, Chapter } from "@/types";

import Image from "next/image";
import PlayButton from "./PlayButton";


interface AudiobookItemProps {
  audiobookData: Audiobook;
  chapterData?: Chapter;
  onClick: (id: string) => void
};

const AudiobookItem: React.FC<AudiobookItemProps> = ({
  audiobookData,
  chapterData,
  onClick
}) => {
  const imagePath = audiobookData.cover_path;
  return (
    <div
    onClick={() => {
      if (chapterData) {
        onClick(chapterData.chapter_id.toString())
      }
    }}
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
          <img
          className="object-cover"
          src={imagePath || '/images/album3.jpg'}
          alt="Image"
          />
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">
              {audiobookData.audiobook_title}
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

export default AudiobookItem;