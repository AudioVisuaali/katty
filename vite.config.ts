import typescript from "@rollup/plugin-typescript";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/katty/index.ts"),
      fileName: "main",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react"],
      plugins: [
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
          rootDir: "./src/katty",
        }),
      ],
    },
  },
});
