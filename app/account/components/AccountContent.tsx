"use client";

import { Book } from "@/types";
import MediaItem from "@/components/MediaItem";
//import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";


interface SearchContentProps {
  books: Book[];
}

const AccountContent: React.FC<SearchContentProps> = ({
  books
}) => {
  
    return (
        <>
      <div
        className="
          flex
          flex-col
          gap-y-2
          w-full
          px-6
          text-neutral-400
        "
      >
        Date Profil
      </div>
      <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        text-neutral-400
        text-sm
      "
    >Nume: 
    </div>
    </>
    )
 
}

export default AccountContent;