import { client } from "../auth/route"
import { AuthorizationTokenConfig } from "simple-oauth2"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
    const code = req.nextUrl.searchParams.get("code")
    console.log("got here GET CALLBACK")

    if (code && typeof code === "string") {
        const tokenParams: AuthorizationTokenConfig = {
            code: code,
            redirect_uri: "https://pattern-pal.netlify.app/pattern",
        }
        try {
            const accessToken = await client.getToken(tokenParams)
            // console.log("Got token", accessToken)

            return Response.json({
                data: "Got Access Token: " + accessToken,
            })
        } catch (err) {
            // console.log("Access Token Error", err)
            return Response.json({
                data: "😞 authentication failed: " + err,
            })
        }
    } else {
        return Response.json({ data: "missing auth code" })
    }
}
