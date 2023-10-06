import { SetStateAction } from "react";

export type GridContextType = {
  pixelFillColor: string;
  setPixelFillColor: React.Dispatch<SetStateAction<string>>;
};
