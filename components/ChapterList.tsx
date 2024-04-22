"use client";
import { Chapter } from "@/types";
import ChapterItem from "./ChapterItem";

interface ChapterListProps {
  chapters: Chapter[];
}

const ChapterList: React.FC<ChapterListProps> = (
  { chapters }
) => {
  

  return (
    <>
        <div className="flex h-full overflow-y-auto">
          <ul className="list-none pl-6 pr-6 w-96">
          {chapters.map((chapter) => (
            <ChapterItem key={chapter.chapter_id} title={chapter.chapter_title} />
          ))}
          </ul>
        </div>
  <div className="pb-[70px] border-rounded-t-2xl border-y border-neutral-600">
  </div>
  <div className=" p-3">
  </div>
  </>
  );
};

export default ChapterList;