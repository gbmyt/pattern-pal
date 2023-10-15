import { SetStateAction } from "react";

export type GridContextType = {
  defaultFillColor: string;
  maxGridWidth: number;
  pixelFillColor: string;
  setPixelFillColor: React.Dispatch<SetStateAction<string>>;
};
