/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AI_API_KEY: string;
  readonly VITE_STORAGE_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
