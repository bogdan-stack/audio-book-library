"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Chapter, Audiobook } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
  data: Chapter;
  onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
  data,
  onClick,
}) => {
  const player = usePlayer();
  const imageUrl = "/images/album3.jpg"

  const handleClick = () => {
    if (onClick) {
      return onClick(data.chapter_id.toString())
      console.log(data.chapter_id.toString());
    }

  console.log(data.chapter_id.toString());
 return player.setId(data.chapter_id.toString());
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex
        items-center
        gap-x-3
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
      "
    >
      <div
        className="
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        "
      >
        <img
          src={imageUrl || "/images/album3.jpg"}
          alt="MediaItem"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white w-32 text-xs">{data.chapter_title}</p>
      </div>
    </div>
  );
}

export default MediaItem;