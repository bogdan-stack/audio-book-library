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
        border-rounded-t-2xl
        border-y
        border-neutral-800
        bg-gradient-to-b
        from-neutral-900
        to-lime-800
        to-g
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