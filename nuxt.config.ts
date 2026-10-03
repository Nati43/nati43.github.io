// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  telemetry: false,
  devtools: { enabled: false },

  css: [
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Natnael Meseret',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Portfolio of Web Developer & Designer - Natnael Meseret' },
        { name: 'keywords', content: 'Natnael, Natnael Meseret, Web Developer in Ethiopia, Web Developer in Addis Ababa, Freelancer in Ethiopia, Freelancer in Addis Ababa, Full Stack Developer in Ethiopia, Full Stack Developer in Addis Ababa, Addis Ababa, Ethiopia' },
        { property: 'og:title', content: 'Natnael Meseret' },
        { property: 'og:url', content: 'https://nati43.github.io' },
        { property: 'og:description', content: 'Portfolio of Software Engineer - Natnael Meseret' },
        { property: 'og:image', content: 'https://nati43.github.io/intro.png' },
        { property: 'og:type', content: 'website' },
        { name: 'theme-color', content: '#D1D1D1' },
        { name: 'msapplication-navbutton-color', content: '#D1D1D1' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#D1D1D1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
      ]
    }
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
