import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Chapter } from "@/types";


const useChapterById = (id?: string) => {
  const [chapter, setChapter] = useState<Chapter | undefined>(undefined);

  useEffect(() => {
    if (!id) {
      return;
    }


    const getChapterById = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/chapter?chapter_id=${id}`);
      if (!response.ok) {
        return toast.error('Failed to fetch chapter');
      }
      const data = await response.json();
      setChapter(data[0] as Chapter);
      toast.success('Chapter fetched successfully: ' + data[0]);
    }
    getChapterById();
  }, [id]);

  return useMemo(() => ({
    chapter
  }), [chapter]);
};

export default useChapterById;