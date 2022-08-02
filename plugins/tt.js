export default (app, inject) => {
  const tt = ( literal,serviceNivel=null ) => {
    if(!serviceNivel){
      // serviceNivel = 'quartup.filegun.app'
      serviceNivel = 'mugaco.pass-mongo-2.app'
    }
    const arr = serviceNivel.split(".")
    const l = arr.length
    let namespace = null
    let servicio = null
    let nivel = null
    if (!(l == 3 || l == 2)) {
      throw new Error('error en $tt');
    }
    if (l == 2) {
      namespace = null
      servicio = "app"
      nivel = arr[1]

    }
    if (l == 3) {




      namespace = arr[0]
      servicio = arr[1]
      nivel = arr[2]


    }

    app.$axios.post("translate/store-literal", {
      namespace: namespace,
      servicio: servicio,

      literal: literal,
      nivel: nivel
    }).then((response) => {
      // console.log(response.data);
    });

    return literal;

  }
  inject('tt', tt)
}