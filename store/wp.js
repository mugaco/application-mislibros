export const state = () => ({
  color: "#000",
  wght: 200,
  factorWght: 2.5,
  fontSize: 1.6,
  indent: 7,
  firstMarginTop: 150,
  dobleMarginTop: 50,
  marginTop: 0,
  lineHeight: 1.6,

   fontFamilyRegular: "Crimson Pro Regular",
   fontFamilyItalic: "Crimson Pro Italic",

  //fontFamilyRegular: "Ibarra Real Nova Regular",
  //fontFamilyItalic: "Ibarra Real Nova Italic",
});

export const mutations = {
  setColor(state, val) {
    state.color = val;
  },
  setWght(state, val) {
    state.wght = val;
  },
  setFactorWght(state, val) {
    state.factorWght = val;
  },
  setFontSize(state, val) {
    state.fontSize = val;
  },
  setIndent(state, val) {
    state.indent = val;
  },
  setFirstMarginTop(state, val) {
    state.firstMarginTop = val;
  },
  setDobleMarginTop(state, val) {
    state.dobleMarginTop = val;
  },
  setMarginTop(state, val) {
    state.marginTop = val;
  },
  setLineHeight(state, val) {
    state.lineHeight = val;
  },
  setFontFamilyRegular(state, val) {
    state.fontFamilyRegular = val;
  },
  setFontFamilyItalic(state, val) {
    state.fontFamilyItalic = val;
  },

}



