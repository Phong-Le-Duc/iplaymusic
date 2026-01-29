"use client";
import { useState } from "react";
import Track from "./Track";

export default function CurrentPlayingTrack({ tracks }) {
    const [playingId, setPlayingId] = useState(null);

    function handlePlayPause(trackId) {
        setPlayingId(prevId => (prevId === trackId ? null : trackId));
    }

    return (
        <div>
            {tracks.map(track => (
                <Track
                    key={track.id}
                    track={track}
                    isPlaying={playingId === track.id}
                    onPlayPause={() => handlePlayPause(track.id)}
                />
            ))}
        </div>
    );
}