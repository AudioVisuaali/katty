import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import typescript from "@rollup/plugin-typescript";
import path from "path";

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
          baseUrl:"./",
          include: ["./src/katty"],
        }),
      ],
    },
  },
});
