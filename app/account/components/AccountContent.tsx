"use client";

import { Book } from "@/types";
import MediaItem from "@/components/MediaItem";
//import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUserAuth";
import Button from "@/components/Button";
import useUploadModal from "@/hooks/useUploadModal";


interface SearchContentProps {
}

const AccountContent: React.FC<SearchContentProps> = ({
}) => {
  const user = useUser();
  const uploadModal = useUploadModal();

  const onClick = () => {
    return uploadModal.onOpen();
  }

    return (
        <>
      <div
      className="
      p-5
      justify-items-center
      "
      >
      <div
      className="
      border
      border-neutral-600
      rounded-xl
      p-4"
      >
      <div
        className="
          flex
          flex-col
          pb-4
          w-full
          px-6
          text-neutral-400
          font-semibold
          text-2xl
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
        pb-2
        text-neutral-400
        text-base
      "
    >Nume: <div className=" text-base text-white">{user?.userName}</div>
    </div>
    <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        pb-2
        text-neutral-400
        text-base
      "
    >Email: <div className=" text-base text-white">{user?.userEmail}</div>
    </div>
    <div
      className="
        flex
        flex-col
        gap-y-2
        w-full
        px-6
        pb-2
        text-neutral-400
        text-base
      "
    >Drepturi: <div className=" text-base text-white">{user?.userRole}</div>
    </div>
    </div>
    </div>
    {user?.userRole === "admin" ? (
    <div className=" justify-items-center">
          <div
            className="flex items-center justify-center pb-4 text-neutral-400 font-semibold text-2xl"
          >
            Încarcă Audiobook
          </div>
    <div className="flex items-center justify-center pb-4">
    <Button
      onClick={() => uploadModal.onOpen()}
      className="w-auto px-6 py-2"
    >
      Upload Audiobook!
    </Button>
    </div>
    </div>
    ) : ""}
    </>
    )

}

export default AccountContent;