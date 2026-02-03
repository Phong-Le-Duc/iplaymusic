"use client";

import { useCategoryStateContext } from "./CategoryStateContext";
import { IoChevronForwardOutline } from "react-icons/io5";
import Link from "next/link";

const COLORS = [
    "bg-red-400",
    "bg-orange-400",
    "bg-amber-400",
    "bg-yellow-400",
    "bg-lime-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-sky-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-fuchsia-400",
    "bg-pink-400",
    "bg-rose-400",
];

export default function Category({ id, name, icon, subcategories = [] }) {
    const { openIndex, setOpenIndex } = useCategoryStateContext();

    const URLFriendlyName = name
        .replace(/&/g, "%26")
        .replace(/ /g, "%20")
        .replace(/\//g, "%2F");

    const isOpen = openIndex === id;

    return (
        <>
            <Link href={{
                pathname: `/categories/${URLFriendlyName}`,
                query: { subcategories: JSON.stringify(subcategories) }
            }}>
                <div className="flex flex-col cursor-pointer max-h-[70vh] overflow-y-auto">
                    <div
                        className="flex justify-between items-center p-2 rounded-lg z-10"
                        style={{ backgroundColor: "rgba(150,150,150,0.3)" }}
                    >
                        <div className="flex items-center gap-2 flex-1">
                            {icon && (
                                <img src={icon} alt={name} className="w-8 h-8 rounded" />
                            )}
                            <h4>{name}</h4>
                        </div>
                        {subcategories.length > 0 && (
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setOpenIndex(isOpen ? null : id);
                                }}
                                className={`p-2 rounded-full transition-colors 
                                ${isOpen ? "bg-blue-400" : "bg-blue-300"} hover:bg-blue-400`}
                                style={{
                                    boxShadow: isOpen
                                        ? "inset 0 2px 8px rgba(0,0,0,0.45)"
                                        : undefined,
                                }}
                            >
                                <IoChevronForwardOutline
                                    className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                                />
                            </button>
                        )}
                    </div>
                    {isOpen && subcategories.length > 0 && (
                        <div
                            style={{ marginTop: "-5px", backgroundColor: "rgba(150,150,150,0.1)", maxHeight: "7.7rem" }}
                            className="rounded-b-lg px-4 py-2 overflow-y-auto z-9"
                        >
                            <ul>
                                {subcategories.map((sub, idx) => (
                                    <li key={idx} className="py-1">
                                        <Link
                                            href={{
                                                pathname: `/categories/${encodeURIComponent(sub)}`,
                                            }}
                                            className="hover:underline text-blue-700"
                                        >
                                            {sub}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Link>
        </>
    );
}