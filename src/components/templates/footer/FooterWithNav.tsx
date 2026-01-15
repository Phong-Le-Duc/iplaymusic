import Link from "next/link"

export default function Footer() {

    return (
        <footer>
            <nav className="flex flex-col bg-blue-500">
                <Link href="/page_1">Page_1</Link>
                <Link href="/page_2">Page_2</Link>
                <Link href="/page_3">Page_3</Link>
                <Link href="/page_4">Page_4</Link>
                <Link href="/page_5">Page_5</Link>
            </nav>
        </footer>
    )
}