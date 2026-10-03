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
      htmlAttrs: { lang: 'en' },
      title: 'Natnael Meseret — Full Stack Software Engineer',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        { name: 'description', content: 'Full Stack Software Engineer based in Addis Ababa, Ethiopia. Specializing in Go, Elixir, Node.js, Vue, and React. Available for freelance and full-time opportunities.' },
        { name: 'keywords', content: 'Natnael Meseret, Full Stack Developer Ethiopia, Software Engineer Addis Ababa, Golang Developer, Elixir Developer, Node.js Developer, Vue Developer, React Developer, Freelancer Ethiopia' },
        { name: 'author', content: 'Natnael Meseret' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Natnael Meseret' },
        { property: 'og:title', content: 'Natnael Meseret — Full Stack Software Engineer' },
        { property: 'og:url', content: 'https://nati43.github.io' },
        { property: 'og:description', content: 'Full Stack Software Engineer based in Addis Ababa, Ethiopia. Specializing in Go, Elixir, Node.js, Vue, and React.' },
        { property: 'og:image', content: 'https://nati43.github.io/intro.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter / X
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Natnael Meseret — Full Stack Software Engineer' },
        { name: 'twitter:description', content: 'Full Stack Software Engineer based in Addis Ababa, Ethiopia.' },
        { name: 'twitter:image', content: 'https://nati43.github.io/intro.png' },
        // Theme
        { name: 'theme-color', content: '#1a1b26' },
        { name: 'msapplication-navbutton-color', content: '#1a1b26' },
        { name: 'apple-mobile-web-app-status-bar-style', content: '#1a1b26' }
      ],
      link: [
        { rel: 'canonical', href: 'https://nati43.github.io' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Source+Sans+Pro:wght@200;300;400;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Natnael Meseret',
            jobTitle: 'Full Stack Software Engineer',
            url: 'https://nati43.github.io',
            image: 'https://nati43.github.io/intro.png',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Addis Ababa',
              addressCountry: 'ET'
            },
            sameAs: [
              'https://github.com/Nati43',
              'https://www.linkedin.com/in/natnael-meseret-dev'
            ],
            knowsAbout: ['Go', 'Elixir', 'Node.js', 'Nest.js', 'Express.js', 'Vue', 'React', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Full Stack Development', 'Microservices']
          })
        }
      ]
    }
  },

  // @ts-ignore — nitro prerender is valid but type definitions lag behind
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  }
})
