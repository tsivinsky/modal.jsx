import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    outfile: "dist/modal.esm.js",
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
    bundle: true,
    sourcemap: true,
    minify: true,
    format: "cjs",
    external: ["react"],
  })
  .catch(() => process.exit(1));
