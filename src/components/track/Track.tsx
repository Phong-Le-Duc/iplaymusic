"use client";

import { useRef, useEffect, ReactNode } from "react";
import { IoPlayCircleSharp, IoPauseCircleSharp } from "react-icons/io5";


type TrackProps = {
    track: any;
    isPlaying: boolean;
    onPlayPause?: () => void;
    children?: ReactNode;
};

export default function Track({ track, isPlaying, onPlayPause = () => { }, children }: TrackProps) {
    const playerRef = useRef();

    useEffect(() => {
        const audio = playerRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.play().catch(() => { });
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying]);

    // Fallbacks for missing data
    const name = track?.name || "Unknown Title";
    const artists = Array.isArray(track?.artists) && track.artists.length > 0
        ? track.artists
        : [{ id: "unknown", name: "Unknown Artist" }];
    const duration = typeof track?.duration_ms === "number" ? track.duration_ms : 0;

    return (
        <div className="flex justify-between items-center mb-4 p-2 ">
            <div className="flex gap-2 pr-4 items-center">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                    <button onClick={onPlayPause}>
                        {isPlaying ? (
                            <IoPauseCircleSharp className="w-8 h-8 text-red-500" />
                        ) : (
                            <IoPlayCircleSharp className="w-8 h-8 text-red-500" />
                        )}
                    </button>
                    <audio ref={playerRef} src={"/lukerembo-jay.mp3"} preload="auto"></audio>
                    {/* hardcoded dummy audio placeholder since you need Spotify premium membership yo access track  */}
                    {/* https://developer.spotify.com/documentation/web-playback-sdk Spotify Web Playback SDK if you are a premium user */}
                    {/* https://api.spotify.com/v1/tracks/{id} deprecated! */}
                    {/* Audio Preview Clips may not be offered as a standalone service or product. */}
                </div>
                <div>
                    <p className="text-md font-semibold">{name}</p>
                    <p>
                        {artists.map((artist, idx) => (
                            <span key={artist.id || idx} className="text-gray-500 text-sm">
                                {artist.name}
                                {idx < artists.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p>
                    {Math.floor(duration / 60000)}:
                    {Math.floor((duration % 60000) / 1000)
                        .toString()
                        .padStart(2, "0")}
                </p>
                {children}
            </div>
        </div>
    );
}