"use client";
import { LuMoonStar } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import { useEffect, useState } from "react";

export default function DarkLightToggleTemplate() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [iconTheme, setIconTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        setIconTheme(theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <label className="flex items-center cursor-pointer">
            <span className="mr-2">Light/Dark</span>
            <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={handleToggle}
                className="sr-only"
            />
            <span
                className="w-20 h-10 bg-gray-700 rounded-full relative transition-colors duration-200"
                style={{ boxShadow: "inset 0 2px 8px 0 rgba(0,0,0,0.35)" }}
            >
                <span
                    className={`absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow transition-transform duration-200 flex items-center justify-center
                        ${theme === "dark" ? "translate-x-10 bg-gray-700" : "bg-yellow-300"}
                    `}
                >
                    {iconTheme === "dark" ? (
                        <span
                            className="bg-gray-500 p-[7px] rounded-full border border-gray-800"
                            style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.35)" }}
                        >
                            <LuMoonStar className="text-white text-xl" />
                        </span>
                    ) : (
                        <span
                            className="bg-gray-500 p-[7px] rounded-full border border-gray-800"
                            style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.35)" }}
                        >
                            <GoSun className="text-white text-xl" />
                        </span>
                    )}
                </span>
            </span>
        </label>
    );
}