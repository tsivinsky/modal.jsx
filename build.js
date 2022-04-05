import esbuild from "esbuild";

const watch = process.env.NODE_ENV === "development";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/modal.esm.js",
    watch,
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "esm",
    external: ["react"],
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/modal.cjs",
    watch,
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "cjs",
    external: ["react"],
  })
  .catch(() => process.exit(1));
