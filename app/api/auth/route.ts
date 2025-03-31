import { AuthorizationCode } from "simple-oauth2"
import randomstring from "randomstring"

// move this somewhere else when OAuth working
export const oauth2: any = {
    // The oauth endpoints are all at www.ravelry.com
    auth: {
        tokenHost: "https://www.ravelry.com",
        tokenPath: "/oauth2/token",
        authorizePath: "/oauth2/auth",
    },
    client: {
        id: process.env.RAVELRY_CLIENT_ID,
        secret: process.env.RAVELRY_CLIENT_SECRET,
    },
}

export const client = new AuthorizationCode(oauth2)

export const GET = async (req: Request) => {
    console.log("GET auth host?", req.headers.get("host"))
    console.log("Auth Protocol", req.headers.get("protocol"))

    // REDIRECT URI ONLY WORKS WITH HTTPS, LOCALHOST WONT WORK HERE
    // Not sure how to test this locally now -- research TODO
    const authorizationUri = client.authorizeURL({
        // redirect_uri: `localhost:3000/api/callback`,
        // redirect_uri: `${window.location.protocol}//${window.location.host}/api/callback`,

        redirect_uri: "https://pattern-pal.netlify.app/api/callback",
        state: randomstring.generate(),
        scope: "offline", // offline scope is needed if you want to receive a refresh token (you do)
    })
    console.log("authorizationUri", authorizationUri)
    return Response.redirect(authorizationUri)
}
