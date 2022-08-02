// import Web from "./web.json"
export const state = () => ({
  webId: "62c7020edd6b7c8419b9b560", //current-dev
  web: null,
  poi:'se',
  lang: null,
  contentInfo: {},
  // drawer: true
  // is: null,
  // get: null,
  // layout: 'default',

  //webId:"5bd5c92947eb89565966b452", //adela vives
  // itemsPerPageCollection: 6,
  // userIdentifier:false,
  // drawer:true,
  // subMenuOpened:false,
  // data:null,
  // filters:{
  //   cats:null,
  //   tags:null,
  //   string:null
  // },

  // lastLoop: null, //ultimo tipo de loop visto
  // lastCategory: null //ultima catagoria de loop visto

});

export const mutations = {

  setContentInfo(state, val) {
    state.contentInfo = val
  },

  setLang(state, lang) {
    state.lang = lang
  },
  setWeb(state, web) {
    state.web = web
  },
  // setDrawer(state, val) {
  //   state.drawer = val
  // },
  // setLastLoop (state,v) {
  //   state.lastLoop = v
  // },
  // setLastCategory (state,v) {
  //   state.lastCategory = v
  // },
  // setWebId (state,webId) {
  //    state.webId = webId
  // },
  // setUserIdentifier (state,userIdentifier) {
  //    state.userIdentifier = userIdentifier
  // },

  // setSubMenuOpened(state,val) {
  //   state.subMenuOpened = val
  // },
  // setData (state,data) {
  //    state.data = data
  // },
  // setFilters (state,filters) {
  //    state.filters = filters
  // },
  // setType (state,type) {
  //    state.type = type
  // },
}
export const getters = {
  // getDrawer (state) {
  //   return state.drawer
  // },
  // getFilters (state) {
  //   return state.filters
  // },
}
