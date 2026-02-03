"use client";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeMode = "light" | "dark" | "custom_1" | "custom_2" | "custom_3";
type ThemeModeContextType = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>("light");

    // Read from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem("themeMode");
        if (stored === "light" || stored === "dark" || stored === "custom_1" || stored === "custom_2" || stored === "custom_3") {
            setMode(stored as ThemeMode);
        }
    }, []);

    // Save to localStorage whenever mode changes
    useEffect(() => {
        localStorage.setItem("themeMode", mode);
    }, [mode]);

    return (
        <ThemeModeContext.Provider value={{ mode, setMode }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error("useThemeMode must be used within a ThemeModeProvider");
    return ctx;
}