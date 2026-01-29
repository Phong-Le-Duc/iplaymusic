"use client";
import { useRouter, usePathname } from "next/navigation";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

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
    const router = useRouter();
    const pathname = usePathname();

    // Check if we're on a category detail page
    let title = TITLES[pathname] || "iPlayMusic";
    const isCategoryDetail = pathname.startsWith("/categories/") && pathname.split("/").length === 3;
    if (isCategoryDetail) {
        const id = pathname.split("/")[2];
        title = `${decodeURIComponent(id)}`;
    }

    return (
        <header
            className={`sticky top-0 left-0 z-[200] flex justify-between items-center w-full px-4 py-4 mb-4  ${isCategoryDetail ? "text-white" : ""}`}
        >
            <button
                type="button"
                onClick={() => router.back()}
                aria-label="Go back"
                className="p-2 rounded hover:bg-gray-200 transition"
            >
                <IoChevronBackOutline />
            </button>
            <span className="text-2xl">{title}</span>
            <IoIosSearch />
        </header>
    );
}