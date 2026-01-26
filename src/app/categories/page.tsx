import Category from "@/components/category/Category";
import CategoryStateContextProvider from "@/components/category/CategoryStateContext";
import { cookies } from "next/headers";



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
async function getSubcategories(categoryName, token) {
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

    function normalize(str) {
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

    const filteredArtists = data.artists.items.filter(artist =>
        artist.genres.some(genre =>
            synonyms.some(syn => normalize(genre).includes(syn))
        )
    );

    const genreSet = new Set();
    filteredArtists.forEach(artist => {
        artist.genres.forEach(genre => genreSet.add(genre));
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
    const categories = data.categories.items.filter((cat) => coreGenres.includes(cat.name));

    // Fetch subcategories for each category
    const subcategoriesMap = {};
    for (const cat of categories) {
        subcategoriesMap[cat.id] = await getSubcategories(cat.name, tokenCookie.value);
    }

    return (
        <>
            {/* <h1 className="">Categories</h1> */}
            <div
                className="min-h-screen w-full bg-cover bg-center"
                style={{
                    backgroundImage: "url('/background_2.png')"
                }}
            >
                <CategoryStateContextProvider>
                    <div className="flex flex-col gap-4 pb-30">
                        {categories.map((cat) => (
                            <Category
                                id={cat.id}
                                key={cat.id}
                                name={cat.name}
                                icon={cat.icons[0]?.url}
                                subcategories={subcategoriesMap[cat.id]}
                            />
                        ))}
                    </div>
                </CategoryStateContextProvider>
            </div>
        </>
    );
}