/// <reference types="vite/client" />

// Type declarations for figma:asset imports
// This covers all figma:asset/* imports defined in vite.config.ts
declare module 'figma:asset/*' {
  const src: string;
  export default src;
}

