/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'json5' {
    const json5: {
        parse: (text: string, reviver?: (key: any, value: any) => any) => any;
        stringify: (value: any, replacer?: ((key: string, value: any) => any) | (number | string)[] | null, space?: string | number) => string;
    };
    export default json5;
}
