const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center mt-30">
            <a className="bg-green-600 py-4 px-6  rounded-full text-white font-bold" href={`https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&show_dialog=true&scope=playlist-read-private`}>
                Log in with Spotify
            </a>
        </div>
    );
}