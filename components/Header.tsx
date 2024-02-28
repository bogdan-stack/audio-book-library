"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight} from "react-icons/rx";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useUser } from "@/hooks/useUserAuth";



interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();

    const supabaseClient = useSupabaseClient();
    const user = useUser();

const handleRoutes = (route: string) => {
    if (!user){
        toast.error('Trebuie să fii logat pentru a accesa această pagină!');
        router.push('/');
    } else {
        router.push(route);
    }
}

const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
  if (res.ok) {
    console.log(res);
    console.log('Token deleted');
    location.replace('/');
    toast.success('Delogare cu success!');
  } else {
    console.log('Failed to delete token');
    toast.error('Delogare eșuată!');
  }

};



return (
  <div
  className={twMerge(`
    h-fit
    bg-gradient-to-b
    from-lime-700
    p-6
    `,
    className
  )}
  >
    <div className="
    w-full
    mb-4
    flex
    items-center
    justify-between
    ">
        <div className="
        hidden
        md:flex
        gap-x-2
        items-center
        ">
            <button
            onClick={()=> router.back()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
            >
                <RxCaretLeft className="text-white" size={35} />
            </button>
            <button
            onClick={()=> router.forward()}
            className="
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            "
            >
                <RxCaretRight className="text-white" size={35} />
            </button>
        </div>
        <div className="
        flex
        md:hidden
        gap-x-2
        items-center
        ">
            <Link href='#'
            onClick={(e) => {
                e.preventDefault();
                handleRoutes('/')
            }}
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
                <HiHome className="text-black" size={20} />

            </Link>
            <Link href='#'
            onClick={(e) => {
                e.preventDefault();
                handleRoutes('/search')
            }}
            className="
            rounded-full
            p-2
            bg-white
            flex
            items-center
            justify-center
            hover:opacity-75
            transition
            ">
                <BiSearch className="text-black" size={20} />

            </Link>
        </div>
        <div
        className="
        flex
        justify-between
        items-center
        gap-x-4
        "
        >
            {user ? (
                <div
                className="
                flex
                gap-x-4
                items-center
                "
                >
                    <Button
                    onClick={handleLogout}
                    className="bg-white px-6 py-2"
                    >
                        Logout
                    </Button>
                    <Button
                    id="/account"
                    onClick={() => handleRoutes('/account')}
                    className="bg-white"
                    >
                        <FaUserAlt />
                    </Button>
                </div>
            ): (
            <>

            <div>
                <Button
                onClick={authModal.onOpen}
                className="
                bg-lime-600
                text-black
                font-bold
                text-sm
                "
                >
                    Log-in!
                </Button>
            </div>
            </>
            )}
        </div>
    </div>
    {children}
  </div>
);
}

export default Header;