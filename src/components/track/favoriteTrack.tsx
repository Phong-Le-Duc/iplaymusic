"use client";
import { useEffect, useState, useRef } from "react";
import Track from "./Track";
import { FaRegStar, FaStar } from "react-icons/fa";

type TrackType = {
    id: string;
    // add other properties as needed
};

type PendingRemoval = {
    [trackId: string]: number; // countdown in seconds
};


export default function FavoriteTrack() {
    const [favorites, setFavorites] = useState<TrackType[]>([]);
    const [pendingRemoval, setPendingRemoval] = useState<PendingRemoval>({});

    const timers = useRef<{ [trackId: string]: NodeJS.Timeout }>({});



    useEffect(() => {
        const stored = localStorage.getItem("favoriteTracks");
        if (stored) {
            const parsed = JSON.parse(stored);
            console.log("[FavoriteTrack] setFavorites (load from storage):", parsed);
            setFavorites(parsed);
        } else {
            console.log("[FavoriteTrack] No favorites found in localStorage.");
        }
    }, []);




    const isFavorite = (track: TrackType) =>
        favorites.some((fav) => fav.id === track.id);

    // Start a 5s countdown before removing
    const startRemovalCountdown = (track: TrackType) => {
        setPendingRemoval((prev) => ({ ...prev, [track.id]: 5 }));
        timers.current[track.id] = setInterval(() => {
            setPendingRemoval((prev) => {
                const next = { ...prev };
                if (next[track.id] > 1) {
                    next[track.id] = next[track.id] - 1;
                } else {
                    clearInterval(timers.current[track.id]);
                    delete timers.current[track.id];
                    delete next[track.id];
                    setFavorites((favs) => {
                        const updated = favs.filter((fav) => fav.id !== track.id);
                        console.log("[FavoriteTrack] setFavorites (removal countdown):", updated);
                        return updated;
                    });
                }
                return next;
            });
        }, 1000);
    };

    // Cancel removal if user re-checks the star
    const cancelRemoval = (track: TrackType) => {
        if (timers.current[track.id]) {
            clearInterval(timers.current[track.id]);
            delete timers.current[track.id];
        }
        setPendingRemoval((prev) => {
            const next = { ...prev };
            delete next[track.id];
            return next;
        });
    };

    const handleStarClick = (track: TrackType) => {
        if (pendingRemoval[track.id]) {
            // If already pending removal, cancel it (re-check)
            cancelRemoval(track);
        } else if (isFavorite(track)) {
            // If favorite, start countdown to remove
            startRemovalCountdown(track);
        } else {
            // If not favorite, add immediately
            setFavorites((prev) => {
                const updated = prev.some((fav) => fav.id === track.id) ? prev : [...prev, track];
                console.log("[FavoriteTrack] setFavorites (add):", updated);
                return updated;
            });
        }
    };

    if (favorites.length === 0) {
        return <p>No favorite songs yet.</p>;
    }

    return (
        <div>
            {favorites.map((track) => (
                <div key={track.id}>
                    <Track
                        track={track}
                        isPlaying={false}
                        onPlayPause={() => { }}
                    >
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleStarClick(track);
                            }}
                            aria-label={isFavorite(track) ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isFavorite(track) && !pendingRemoval[track.id] ? (
                                <FaStar className="text-yellow-400" />
                            ) : (
                                <FaRegStar />
                            )}
                        </button>
                        {pendingRemoval[track.id] && (
                            <div className="text-xs text-red-500 mt-1">Removing ({pendingRemoval[track.id]})</div>
                        )}
                    </Track>
                </div>
            ))}
        </div>
    );
}