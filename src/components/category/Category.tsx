"use client";

import { useState } from "react";
import { IoChevronForwardOutline } from "react-icons/io5";
import Link from "next/link";

export default function Category({ id, name, icon, subcategories = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <Link href={`/categories/${id}`}>
            <div className="flex flex-col cursor-pointer">
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