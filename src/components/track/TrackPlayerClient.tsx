"use client";
import { useState } from "react";
import CurrentPlayingTrack from "./currentPlayingTrack";

export default function TrackPlayerClient({ tracks }) {
    const [playingId, setPlayingId] = useState<string | null>(null);

    const handlePlayPause = (trackId: string) => {
        setPlayingId((prev) => (prev === trackId ? null : trackId));
    };

    return (
        <CurrentPlayingTrack
            tracks={tracks}
            playingId={playingId}
            handlePlayPause={handlePlayPause}
        />
    );
}