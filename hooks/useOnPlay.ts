import { Book } from "@/types";

import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "@/hooks/useUserAuth";

const useOnPlay = (books: Book[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const  user  = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    player.setId(id);
    player.setIds(books.map((book) => book.id));
  }

  return onPlay;
};

export default useOnPlay;