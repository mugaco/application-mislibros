export const state = () => ({
  name: false,
  logged: false,
  email: null,
  lang: "es",
  address: null,
  nif: null,
  scopes: null,
  subscription: null,
  user_id: null,
  temp_value: null,
  max_size: 200 * 1024 * 1024,
  is_admin: false,
  pm_last_four: null,
  fiscal_data: null,
});

export const mutations = {
  setName(state, val) {
    state.name = val
  },
  setIs_admin(state, val) {
    state.is_admin = val
  },
  setLogged(state, val) {
    state.logged = val
  },
  setEmail(state, val) {
    state.email = val
  },
  setLang(state, val) {
    state.lang = val
  },
  setScopes(state, val) {
    state.scopes = val
  },
  setSubscription(state, val) {
    state.subscription = val
  },
  setAddress(state, val) {
    state.address = val
  },
  setNif(state, val) {
    state.nif = val
  },
  setUser_id(state, val) {
    state.user_id = val
  },
  setTemp_value(state, val) {
    state.temp_value = val
  },
  setMax_size(state, val) {
    state.max_size = val
  },
  setPm_last_four(state, val) {
    state.pm_last_four = val
  },
  setFiscal_data(state, val) {
    state.fiscal_data = val
  },
}

