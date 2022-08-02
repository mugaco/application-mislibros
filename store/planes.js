import data from "./planes_caracteristicas.json" // no borrar lo mantenemos para añadirlo al producto en base de datos a mano

export const state = () => ({
  data: data,
  subscription: 'filegunproduction',
  subscriptionName: 'FilegunProduction',
  interval: "day",  // month o  year o  week o  day
  cplanes:null,
  next_price: "profesional",
  info_subscription: true
});

export const mutations = {
  setCplanes(state, val) {
    state.cplanes = val
  },
}

