


export const state = () => ({
  book_id: "62ef99341d6da87d953fd8bf",
  md_id: "62f0e2b67041f60c7720a842",
  book_title: "Barcino siglo III, independencia",
  book_author: "José Manuel Muñoz García",
  book_publisher: "Ediciones blanco sobre negro",
  book_collection: "novela",
  book_subtitle: null,
  book_portrait: "https://i.picsum.photos/id/654/2000/3000.jpg?hmac=HlOP8vKRoOogTYmQLLYe3T2-dYNYOQqD3eTXsbOau_U",

  book_store_id: null, //??
  settings: null,
  mostrar_portada: true,
  mostrar_contraportada: false
});

export const mutations = {
  setMostrar_contraportada(state, val) {
    state.mostrar_contraportada = val
  },
  setMostrar_portada(state, val) {
    state.mostrar_portada = val
  },
  setBook_id(state, val) {
    state.book_id = val;
  },
  setMd_id(state, val) {
    state.md_id = val;
  },
  setSettings(state, val) {
    state.settings = val
  },
  setTitle(state, val) {
    state.book_title = val
  },
  setAuthor(state, val) {
    state.book_author = val
  },
  setPublisher(state, val) {
    state.book_publisher = val
  },
  setCollection(state, val) {
    state.book_collection = val
  },
  setSubtitle(state, val) {
    state.book_subtitle = val
  },
  setPortrait(state, val) {
    state.book_portrait = val
  },
  setBookStoreId(state, val) {
    state.book_store_id = val
  }
}




