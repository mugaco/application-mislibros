
export const state = () => ({
  editando: false,//controla que la aplicacion este en modo edicion y muestre los drawer
  guardar: false,
  nueva: false,//controla que se muestre el drawer de nueva publicacion
  edicion: false, //controla que se muestre el drawer de edicion
  taxonomy: false, //controla que se muestre el drawer de edicion de taxonomia
 // drawerAuth: false, //controla que se muestre el drawer de auth
  publicationIdMounted:null,
  refresh:null,
  isMobile:false,
  // drawer:false
});

export const mutations = {

  setPublicationIdMounted(state, val){
    state.publicationIdMounted = val
  },
  setIsMobile(state, val){
    state.isMobile = val
  },
  setTaxonomy(state, val){
    state.taxonomy = val
  },
  // setDrawer(state, val){
  //   state.drawer = val
  // },
  // setDrawerAuth(state, val){
  //   state.drawerAuth = val
  // },
  setEditando(state, val) {
    state.editando = val
  },
  setEdicion(state, val) {
    state.edicion = val
  },
  toggleGuardar(state) {
    state.guardar = !state.guardar
  },
  toggleRefresh(state) {
    state.refresh = !state.refresh
  },
  setNueva(state,val) {
    state.nueva = val
  }
}

