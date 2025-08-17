"use client";
import { useEffect } from "react";

export default function Redirect({ path }: { path?: string }) {

  useEffect(() => {
    const envPath = process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? "/";
    window.location.href = path ?? envPath;
  }, [path]);

  return <p>Setting up your account..</p>;
}
