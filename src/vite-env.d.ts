/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KIT_FORM_ID: string
  readonly VITE_TURNSTILE_SITE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
