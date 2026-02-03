import Link from "next/link"
import { IoMdMusicalNotes } from "react-icons/io";
import { PiPlaylistLight } from "react-icons/pi";
import { IoPlayCircleSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";

export default function FooterWithNav() {
    return (
        <footer className="mt-8 py-4 px-4 shadow-top bg-white">
            <nav className="flex justify-around items-center">
                <Link href="/playlist" className="flex items-center h-full text-2xl"><PiPlaylistLight /></Link>
                <Link href="/categories" className="flex items-center h-full text-5xl "><IoMdMusicalNotes /></Link>
                {/* <Link href="/music-player" className="flex items-end h-full"><IoPlayCircleSharp className="text-6xl" /></Link> */}
                <Link href="/profile" className="flex items-center h-full text-2xl"><CgProfile /></Link>
                {/* <Link href="/featured" className="flex items-center h-full"><IoSettingsOutline /></Link> */}
            </nav>
        </footer>
    )
}