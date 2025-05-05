import { AuthorizationCode } from "simple-oauth2"
import randomstring from "randomstring"
import { 
    BASE_RAVELRY_URL, 
    RAVELRY_API_SECRET, 
    RAVELRY_AUTH_PATH, 
    RAVELRY_CLIENT_ID,
    RAVELRY_TOKEN_PATH, 
    API_REDIRECT_URL, 
    AUTH_COOKIE,
} from "@/const/app.const"
import { cookies } from "next/headers"

const oauth2: any = {
    // The oauth endpoints are all at www.ravelry.com
    auth: {
        tokenHost: BASE_RAVELRY_URL,
        tokenPath: RAVELRY_TOKEN_PATH,
        authorizePath: RAVELRY_AUTH_PATH,
    },
    client: {
        id: RAVELRY_CLIENT_ID,
        secret: RAVELRY_API_SECRET,
    },
}
const client = new AuthorizationCode(oauth2)

// run: pnpm run dev and then pnpm run tunnel 
// then paste the url output into Ravelry console's app config
export const GET = async (req: Request) => {
    const authorizationUri = client.authorizeURL({
        redirect_uri: API_REDIRECT_URL,
        state: randomstring.generate(),
        scope: "offline", // offline scope is required for refresh tokens
    })
    return Response.redirect(authorizationUri)
}

// logout handler 
export const POST = async (req: Request) => {
    await cookies().delete(AUTH_COOKIE);
    if (!cookies().get(AUTH_COOKIE)) {
        return Response.redirect(`/patterns`)
    } else {
        console.error('There was a problem logging out')
    }
}
