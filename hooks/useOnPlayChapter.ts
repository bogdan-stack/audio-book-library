import { Book } from "@/types";
import { Chapter } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "@/hooks/useUserAuth";

const useOnPlayChapter = ( chapters: Chapter[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const  user  = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(chapters.map((chapter) => chapter.chapter_id.toString()));
    console.log(chapters.map((chapter) => chapter.chapter_id.toString()));
    console.log(id);
  }

  return onPlay;
};

export default useOnPlayChapter;