import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  outDir: "lib",
  minify: true,
  clean: true,
  dts: true,
  target: "es5",
  sourcemap: false,
});
