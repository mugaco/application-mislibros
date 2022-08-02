export const state = () => ({
  phrase: 'filegun-app',
  token: null,
  keypair: null,
  publicKey: null,
  control: 1,
  controlClient: null,
  version:0,
});

export const mutations = {
  setVersion(state, val) {
    state.version = val;
  },
  setControl(state, val) {
    state.control = val;
  },
  setControlClient(state, val) {
    state.controlClient = val;
  },
  setToken(state, val) {
    state.token = val;
  },
  setKeypair(state, val) {
    state.keypair = val;
  },
  setPublicKey(state, val) {
    state.publicKey = val;
  },



}



