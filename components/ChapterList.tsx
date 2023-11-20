"use client";

import ChapterItem from "./ChapterItem";

const ChapterList: React.FC = () => {
  const chapters = [
    { title: "Capitolul 1", progress: 100 },
    { title: "Capitolul 2", progress: 65 },
    { title: "Capitolul 3", progress: 10 },
    { title: "Capitolul 4", progress: 10 },
    { title: "Capitolul 5", progress: 10 },
    { title: "Capitolul 6", progress: 10 },
    { title: "Capitolul 7", progress: 10 },
    { title: "Capitolul 8", progress: 10 },
    { title: "Capitolul 9", progress: 10 },
    { title: "Capitolul 10", progress: 10 },
    { title: "Capitolul 11", progress: 10 },
  ]; // Dummy chapters

  return (
    <ul className="list-none p-7 my-1 w-96 overflow-y-auto max-h-[620px]">
      {chapters.map((chapter, index) => (
        <ChapterItem key={index} title={chapter.title} progress={chapter.progress} />
      ))}
    </ul>
  );
};

export default ChapterList;