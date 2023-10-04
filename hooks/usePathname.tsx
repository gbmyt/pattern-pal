import { useEffect, useState } from "react";

export function usePathname() {
  const [pathname, setPathName] = useState("");

  useEffect(() => {
    window && setPathName(window.location.pathname);
  }, []);

  return {
    pathname,
    setPathName,
  };
}
