"use client";
import { useState, useEffect } from "react";
import Track from "./Track";
import { FaRegStar, FaStar } from "react-icons/fa";

type TrackType = {
    id: string;
    name: string;
    artists: { id: string; name: string }[];
    duration_ms: number;
    // add other properties as needed
};

type Props = {
    tracks: TrackType[];
    playingId: string | null;
    handlePlayPause: (trackId: string) => void;
};

const FAVORITES_KEY = "favoriteTracks";

const CurrentPlayingTrack: React.FC<Props> = ({ tracks, playingId, handlePlayPause }) => {
    const [favorites, setFavorites] = useState<TrackType[]>([]);

    // Load favorites from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(FAVORITES_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    console.log("[CurrentPlayingTrack] setFavorites (load from storage):", parsed);
                    setFavorites(parsed);
                }
            } catch {
                // Do not clear favorites on parse error; just log
                console.warn("[CurrentPlayingTrack] Failed to parse favorites from localStorage.");
                setFavorites([]);
            }
        }
    }, []);


    // Helper to check if a track is already a favorite
    const isFavorite = (track: TrackType) =>
        favorites.some((fav) => fav.id === track.id);

    // Add or remove a track from favorites
    const toggleFavorite = (track: TrackType) => {
        setFavorites((prev) => {
            let updated;
            if (prev.some((fav) => fav.id === track.id)) {
                // If already favorite, remove it
                updated = prev.filter((fav) => fav.id !== track.id);
            } else {
                // If not favorite, add it
                updated = [...prev, track];
            }
            console.log("[CurrentPlayingTrack] setFavorites (toggleFavorite):", updated);
            localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div>
            {tracks.map((track) => (
                <Track
                    key={track.id}
                    track={track}
                    isPlaying={playingId === track.id}
                    onPlayPause={() => handlePlayPause(track.id)}
                >
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(track);
                        }}
                        aria-label={isFavorite(track) ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite(track) ? (
                            <FaStar className="text-yellow-400" />
                        ) : (
                            <FaRegStar />
                        )}
                    </button>
                </Track>
            ))}
        </div>
    );
};

export default CurrentPlayingTrack;