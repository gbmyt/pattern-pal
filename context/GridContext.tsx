import { GridContextType } from "@/types/context";
import React, { createContext, useContext, useState } from "react";

const GridContext = createContext<GridContextType | null>(null);

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const defaultFillColor = "#0000FF";
  const maxGridWidth = 80;
  const [pixelFillColor, setPixelFillColor] = useState(defaultFillColor);

  const ctx: GridContextType = {
    defaultFillColor,
    maxGridWidth,
    pixelFillColor,
    setPixelFillColor,
  };

  return <GridContext.Provider value={ctx}>{children}</GridContext.Provider>;
}

export function useGridContext() {
  return useContext(GridContext) as GridContextType;
}
