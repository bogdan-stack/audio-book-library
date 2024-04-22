"use client";

import usePlayer from "@/hooks/usePlayer";
import useGetChapterById from "@/hooks/useGetChapterById";
import useGetCoverByAudiobookId from "@/hooks/useGetCoverByAudiobookId";
import useGetChapters from "@/hooks/useGetChapters";

import ChapterList from "./ChapterList";
import PlayerContent from "./PlayerContent";
import React, { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

const Player = () => {
  const player = usePlayer();
  const chapter = useGetChapterById(player.activeId);
  const audiobook = useGetCoverByAudiobookId(chapter?.chapter?.audiobook_id);
  const chapters = useGetChapters();
  
  console.log(chapter);
  console.log(chapters)

  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  if (!chapter || !player.activeId) {
    return null;
  }

  return (
    <>
    <div className={`fixed bottom-0 border-rounded-t-2xl border-y border-neutral-600 bg-gradient-to-b from-neutral-900 to-lime-800 w-full py-1 px-3 transition-all duration-500 flex flex-col justify-between items-center ${isExpanded ? 'flex h-96 bottom-0' : 'h-[140px] bottom-0 flex-col justify-between items-center'}`}>
        <button onClick={handleClick} className={`bg-lime-700 hover:bg-lime-700 text-lime-900 font-semibold hover:text-white py-0.5 px-3 border border-lime-800 hover:border-transparent rounded-full ${isExpanded ? 'mt-2 mb-2' : ''}`}>
          {isExpanded ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
    {chapters.chapters && isExpanded && <ChapterList chapters={chapters.chapters} />}
    <div className={`absolute bottom-0 w-full ${isExpanded ? 'bottom-0 p-3' : 'relative'}`}>
    {chapter.chapter && audiobook.audiobook && <PlayerContent key={chapter.chapter.chapter_id} chapter={chapter.chapter} audiobook={audiobook.audiobook} />}
    </div>
  </div >
  
  </>
  );
}

export default Player;