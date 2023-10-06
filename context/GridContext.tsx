import { GridContextType } from "@/types/context";
import React, { createContext, useContext, useState } from "react";

const GridContext = createContext<GridContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pixelFillColor, setPixelFillColor] = useState("#0000FF");

  const ctx: GridContextType = {
    pixelFillColor,
    setPixelFillColor,
  };

  return <GridContext.Provider value={ctx}>{children}</GridContext.Provider>;
}

export function useGridContext() {
  return useContext(GridContext) as GridContextType;
}
