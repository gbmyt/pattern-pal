"use client";
import { useState } from "react";

import Grid from "@/components/Grid";
import GridPixel from "@/components/Pixel";
import PatternForm from "@/components/PatternForm";
import { Pattern } from "@/types/pattern";

function Page() {
  const [pattern, setPattern] = useState<Pattern>({
    title: "",
    gridWidth: 12,
    gridHeight: 12,
  });

  const pixels: JSX.Element[] = new Array(
    pattern.gridHeight * pattern.gridWidth
  ).fill(pattern.gridHeight * pattern.gridWidth);

  return (
    <>
      <h1>Create a new pattern</h1>
      <PatternForm pattern={pattern} setPattern={setPattern} />

      <Grid>{pixels && pixels.map((p, i) => <GridPixel key={i} />)}</Grid>
    </>
  );
}

export default Page;
