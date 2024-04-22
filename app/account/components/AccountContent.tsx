"use client";

import { Book } from "@/types";
import MediaItem from "@/components/MediaItem";
//import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUserAuth";
import Button from "@/components/Button";
import useUploadModal from "@/hooks/useUploadModal";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/Card";


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
      px-5
      pb-5
      justify-items-center
      "
      >
          <Card>
            <CardHeader>
              <CardTitle>Date Profil</CardTitle>
                <CardDescription>Aici vei găsi toate informațiile despre profilul tău.
                </CardDescription>
            </CardHeader>
              <CardContent className="grid gap-1 font-semibold">
                <h3>Nume:</h3>
                <CardDescription>{user?.userName}</CardDescription>
                <h3>Email:</h3>
                <CardDescription>{user?.userEmail}</CardDescription>
                <h3>Drepturi:</h3>
                <CardDescription>{user?.userRole}</CardDescription>
            </CardContent>
          </Card>
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
      className="w-auto px-3 py-3"
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