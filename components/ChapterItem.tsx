"use client";

interface ChapterItemProps {
  title: string;

}

const ChapterItem: React.FC<ChapterItemProps> = ({title}) => {
  return (
    <div className="border rounded-lg  border-neutral-600 p-2 m-2 shadow-lg bg-neutral-800 transform transition-transform duration-200 hover:scale-105 hover:bg-neutral-900">
      <h2 className="text-md font-semi-bold mb-1">{title}</h2>
      <div className="h-2 relative max-w-xl rounded-full overflow-hidden">
      </div>
    </div>
  );
};

export default ChapterItem;