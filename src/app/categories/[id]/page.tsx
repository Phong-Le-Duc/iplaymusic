// "use client";
import SubCatGallery from "@/components/subCatGallery/SubCatGallery";
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

    // Spotify category endpoint deprecated, so filtering artists by genre as a workaround!!
    const filteredArtists = data.artists.items.filter(artist =>
        artist.genres.some(genre => genre.toLowerCase().includes(id.toLowerCase()))
    );

    // Step 1: Collect unique genres from filtered artists
    const genreSet = new Set();
    filteredArtists.forEach(artist => {
        artist.genres.forEach(genre => genreSet.add(genre));
    });
    const uniqueGenres = Array.from(genreSet);
    console.log("Unique genres for this category:", uniqueGenres);


    // Step 2: Prepare subcategory data with images
    const subcategories = uniqueGenres.map((genre) => {
        // Find the first artist with this genre and use their image
        const artistWithGenre = filteredArtists.find(artist =>
            artist.genres.includes(genre) && artist.images && artist.images.length > 0
        );
        return {
            name: genre,
            image: artistWithGenre ? artistWithGenre.images[0].url : "/placeholder.png",
        };
    });


    // Fetch top tracks for each filtered artist
    let allTracks = [];
    for (const artist of filteredArtists) {
        const tracksRes = await fetch(
            `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=from_token`,
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

        <div className="relative">
            <figure className="fixed top-0 left-0 w-full z-[-1]">
                <img className="w-full" src="/sound-wave.png" alt="sound-wave-background" />
            </figure>
            <h4 className="text-white text-center mb-7">Sub categories</h4>
            <SubCatGallery
                className=" left-0 w-full z-10"
                subcategories={subcategories}
            />

            <div className=" relative top-40 max-h-[70vh] overflow-y-auto">
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
        </div>
    );
}