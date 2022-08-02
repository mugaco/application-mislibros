export const state = () => ({
  ticket: [], // Lista de productos ordenador por _id
  added: false, //boleana, cambia cada vez que se añade un item al carrito
  rTicket: [], //Deprecated // Lista de productos ordenador con impuestos calculados
  ver_carrito: '/mp/cart',
  seguir_comprando: '/admin/cuenta',
  realizar_pedido: '/mp/pedido',
  cart_id: null,
  form_fiscal_data: true,
  subtotal: null,
  subtotales: null,
  total: null,
  paises: [
    {
      code: 'es',
      name: 'España'
    }
  ]


});

export const mutations = {

  setTicket(state, val) {
    state.ticket = val;
  },
  setSubtotal(state, val) {
    state.subtotal = val;
  },
  setSubtotales(state, val) {
    state.subtotales = val;
  },
  setTotal(state, val) {
    state.total = val;
  },
  setRTicket(state, val) {
    state.rTicket = val;
  },
  setCart_id(state, val) {
    state.cart_id = val;
  },
  toggleAdded(state) {
    state.added = !state.added;
  }


}



