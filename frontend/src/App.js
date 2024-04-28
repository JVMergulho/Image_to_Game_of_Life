import * as React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import sketch from "./sketches/sketch"

export default function App() {
  return <ReactP5Wrapper sketch={sketch} />;
}