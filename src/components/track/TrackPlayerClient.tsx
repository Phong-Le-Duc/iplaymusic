"use client";
import { useState } from "react";
import CurrentPlayingTrack from "./currentPlayingTrack";

import type { TrackType } from "@/type";

export default function TrackPlayerClient({ tracks }: { tracks: TrackType[] }) {
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