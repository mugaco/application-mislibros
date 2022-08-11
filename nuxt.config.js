const path = require('path')
const theme = "clave-mi"

import {
  apiUrl,
  baseUrl,
  port,
  socket,
  mjml2html,
  serviceName,
  serviceSlugName,
  tokenMaxAge,
  stripePublicKey,
  RECAPTCHA_SITE_KEY,
  dev,
  avisoLegal,
  politicaDeCookies,
  politicaDePrivacidad,
  terminosYCondiciones,
  workbox_enabled
} from "./base.config.js"

// const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
export default {
  env: {
    baseUrl: process.env.BASE_URL || baseUrl,
    apiUrl: process.env.API_URL || apiUrl,
    socket: socket,
    mjml2html: mjml2html,
    serviceName: serviceName,
    serviceSlugName: serviceSlugName,
    tokenMaxAge: tokenMaxAge,
    RECAPTCHA_SITE_KEY: RECAPTCHA_SITE_KEY,
    dev: dev,
    avisoLegal: avisoLegal,
    politicaDeCookies: politicaDeCookies,
    politicaDePrivacidad: politicaDePrivacidad,
    terminosYCondiciones: terminosYCondiciones
  },

  server: {
    port: port
  },
  // router: {
  //   scrollBehavior: async (to, from, savedPosition) => {
  //     console.log(to)
  //     if (savedPosition) {
  //       return savedPosition
  //     }

  //     const findEl = async (hash, x) => {
  //       return document.querySelector(hash) ||
  //         new Promise((resolve, reject) => {
  //           if (x > 50) {
  //             return resolve()
  //           }
  //           setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
  //         })
  //     }

  //     if (to.hash) {
  //       console.log(to.hash)
  //       let el = await findEl(to.hash)
  //       if ('scrollBehavior' in document.documentElement.style) {
  //         return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  //       } else {
  //         return window.scrollTo(0, el.offsetTop)
  //       }
  //     }

  //     return { x: 0, y: 0 }
  //   }
  // },
  // Global page headers: https://go.nuxtjs.dev/config-head

  // head() {
  //   const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })

  //   return {
  //     titleTemplate: 'filegun',
  //     title: 'filegun',
  //     htmlAttrs: {
  //       myAttribute: 'My Value',
  //       ...i18nHead.htmlAttrs
  //     },
  //     meta: [
  //       { charset: 'utf-8' },
  //       { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  //       { hid: 'description', name: 'description', content: '' },
  //       { name: 'format-detection', content: 'telephone=no' },
  //       ...i18nHead.meta
  //     ],
  //     link: [
  //       { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  //       {
  //         rel: 'stylesheet',
  //         href: 'https://fonts.googleapis.com/css?family=Material+Icons'
  //       },
  //       ...i18nHead.link
  //     ]
  //   }
  // },


  head: {


    titleTemplate: 'filegun',
    title: 'filegun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Envio seguro de documentos' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Material+Icons'
      },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  // Global CSS: https://go.nuxtjs.dev/config-css
  // css: ["~/assets/scss/style.scss"], //"@/assets/swiper.css", ?
  css: [
    `../../common-js/themes-vuetify-2/${theme}/scss/style.scss`,

    //  "~/assets/filegun/scss/style.scss",
    // 'codemirror/lib/codemirror.css',
    // // merge css
    // 'codemirror/addon/merge/merge.css',
    // // theme css
    // 'codemirror/theme/base16-dark.css',
    // 'codemirror/theme/lesser-dark.css'
  ],

  // Customize the progress-bar color
  loading: {
    color: "DodgerBlue",
    height: "5px",
    continuous: true,
    duration: 3000
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //'~/plugins/auth-app-make-pk.js',
    //'~/plugins/auth-app-make-token.client.js',
    // '~/plugins/auth-app.server.js',

    '../../common-js/nuxt-plugins/setUser.js',
    '../../common-js/nuxt-plugins/cms.js',
    '~/plugins/init.js',
    // '~/plugins/axios-interceptors.js',
    '~/plugins/pwa-update.client.js',

    // '~/plugins/axios-40x.js',
    '~/plugins/i18n.js',
    '~/plugins/tt.js',
    // '../../common-js/nuxt-plugins/codemirror.client.js',
    '../../common-js/nuxt-plugins/subscriptorCan.js',
    '../../common-js/nuxt-plugins/cart.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,
  // components: [
  //   '~/components', // default level is 0
  //   // { path: '~/my-theme/components', level: 1 },
  //   { path: '~/../common-js/vue-vuetify-components-autodiscover', level: 1, prefix: "Cv", ignore: [] }
  // ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    // ['@nuxtjs/google-analytics', {
    //   id: 'UA-12301-2'
    // }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    ['nuxt-stripe-module', {
      publishableKey: stripePublicKey,
    }],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            iso: 'en-En',
            name: 'English'
          },
          {
            code: 'es',
            iso: 'es-ES',
            name: 'Español'
          },
          {
            code: 'ca',
            iso: 'ca-CA',
            name: 'Català'

          }
        ],
        baseUrl: baseUrl,
        defaultLocale: 'es',


        // detectBrowserLanguage: {
        //   useCookie: true,
        //   cookieKey: 'i18n_redirected',
        //   allwaysRedirect: true,
        //   redirectOn: 'root',  // recommended
        // },

        vueI18n: {
          fallbackLocale: 'es',
          messages: {
            en: {
              welcome: 'Welcome'
            },
            ca: {
              welcome: 'Bienvingut'
            },
            es: {
              welcome: 'Bienvenido'
            }
          }
        }
      }
    ],
    [
      '@nuxtjs/recaptcha', {

        hideBadge: true,    // Hide badge element (v3 & v2 via size=invisible)
        // language: String,   // Recaptcha language (v2)
        mode: 'base',       // Mode: 'base', 'enterprise'
        version: 3,    // Version
        // size: String        // Size: 'compact', 'normal', 'invisible' (v2)

      }
    ],
  ],
  publicRuntimeConfig: {
    recaptcha: {
      /* reCAPTCHA options */
      siteKey: RECAPTCHA_SITE_KEY // for example
    }
  },



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: apiUrl
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {},
    manifest: {
      name: serviceName,
      useWebmanifestExtension: false
    },
    workbox: {
      enabled: workbox_enabled
    }
    // workbox: {
    //   enabled: true,
    //   // cacheNames: {
    //   //   prefix: 'app',
    //   // },
    //   // importScripts: [
    //   //   // 'custom-sw.js',
    //   // ],
    // },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: [`../../common-js/themes-vuetify-2/${theme}/scss/variables.scss`],
    optionsPath: `../../common-js/themes-vuetify-2/${theme}/options.js`,
    // customVariables: ["~/assets/filegun/scss/variables.scss"],
    // optionsPath: "./vuetifyFilegun.options.js",
    treeShake: true,
    options: {
      customProperties: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.resolve.alias['&/utils'] = path.resolve(__dirname, "../../common-js/utils")
      config.resolve.alias['&/common'] = path.resolve(__dirname, "../../common-js/vue-vuetify-components-no-autodiscover")
      config.resolve.alias['&/plugins'] = path.resolve(__dirname, "../../common-js/nuxt-plugins")
      config.resolve.alias['&/locales'] = path.resolve(__dirname, "../../common-js/locales")
      config.resolve.alias['&/theme'] = path.resolve(__dirname, "../../common-js/themes-vuetify-2/"+theme)

    }
  }
}