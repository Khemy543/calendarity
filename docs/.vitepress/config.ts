import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "calendarity",
  description: "A calendar app",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Support', link: '/support' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/docs/introduction' },
          { text: 'Installation', link: '/docs/installation' }
        ]
      },
      {
        text: 'Documentation',
        items: [
          { text: 'Display', link: '/docs/display' },
          { text: 'Views', link: '/docs/views' },
          { text: 'Date and Time', link: '/docs/date-and-time' },
          { text: 'Events', link: '/docs/events' }
        ]
      }
    ],
    aside: false,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Khemy543/calendarity' }
    ]
  }
})
