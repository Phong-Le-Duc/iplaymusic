"use client";
import { useThemeMode } from "./ThemeModeContext";
import { useEffect, useRef } from "react";

const customThemes = [
    { key: "custom_1", label: "custom_1" },
    { key: "custom_2", label: "custom_2" },
    { key: "custom_3", label: "custom_3" },
] as const;

export default function ThemeToggle() {
    const { mode, setMode } = useThemeMode();
    const previousTheme = useRef<"light" | "dark" | null>(null);

    // Store previous theme when switching to any custom theme
    useEffect(() => {
        if (mode.startsWith("custom_")) {
            const current = document.documentElement.getAttribute("data-theme");
            if (current === "light" || current === "dark") {
                previousTheme.current = current;
            }
            document.documentElement.setAttribute("data-theme", mode);
        } else if (mode === "light" || mode === "dark") {
            document.documentElement.setAttribute("data-theme", mode);
        }
    }, [mode]);

    // Handler for toggling custom themes
    const handleCustomToggle = (custom: "custom_1" | "custom_2" | "custom_3") => {
        if (mode === custom) {
            setMode(previousTheme.current ?? "light");
        } else {
            setMode(custom);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            {customThemes.map(({ key, label }) => (
                <label key={key} className="flex items-center cursor-pointer">
                    <span className="mr-2">{label}</span>
                    <input
                        type="checkbox"
                        checked={mode === key}
                        onChange={() => handleCustomToggle(key)}
                        className="sr-only"
                    />
                    <span
                        className={`w-20 h-10 bg-gray-700 rounded-full relative transition-colors duration-200`}
                        style={{ boxShadow: "inset 0 2px 8px 0 rgba(0,0,0,0.35)" }}
                    >
                        <span
                            className={`absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow transition-transform duration-200 flex items-center justify-center
                                ${mode === key ? "translate-x-10 bg-gray-700" : "bg-yellow-300"}
                            `}
                        >
                            <span className="bg-gray-500 p-[7px] rounded-full border border-gray-800 flex items-center justify-center w-full h-full"
                                style={{ boxShadow: "0 4px 16px 0 rgba(0,0,0,0.35)" }}
                            >
                                <span className="text-white text-[10px] font-bold select-none">
                                    {mode === key ? "ON" : "OFF"}
                                </span>
                            </span>
                        </span>
                    </span>
                </label>
            ))}
        </div>
    );
}