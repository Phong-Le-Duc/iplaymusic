import Category from "@/components/category/Category";
import CategoryStateContextProvider from "@/components/category/CategoryStateContext";
import { cookies } from "next/headers";
import type { CategoryType } from "@/type";



// Define core genres to display, matching Spotify's category names exactly
const coreGenres = [
    "Pop",
    "Hip-Hop",
    "Rock",
    "Jazz",
    "Classical",
    "Dance/Electronic",
    "Country",
    "Blues",
    "Metal",
    // "R&B", // temporarily commented out
    // "Folk & Acoustic", // temporarily commented out
    "Soul"
];

// Helper function to fetch subcategories for a category
async function getSubcategories(categoryName: string, token: string) {
    const URLFriendlyName = categoryName.replace(/&/g, "%26").replace(/ /g, "%20").replace(/\//g, "%2F");
    const res = await fetch(
        `https://api.spotify.com/v1/search?q=${URLFriendlyName}&type=artist`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    const data = await res.json();
    console.log("API response for artists:", data);

    function normalize(str: string) {
        return str
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[\\/-]/g, " ")
            .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    const categorySynonyms = {
        "rnb": ["r&b", "rnb", "r and b", "r n b"],
        "hip hop": ["hip hop", "hip-hop", "rap", "trap", "gangsta rap"],
        "dance electronic": ["dance", "electronic", "edm", "dance electronic", "dance/electronic"],
        "folk and acoustic": ["folk", "acoustic", "folk and acoustic", "folk & acoustic"],
    };

    const normalizedCategory = normalize(categoryName);
    let synonyms = [normalizedCategory];
    for (const arr of Object.values(categorySynonyms)) {
        if (arr.map(normalize).includes(normalizedCategory)) {
            synonyms = arr.map(normalize);
            break;
        }
    }

    type Artist = {
        genres: string[];
        [key: string]: any;
    };

    const filteredArtists = data.artists.items.filter((artist: Artist) =>
        artist.genres.some((genre: string) =>
            synonyms.some((syn: string) => normalize(genre).includes(syn))
        )
    );

    const genreSet = new Set();
    filteredArtists.forEach((artist: Artist) => {
        artist.genres.forEach((genre: string) => genreSet.add(genre));
    });
    return Array.from(genreSet);
}

export default async function CategoriesPage() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get("IPM_AT");
    if (!tokenCookie) return;

    const res = await fetch(
        "https://api.spotify.com/v1/browse/categories?limit=50&locale=en_US",
        {
            headers: {
                Authorization: `Bearer ${tokenCookie.value}`,
            },
        }
    );
    const data = await res.json();

    const categories: CategoryType[] = data.categories.items.filter((cat: CategoryType) => coreGenres.includes(cat.name));

    // Fetch subcategories for each category
    const subcategoriesMap: { [key: string]: any[] } = {};
    for (const cat of categories) {
        subcategoriesMap[cat.id] = await getSubcategories(cat.name, tokenCookie.value);
    }

    return (
        <>
            <header className="sticky top-0 z-10  flex items-center">
                {/* ...header content... */}
            </header>
            <div className="h-[calc(100vh-4rem)] overflow-y-auto pt-4 hide-scrollbar">
                <CategoryStateContextProvider>
                    <div className="flex flex-col gap-4 pb-30">
                        {categories.map((cat: CategoryType) => (
                            <Category
                                id={cat.id}
                                key={cat.id}
                                name={cat.name}
                                icon={cat.icon}
                                subcategories={subcategoriesMap[cat.id]}
                            />
                        ))}
                    </div>
                </CategoryStateContextProvider>
            </div>
        </>
    );
}