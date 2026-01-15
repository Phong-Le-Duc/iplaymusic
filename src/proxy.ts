import { NextResponse } from "next/server"

export async function proxy(request) {

    if (!request.cookies.has("IPM_AT")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


}


export const config = {
    matcher: ["/", "/playlists/:path*", "/albums/:path*", "/artists/:path*"]
}