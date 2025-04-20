// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['normalize.css', '~/assets/styles/global.css'],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@formkit/auto-animate/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore', 'acceptHMRUpdate'] }],
  ],
  icon: {
    customCollections: [
      {
        prefix: 'icon',
        dir: 'assets/icons'
      },
    ],
  },

  imports: {
    dirs: ['stores'],
  },
  app: {
    pageTransition: { name: "page", mode: "out-in", },
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.ico' }],
    },
  }
})