"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadBookUrl from "@/hooks/useLoadBookUrl";
import useGetBookById from "@/hooks/useGetBookById";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { book } = useGetBookById(player.activeId);

  const bookUrl = useLoadBookUrl(book!);

  if (!book || !bookUrl || !player.activeId) {
    return null;
  }

  return (
    <div
      className="
        fixed
        bottom-0
        bg-black
        w-full
        py-2
        h-[80px]
        px-4
      "
    >
      <PlayerContent key={bookUrl} book={book} bookUrl={bookUrl} />
    </div>
  );
}

export default Player;