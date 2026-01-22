"use client";
import Category from "@/components/category/Category";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";


export default function CategoriesPage() {
    const accessToken = Cookies.get("IPM_AT");
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            if (!accessToken) return;
            const res = await fetch(
                "https://api.spotify.com/v1/browse/categories?limit=50",
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const data = await res.json();
            setCategories(data.categories.items);
        }
        fetchCategories();
    }, [accessToken]);

    return (
        <>
            {/* <h1 className="">Categories</h1> */}
            <div className="flex flex-col gap-4">
                {categories.map((cat) => (
                    <Category
                        id={cat.id}
                        key={cat.id} // key er til react
                        name={cat.name}
                        icon={cat.icons[0]?.url}
                        subcategories={["Subcat 1", "Subcat 2"]} // <-- Add this for testing
                    // index={idx}
                    />
                ))}
            </div>
        </>
    );
}