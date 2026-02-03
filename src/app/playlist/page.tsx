import FavoriteTrack from "@/components/track/favoriteTrack";

export default function PlaylistPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Favorite Songs</h1>
            <FavoriteTrack />
        </div>
    );
}