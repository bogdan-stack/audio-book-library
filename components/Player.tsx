"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadBookUrl from "@/hooks/useLoadBookUrl";
import useGetBookById from "@/hooks/useGetBookById";

import ChapterList from "./ChapterList";
import PlayerContent from "./PlayerContent";
import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Player = () => {
  const player = usePlayer();
  const { book } = useGetBookById(player.activeId);
  const bookUrl = useLoadBookUrl(book!);

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (!book || !bookUrl || !player.activeId) {
    return null;
  }

  return (
    <div className={`fixed bottom-0 border-rounded-t-2xl border-y border-neutral-600 bg-gradient-to-b from-neutral-900 to-lime-800 w-full py-1 px-3 transition-all duration-500 flex flex-col justify-between items-center ${isExpanded ? 'flex h-96 bottom-0' : 'h-[90px] bottom-0'}`}>
        <button onClick={handleClick} className={`bg-transparent hover:bg-lime-700 text-lime-800 font-semibold hover:text-white py-0.5 px-3 border border-lime-800 hover:border-transparent rounded-full ${isExpanded ? 'mt-2 mb-2' : ''}`}>
          {isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
    {isExpanded && <ChapterList />}
    <div className={`absolute bottom-0 w-full ${isExpanded ? 'bottom-0' : 'relative'}`}>
      <PlayerContent key={bookUrl} book={book} bookUrl={bookUrl} />
    </div>
  </div>
  );
}

export default Player;