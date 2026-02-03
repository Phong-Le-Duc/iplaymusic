import FavoriteTrackPlayerClient from "@/components/track/FavoriteTrackPlayerClient";

export default function PlaylistPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">My Favorite Songs</h1>
            <FavoriteTrackPlayerClient />
        </div>
    );
}