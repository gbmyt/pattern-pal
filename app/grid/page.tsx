"use client";
import { useState } from "react";

import Grid from "@/components/Grid";

import PatternForm from "@/components/PatternForm";
import { Pattern } from "@/types/pattern";

function Page() {
  const [pattern, setPattern] = useState<Pattern>({
    title: "",
    gridWidth: 12,
    gridHeight: 12,
  });

  return (
    <>
      <h1>Create a new pattern</h1>
      <PatternForm pattern={pattern} setPattern={setPattern} />

      <Grid height={pattern.gridHeight} width={pattern.gridWidth} />
    </>
  );
}

export default Page;
