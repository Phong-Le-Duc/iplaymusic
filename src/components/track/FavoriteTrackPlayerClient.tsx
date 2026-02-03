"use client";
import { useState } from "react";
import FavoriteTrack from "./favoriteTrack";

export default function FavoriteTrackPlayerClient() {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const handlePlayPause = (trackId: string) => {
        setPlayingId((prev) => (prev === trackId ? null : trackId));
    };

    return (
        <FavoriteTrack
            playingId={playingId}
            handlePlayPause={handlePlayPause}
        />
    );
}