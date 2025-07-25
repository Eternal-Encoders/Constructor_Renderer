import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr({
    // svgr options: https://react-svgr.com/docs/options/
    svgrOptions: {
      svgo: false,
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      svgoConfig: {
        floatPrecision: 2,
      },
    },

    // esbuild options, to transform jsx to js
    esbuildOptions: {
      // ...
    },

    // A minimatch pattern, or array of patterns, which specifies the files
    //  in the build the plugin should include.
    include: "**/*.svg?react",

    //  A minimatch pattern, or array of patterns, 
    // which specifies the files in the build the plugin should ignore. 
    // By default no files are ignored.
    exclude: "",
  }), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      App: "/src/App.tsx",
      app: "/src/app",
      assets: "/src/assets",
      entities: "/src/entities",
      helpers: "/src/helpers",
      pages: "/src/pages",
      processes: "/src/processes",
      shared: "/src/shared",
      widgets: "/src/widgets",
      features: "/src/features",
    },
  },
});
