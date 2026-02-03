import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import FeaturedFavorites from "@/components/track/FeaturedFavorites";


export default async function Home() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie || !accessTokenCookie.value) {
    redirect("/login"); // or handle error appropriately
    return null;
  }

  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${accessTokenCookie.value}`
    }
  });

  console.log(await response.json());

  return (
    <>
      {/* <h1 className="p-4">Featured</h1> */}
      <FeaturedFavorites />
    </>
  )
}
