"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Book } from "@/types";
import { useUser } from "@/hooks/useUserAuth";

interface SidebarProps {
    children: React.ReactNode;
    books: Book[]
}


const Sidebar:React.FC<SidebarProps> = ({
    children,
    books
}) => {
const user = useUser();
const pathname = usePathname();

const routes = useMemo(()=> [
    {
        icon: HiHome,
        label: 'Acasă',
        active: pathname !== '/search',
        href: '/'
    },
    ...(user ? [{
        icon: BiSearch,
        label: 'Caută',
        active: pathname === '/search',
        href: '/search'
      }] : [])
    ],[pathname, user]);

    return (
        <div className="flex h-full">
            <div className="
            hidden
            md:flex
            flex-col
            gap-y-2
            bg-black
            h-full
            w-[300px]
            p-2
            "
            >
                <Box>
                    <div
                    className="
                    flex
                    flex-col
                    gaap-y-4
                    px-5
                    py-4
                    "
                    >
                        {routes.map((item) => (
                            <SidebarItem
                            key={item.label}
                            {...item}
                            />
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library books={books}/>
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;