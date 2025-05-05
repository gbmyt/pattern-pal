import { cookies } from 'next/headers';
import { headers } from "@/lib/apiHandlers";
import { RAVELRY_API_SECRET, RAVELRY_CLIENT_ID, API_REDIRECT_URL, BASE_RAVELRY_URL, RAVELRY_TOKEN_PATH, AUTH_COOKIE } from "@/const/app.const";

export const POST = async (req: Request) => {
    const { code } = await req.json()
    
    const url = `${BASE_RAVELRY_URL}${RAVELRY_TOKEN_PATH}`
    const clientId = RAVELRY_CLIENT_ID!;
    const clientSecret = RAVELRY_API_SECRET!;
    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Exchange `code` for token with the OAuth provider
    const tokenRes = await fetch(url, {
      method: 'POST',
      headers: { 
        ...headers,
        'Authorization': `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: API_REDIRECT_URL,
        }),
    })
    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token;

    // Store the token in a secure HTTP-only cookie
    cookies().set(
      AUTH_COOKIE, 
      accessToken, 
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/',
        sameSite: 'lax',
    });
    // handle session, cookie, etc.
    return Response.json({ success: true, data: tokenData });
  }
  