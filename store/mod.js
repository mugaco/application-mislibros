export const state = () => ({
  drawerAccess:false,
  accessMode:0, 
  drawerUploadFiles:false,
  drawerEdicionPlanes:false,
  drawerMenu:true,
  paymentInProgress:false,
  dragingOverInput:false,
});

export const mutations = {
  setDrawerAccess(state,val) {
    state.drawerAccess = val
  },
  setAccessMode(state,val) {
    // 0 => registro
    // 1 => inicio, 
    // 2 => recuperar
    state.accessMode = val
  },
  setDrawerUploadFiles(state,val) {
    state.drawerUploadFiles = val
  },
  setPaymentInProgress(state,val) {
    state.paymentInProgress = val
  },
  setDrawerEdicionPlanes(state,val) {
    state.drawerEdicionPlanes = val
  },
  setDrawerMenu(state,val) {
    state.drawerMenu = val
  },
  toggleDrawerMenu(state) {
    state.drawerMenu = !state.drawerMenu;
  },
  setDragingOverInput(state,val) {
    state.dragingOverInput = val
  },
}

