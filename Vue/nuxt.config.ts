export default {
  devtools: { enabled: false },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Configuration Vite
  buildModules: [
    '@nuxt/vite',
  ],
  compatibilityDate: '2024-07-23',

  vite: {
    server: {
      port: 3000,
      https: false,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'https://localhost:7240',
          changeOrigin: true,
          secure: false,
          //  rewrite: path.replace(/^\/api/, ''),
        },
        '/swagger': {
          target: 'https://localhost:7240',
          changeOrigin: true,
          secure: false,
         // rewrite: (path) => path.replace(/^\/swagger/, ''),
        },
      },
    },
  },
  
  plugins: [
    {src: '~/plugins/encrypt-storage.client.js', mode: 'client'}
  ],
  
  modules: [
    "@nuxt/ui",
    "@nuxtjs/tailwindcss",
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    "@nuxt/icon",
    '@nuxt/image',
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      stripePk: process.env.STRIPE_PK_KEY,
      stripeSk: process.env.STRIPE_SK_KEY
    },
    private: {
    }
  },
  head: {
    script: [
      { src: 'https://js.stripe.com/v3' },
    ],
  },
}