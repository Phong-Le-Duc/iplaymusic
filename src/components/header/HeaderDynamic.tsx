"use client";
// import Link from "next/link";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {

    "/": "Featured",
    "/categories": "Categories",
    "/playlist": "Playlist",
    "/music-player": "Music Player",
    "/profile": "Profile",
    "/settings": "Settings",
    // Add more routes and titles as needed
};

export default function HeaderDynamic() {
    const pathname = usePathname();
    const title = TITLES[pathname] || "iPlayMusic";

    return (
        <header className="flex justify-between items-center w-full px-4 py-4 mb-4">
            <IoChevronBackOutline />
            <span className="text-2xl">{title}</span>
            <IoIosSearch />
        </header>
    );
}