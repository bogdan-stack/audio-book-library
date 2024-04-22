import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

import { Chapter } from "@/types";


const useChapters = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const getChapters = async () => {

      const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/allChapters`);
      if (!response.ok) {
        return toast.error('Failed to fetch chapter');
      }
      const data = await response.json();
      setChapters(data as Chapter[]);
      toast.success('Chapters fetched successfully: UseGetChapters');
    }
    getChapters();
  },[]);

  return useMemo(() => ({
    chapters
  }), [chapters]);
};

export default useChapters;