"use client";
import { createContext, useContext, useState } from "react";

type ThemeMode = "light" | "dark" | "custom_1" | "custom_2" | "custom_3";
type ThemeModeContextType = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeModeContextType | undefined>(undefined);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>("light");

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