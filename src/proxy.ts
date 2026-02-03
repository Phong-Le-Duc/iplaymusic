import { NextResponse } from "next/server"

import type { NextRequest } from "next/server";
export async function proxy(request: NextRequest) {

    if (!request.cookies.has("IPM_AT")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }


}


export const config = {
    matcher: ["/", "/playlists/:path*", "/albums/:path*", "/artists/:path*"]
}