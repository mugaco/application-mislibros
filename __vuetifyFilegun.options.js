import colors from 'vuetify/es5/util/colors'
// Translation provided by Vuetify (typescript)
import es from 'vuetify/es5/locale/es'
import en from 'vuetify/es5/locale/en'
import ca from 'vuetify/es5/locale/ca'
export default {
  lang: {
    locales: { es, en, ca },
    current: 'es',
  },
  theme: {
    dark: false,
    themes: {
      dark: {
        header:"#EDEDED",
        primary: "#3F47DA",
        accent: "#607df9",
        secondary: "#a73aeb",
        info: "#0164d3",
        warning: "#fec500",
        error: "#ff4d7e",
        success: "#2cdd9b"
      },
      light: {
        header:"#EDEDED",
        primary: "#3F47DA",
        accent: "#607df9",
        secondary: "#a73aeb",
        info: "#0164d3",
        warning: "#fec500",
        error: "#ff4d7e",
        success: "#2cdd9b"
      }
    }
  }
};
