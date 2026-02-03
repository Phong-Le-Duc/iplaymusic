"use client";
import { useEffect, useState } from "react";

type TrackType = {
    id: string;
    name: string;
    artists: { name: string }[];
    album?: {
        images?: { url: string }[];
    };
};

export default function FeaturedFavorites() {
    const [favorites, setFavorites] = useState<TrackType[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("favoriteTracks");
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
    }, []);

    const topThree = favorites.slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((track) => (
                <div key={track.id} className="flex flex-col items-center rounded-lg shadow p-4">
                    <img
                        src={track.album?.images?.[0]?.url || "/placeholder.jpg"}
                        alt={track.name}
                        className="w-32 h-32 object-cover rounded mb-2"
                    />
                    <div className="text-center">
                        <h2 className="font-bold text-lg">{track.name}</h2>
                        <p className="text-gray-600">{track.artists.map(a => a.name).join(", ")}</p>
                    </div>
                </div>
            ))}
            {topThree.length === 0 && (
                <p className="col-span-3 text-center text-gray-400">No featured favorites yet.</p>
            )}
        </div>
    );
}