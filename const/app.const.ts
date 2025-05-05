// Ravelry Values
export const RAVELRY_CLIENT_ID = process.env.RAVELRY_CLIENT_ID;
export const RAVELRY_API_SECRET = process.env.RAVELRY_CLIENT_SECRET;
export const BASE_RAVELRY_URL = "https://www.ravelry.com/"
export const RAVELRY_API_URL = "https://api.ravelry.com/"
export const RAVELRY_TOKEN_PATH = "/oauth2/token"
export const RAVELRY_AUTH_PATH = "/oauth2/auth"

export const AUTH_COOKIE = "access_token";

// APP Values
export const API_REDIRECT_URL=`${process.env.APP_BASE_URL}/callback`;
export const APP_REDIRECT_PATH = '/projects';
export const APP_BASE_URL = process.env.APP_BASE_URL;

export const authorizedUser = 'serendipity-knits';