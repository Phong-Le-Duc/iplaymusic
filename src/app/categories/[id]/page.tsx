// "use client";
import SubCatGallery from "@/components/subCatGallery/SubCatGallery";
import Track from "@/components/track/Track";
import CurrentPlayingTrack from "@/components/track/currentPlayingTrack";
import TrackPlayerClient from "@/components/track/TrackPlayerClient";

import { cookies } from "next/headers";



export default async function CategoryDetailPage({ params }) {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("IPM_AT");

    const { id } = await params;
    const URLDecodedName = id.replace(/%26/g, "&").replace(/%20/g, " ").replace(/%2F/g, "/");

    const res = await fetch(`https://api.spotify.com/v1/search?q=${URLDecodedName}&type=artist`, {
        headers: {
            Authorization: `Bearer ${tokenCookie.value}`,
        }
    });
    const data = await res.json();
    console.log("API response for artists:", data);
    data.artists.items.forEach(artist => {
        console.log(artist.name, artist.genres);
    });
    console.log("THIS" + JSON.stringify(data.artists.items, null, 2));

    // Normalization function for robust genre/category matching
    function normalize(str: string) {
        return str
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[\\/-]/g, " ")
            .replace(/[^a-z0-9 ]/g, "") // remove special characters except spaces
            .replace(/\s+/g, " ")
            .trim();
    }

    // Synonyms for special categories
    const categorySynonyms: Record<string, string[]> = {
        "rnb": ["r&b", "rnb", "r and b", "r n b"],
        "hip hop": ["hip hop", "hip-hop", "rap", "trap", "gangsta rap"],
        "dance electronic": ["dance", "electronic", "edm", "dance electronic", "dance/electronic"],
        "folk and acoustic": ["folk", "acoustic", "folk and acoustic", "folk & acoustic"],
        // Add more as needed
    };

    const normalizedCategory = normalize(URLDecodedName);
    // Find the synonym group that includes the normalized category
    let synonyms = [normalizedCategory];
    for (const arr of Object.values(categorySynonyms)) {
        if (arr.map(normalize).includes(normalizedCategory)) {
            synonyms = arr.map(normalize);
            break;
        }
    }

    const filteredArtists = data.artists.items.filter(artist =>
        artist.genres.some(genre =>
            synonyms.some(syn => normalize(genre).includes(syn))
        )
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
                    Authorization: `Bearer ${tokenCookie.value}`,
                },
            }
        );
        const tracksData = await tracksRes.json();
        allTracks.push(...tracksData.tracks);
    }

    const relevantGenres = ["r&b", "rnb", "folk", "acoustic"];
    data.artists.items.forEach(artist => {
        const matches = artist.genres.filter(genre =>
            relevantGenres.some(g => genre.toLowerCase().includes(g))
        );
        console.log(artist.name, "matches:", matches);
    });

    return (
        <div className="relative h-full bg-transparent flex flex-col w-screen max-w-none left-1/2 right-1/2 -translate-x-1/2">
            <figure className="fixed -top-20 left-0 w-full z-[-100]">
                <img className="w-full" src="/sound-wave.png" alt="sound-wave-background" />
            </figure>
            <header className="sticky top-0 left-0 w-full z-[100]" style={{ background: 'transparent' }}>
                <h4 className="text-white text-center mb-4 pt-4">
                    More Genres
                </h4>
            </header>
            <SubCatGallery
                className="left-0 w-full z-10"
                subcategories={subcategories}
            />
            <div className="mt-8 overflow-y-auto" style={{ height: 'calc(100vh - 350px)' }}>
                {/* Remove this line: */}
                {/* <CurrentPlayingTrack tracks={allTracks} /> */}
                {/* Only use the client component for playback: */}
                <TrackPlayerClient tracks={allTracks} />
            </div>
        </div>
    );
}