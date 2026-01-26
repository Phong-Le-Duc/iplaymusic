"use client";

import { createContext, useContext, useState } from "react";

// Create the context
const CategoryStateContext = createContext();

// Custom hook for easy access
export function useCategoryStateContext() {
    return useContext(CategoryStateContext);
}

// Provider component
export default function CategoryStateContextProvider({ children }) {
    // Store the index or id of the open subcategory
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <CategoryStateContext.Provider value={{ openIndex, setOpenIndex }}>
            {children}
        </CategoryStateContext.Provider>
    );
}