/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_IS_DEV: boolean
  // more env variables...
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv
}