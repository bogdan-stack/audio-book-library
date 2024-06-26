"use client";

import { TbPlaylist} from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import  useAuthModal  from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUserAuth";
import useUploadModal from "@/hooks/useUploadModal";
import { Book } from "@/types";
import MediaItem from "./MediaItem";

interface LibraryProps {
    books: Book[];
}

const Library: React.FC<LibraryProps> = ({
    books
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const  user  = useUser();

    const onClick = () => {
        if (!user || user.userRole === "user") {
            return authModal.onOpen();
        } else if (user.userRole === "admin") {
            return uploadModal.onOpen();
        }

    };
    return (
        <div className="flex flex-col">
            <div
            className="
            flex
            items-center
            justify-between
            px-5
            pt-4
            "
            >
            <div
              className="
              inline-flex
              items-center
              gap-x-2
             "
            >
             <TbPlaylist className="text-neutral-400" size={26}/>
                        <p
                        className="
                        text-neutral-400
                        font-medium
                        text-md"
                        >Biblioteca Ta
                    </p>
                </div>
                <AiOutlinePlus
                onClick={onClick}
                size={20}
                className="
                text-neutral-400
                cursor-pointer
                hover:text-white
                transition"
                />
            </div>
            <div
            className="
            flex
            flex-col
            gap-y-2
            mt-4
            px-3
            ">
                Test !
            </div>
        </div>
    );
}

export default Library;
