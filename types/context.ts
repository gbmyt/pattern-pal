import { SetStateAction } from "react";

export type GridContextType = {
  defaultFillColor: string;
  pixelFillColor: string;
  setPixelFillColor: React.Dispatch<SetStateAction<string>>;
};
