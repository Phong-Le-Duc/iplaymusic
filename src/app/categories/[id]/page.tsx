// "use client";
import { cookies } from "next/headers";



export default async function CategoryDetailPage({ params }) {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("IPM_AT");

    const { id } = await params;
    const res = await fetch(`https://api.spotify.com/v1/browse/categories/${id}`, {
        headers: {
            Authorization: `Bearer ${accessTokenCookie.value}`,
        }
    });
    const data = await res.json();
    console.log(data);



    return (
        <div className="p-4">
            <h1>Category: {data.name}</h1>
        </div>
    );
}