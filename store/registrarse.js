export const state = () => ({
  senderEmail: null,
  senderName: null,
});

export const mutations = {
  setSenderName(state, val) {
    state.senderName = val
  },
  setSenderEmail(state, val) {
    state.senderEmail = val
  }
}

