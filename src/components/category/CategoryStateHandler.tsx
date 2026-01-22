"use client";

import { useState } from "react";


export default function CategoryStateHandler({ children }) {

    const [isOpen, setIsOpen] = useState(false);

    return (

        { children }

    )
}