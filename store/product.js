export const state = () => ({
  slug:'filegun',
  name:'Filegun',
  product_id: null,
  product: null,
});

export const mutations = {
  setProduct(state, val) {
    state.product = val
  },
  setProduct_id(state, val) {
    state.product_id = val
  },
}

