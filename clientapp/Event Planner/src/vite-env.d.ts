/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_FACEBOOK_APP_ID: string;
  VITE_CLOUDINARY_UPLOAD_PRESET: string;
  VITE_CLOUDINARY_CLOUD_NAME: string;
  VITE_CLOUDINARY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
