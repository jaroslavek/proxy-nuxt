// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    myProxyUrl: "https://jsonplaceholder.typicode.com/",
  },
  // If you only have a static proxy URL, use the routeRules feature!

  /**
   * Pro SSR proxy.
   * bud tento zapis routeRules, nebo vytvořit defineEventHandler 
   * na path server/api/[...].ts
   */
  // routeRules: {
  //   "/api/**": {
  //     proxy: "https://jsonplaceholder.typicode.com/**",
  //   },
  // },

  //
  // Other not recommended approaches
  //

  // Vite Dev Server Proxy: Will break during SSR
  /*
  vite: {
    server: {
      proxy: {
        '/api': {
          target: 'https://jsonplaceholder.typicode.com/',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        },
      }
    }
  }*/

  // Nitro Dev Server Proxy: Will break during SSR

  nitro: {
    devProxy: {
      "/api": {
        target: "https://jsonplaceholder.typicode.com/",
        changeOrigin: true,
      },
    },
  },

  compatibilityDate: "2025-02-13",
});
