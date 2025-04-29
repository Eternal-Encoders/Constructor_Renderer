/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_IS_DEV: boolean;
  readonly VITE_API_DOMAIN: string;
}
  
interface ImportMeta {
  readonly env: ImportMetaEnv;
}