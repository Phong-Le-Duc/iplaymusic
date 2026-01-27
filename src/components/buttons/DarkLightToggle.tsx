"use client";
import { LuMoonStar } from "react-icons/lu";
import { GoSun } from "react-icons/go";
import { useThemeMode } from "./ThemeModeContext";
import { useEffect, useState } from "react";

export default function DarkLightToggle() {
    const { mode, setMode } = useThemeMode();
    const [iconTheme, setIconTheme] = useState<"light" | "dark">("light");
    const [pendingTheme, setPendingTheme] = useState<"light" | "dark">("light");

    // Disable for any custom theme
    const isCustom = mode.startsWith("custom_");

    useEffect(() => {
        if (mode === "light" || mode === "dark") {
            setPendingTheme(mode);
            setIconTheme(mode);
        }
    }, [mode]);

    useEffect(() => {
        const iconTimeout = setTimeout(() => setIconTheme(pendingTheme), 100);
        return () => clearTimeout(iconTimeout);
    }, [pendingTheme]);

    const handleToggle = () => {
        if (isCustom) return;
        setMode(pendingTheme === "light" ? "dark" : "light");
    };

    return (
        <label
            className={`flex items-center cursor-pointer ${isCustom ? "opacity-30 cursor-not-allowed" : ""}`}
            title={isCustom ? "Disabled while custom theme is active" : ""}
        >
            <span className="mr-2">Light/Dark</span>
            <input
                type="checkbox"
                checked={pendingTheme === "dark"}
                onChange={handleToggle}
                className="sr-only"
                disabled={isCustom}
            />
            <span
                className={`w-20 h-10 rounded-full relative transition-colors duration-200 ${isCustom ? "bg-gray-400" : "bg-gray-700"}`}
                style={{
                    boxShadow: "inset 0 2px 8px 0 rgba(0,0,0,0.35)",
                    filter: isCustom ? "grayscale(1)" : "none"
                }}
            >
                <span
                    className={`absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow transition-transform duration-200 flex items-center justify-center
                        ${pendingTheme === "dark" ? "translate-x-10 bg-gray-700" : "bg-yellow-300"
                        }`}
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