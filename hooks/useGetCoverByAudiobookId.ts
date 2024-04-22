import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Audiobook, Chapter } from "@/types";


const useGetCoverByAudiobookId = (chapter: number | undefined) => {
  const [audiobook, setAudiobook] = useState<Audiobook | undefined>(undefined);

  useEffect(() => {
    if (!chapter) {
      return;
    }


    const getChapterById = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/audiobook?audiobook_id=${chapter}`);
      if (!response.ok) {
        return toast.error('Failed to fetch chapter');
      }
      const data = await response.json();
      setAudiobook(data[0] as Audiobook);
      toast.success('Chapter fetched successfully: ' + data);
    }
    getChapterById();
  }, [chapter]);

  return useMemo(() => ({
    audiobook
  }), [audiobook]);
};

export default useGetCoverByAudiobookId;