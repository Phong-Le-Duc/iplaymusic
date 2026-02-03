"use client";

import { createContext, useContext, useState } from "react";

// Create the context
import type { CategoryStateContextType } from "@/type";
const CategoryStateContext = createContext<CategoryStateContextType | undefined>(undefined);

// Custom hook for easy access
export function useCategoryStateContext() {
    return useContext(CategoryStateContext);
}

// Provider component
export default function CategoryStateContextProvider({ children }: { children: React.ReactNode }) {
    // Store the index or id of the open subcategory
    const [openIndex, setOpenIndex] = useState<string | number | null>(null);

    return (
        <CategoryStateContext.Provider value={{ openIndex, setOpenIndex }}>
            {children}
        </CategoryStateContext.Provider>
    );
}