import { cookies } from 'next/headers';
import { APP_BASE_URL, RAVELRY_API_URL } from "@/const/app.const"
import { NextResponse } from 'next/server';

export const headers = {
  'Content-Type': 'application/x-www-form-urlencoded',
};

export const jsonHeaders = {
  'Content-Type': 'application/json',
};

export async function fetchRavelryData(endpoint: string) {
  const accessToken = cookies().get("access_token")?.value
  const url = `${RAVELRY_API_URL}${endpoint}`

  try {
      const res = await fetch(url, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      })
      const data = await res.json()
      return Response.json(data)
  } catch(err: any) {
      console.error('There was a problem fetching data from Ravelry');
      throw new Error(err);
  }
}

export async function fetchData(url: string) {
  // console.log('fetchData URL is: ', url);
  try {
      const res = await fetch(url, {
          headers
      })
      const data = await res.json()
      return Response.json(data)
  } catch(err: any) {
      console.error('There was a problem fetching data');
      throw new Error(err);
  }
}