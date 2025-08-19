// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/variables.scss" as *;`
        }
      }
    }
  },
  css: ['~/assets/fonts.scss', '~/assets/default.scss', 'tachyons/css/tachyons.min.css'],
  plugins: [
    '~/src/plugins/fontawesome.ts',
  ],
  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
})
