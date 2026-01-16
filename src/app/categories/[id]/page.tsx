// "use client";
import { cookies } from "next/headers";
import { IoPlayCircleSharp } from "react-icons/io5";


export default async function CategoryDetailPage({ params }) {
    const cookieStore = await cookies();
    const accessTokenCookie = cookieStore.get("IPM_AT");

    const { id } = await params;
    const res = await fetch(`https://api.spotify.com/v1/search?q=${id}&type=artist`, {
        headers: {
            Authorization: `Bearer ${accessTokenCookie.value}`,
        }
    });
    const data = await res.json();
    console.log(data);

    const filteredArtists = data.artists.items.filter(artist =>
        artist.genres.some(genre => genre.toLowerCase().includes(id.toLowerCase()))
    );



    // Fetch top tracks for each filtered artist
    let allTracks = [];
    for (const artist of filteredArtists) {
        const tracksRes = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=DK`,
            {
                headers: {
                    Authorization: `Bearer ${accessTokenCookie.value}`,
                },
            }
        );
        const tracksData = await tracksRes.json();
        allTracks.push(...tracksData.tracks);
    }

    return (
        <div className="max-h-[70vh] overflow-y-auto">
            {allTracks.map((track) => (
                <div key={track.id} className="flex justify-between items-center mb-4 p-2 ">
                    <div className="flex gap-2 pr-4 items-center">
                        <div className="w-10 h-10 shrink-0 flex items-center justify-center">
                            <IoPlayCircleSharp className="w-8 h-8 text-red-500" />
                        </div>
                        <div>
                            <p className="text-md font-semibold">{track.name}</p>
                            <p>
                                {track.artists.map((artist, idx) => (
                                    <span key={artist.id} className="text-gray-500 text-sm">
                                        {artist.name}
                                        {idx < track.artists.length - 1 ? ", " : ""}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    <p>
                        {Math.floor(track.duration_ms / 60000)}:{(Math.floor((track.duration_ms % 60000) / 1000)).toString().padStart(2, "0")}
                    </p>

                </div>
            ))}
        </div>
    );
}