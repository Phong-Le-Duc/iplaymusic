import Link from "next/link"
import { IoMdMusicalNotes } from "react-icons/io";
import { PiPlaylistLight } from "react-icons/pi";
import { IoPlayCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

export default function FooterWithNav() {
    return (
        <footer className="mt-40 py-4 px-4 shadow-top">
            <nav className="flex justify-around items-center">
                <Link href="/categories" className="flex items-center h-full"><IoMdMusicalNotes /></Link>
                <Link href="/playlist" className="flex items-center h-full"><PiPlaylistLight /></Link>
                <Link href="/music-player" className="flex items-end h-full"><IoPlayCircleSharp className="text-6xl" /></Link>
                <Link href="/profile" className="flex items-center h-full"><CgProfile /></Link>
                <Link href="/settings" className="flex items-center h-full"><IoSettingsOutline /></Link>
            </nav>
        </footer>
    )
}