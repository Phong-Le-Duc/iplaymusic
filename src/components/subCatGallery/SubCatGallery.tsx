"use client";

import { useRef, useEffect, useState } from "react";

export default function SubCatGallery({ className = "", subcategories = [] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [centerIndex, setCenterIndex] = useState(0);

    // Number of clones at each end for seamless looping
    const CLONE_COUNT = 3;
    const total = subcategories.length;
    // Create clones for start and end
    const clonesStart = subcategories.slice(-CLONE_COUNT);
    const clonesEnd = subcategories.slice(0, CLONE_COUNT);
    const displaySubcats = [...clonesStart, ...subcategories, ...clonesEnd];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;

            let minDistance = Infinity;
            let closestIdx = 0;

            Array.from(container.children).forEach((child, idx) => {
                const childRect = (child as HTMLElement).getBoundingClientRect();
                const childCenter = childRect.left + childRect.width / 2;
                const distance = Math.abs(containerCenter - childCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIdx = idx;
                }
            });

            setCenterIndex(closestIdx);

            // Circular logic: if at clones, reset scroll position
            if (container.scrollLeft === 0 && container.children.length > 0) {
                // At the very start (clonesStart), jump to real items
                const itemWidth = container.children[0].clientWidth + 8; // 8px margin
                container.scrollLeft = itemWidth * total;
            } else if (
                container.scrollLeft + container.offsetWidth >= container.scrollWidth && container.children.length > 0
            ) {
                // At the very end (clonesEnd), jump to real items
                const itemWidth = container.children[0].clientWidth + 8;
                container.scrollLeft = itemWidth * CLONE_COUNT;
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll, { passive: true });
            // On mount, jump to first real item
            setTimeout(() => {
                if (container.children.length > 0) {
                    const itemWidth = container.children[0].clientWidth + 8;
                    container.scrollLeft = itemWidth * CLONE_COUNT;
                }
            }, 0);
            handleScroll();
        }
        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, [total]);

    return (
        <div
            ref={containerRef}
            className={`w-full h-36 overflow-x-auto flex flex-row snap-x snap-mandatory ${className}`}
        >
            {displaySubcats.map((subcat, i) => (
                <div
                    key={subcat.name + '-' + i}
                    className="bg-black snap-center rounded flex-shrink-0 transition-transform transition-opacity duration-300 flex flex-col items-center justify-center"
                    style={{
                        width: "7rem",
                        height: "7rem",
                        transform: i === centerIndex ? "scale(1.2)" : "scale(0.8)",
                        opacity: i === centerIndex ? 1 : 0.5,
                        margin: "0 0.25rem",
                        backgroundImage: `url(${subcat.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <span
                        className="text-white text-xs px-2 py-1 rounded mt-2 w-full flex justify-center items-center"
                        style={{ background: "rgba(0,0,0,0.5)" }}
                    >
                        {subcat.name}
                    </span>
                </div>
            ))}
        </div>
    );
}