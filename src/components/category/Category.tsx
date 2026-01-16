"use client";

import { useState } from "react";
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
    const [open, setOpen] = useState(false);

    return (
        <Link href={`/categories/${name}`}>
            <div className="flex flex-col cursor-pointer max-h-[70vh] overflow-y-auto">
                <div className="flex justify-between items-center p-2 bg-amber-500 rounded-lg">
                    <div className="flex items-center gap-2">
                        {icon && (
                            <img src={icon} alt={name} className="w-8 h-8 rounded" />
                        )}
                        <h4>{name}</h4>
                    </div>
                    {subcategories.length > 0 && (
                        <button
                            type="button"
                            onClick={e => {
                                e.preventDefault(); // Prevents navigating when toggling subcategories
                                setOpen(prev => !prev);
                            }}
                        >
                            <IoChevronForwardOutline />
                        </button>
                    )}
                </div>
                {open && subcategories.length > 0 && (
                    <div className="bg-amber-100 rounded-b-lg px-4 py-2">
                        <ul>
                            {subcategories.map((sub, idx) => (
                                <li key={idx} className="py-1">{sub}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Link>
    );
}