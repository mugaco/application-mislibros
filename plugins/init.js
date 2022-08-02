
export default async ({ app, store, redirect, route, context }) => {
  if (route.query.document_was_send) {
    // console.log(route.query.kY2Y0)
    app.$cookies.set('sender_name', route.query.sender_name, {
      path: '/',
      maxAge: process.env.tokenMaxAge
      //maxAge: 10
    })
    app.$cookies.set('sender_email', route.query.sender_email, {
      path: '/',
      maxAge: process.env.tokenMaxAge
      //maxAge: 10
    })
    app.$cookies.set('to_name', route.query.to_name, {
      path: '/',
      maxAge: process.env.tokenMaxAge
      //maxAge: 10
    })
    //dejamos seteada la cookie y hacemos un redirect para limpiar la url de params
    redirect(route.path)
    return false;
  }
  if (route.query.kY2Y0) {
    // console.log(route.query.kY2Y0)
    app.$cookies.set('token', route.query.kY2Y0, {
      path: '/',
      maxAge: process.env.tokenMaxAge
      //maxAge: 10
    })
    //dejamos seteada la cookie y hacemos un redirect para limpiar la url de params
    redirect(route.path)
    return false;
  }
  if (store.state.planes) {
    if (store.state.planes.subscription) {
      const sub_url = `market-place/products/admin/${store.state.planes.subscription}`
      const subscription = await app.$axios.get(sub_url)
      if (subscription.data.product) {
        const planes = subscription.data.product.planes
        const caracteristicas = subscription.data.product.caracteristicas
        const data = {
          planes: planes,
          caracteristicas: caracteristicas
        }
        function cplanes(data) {
          const pps = JSON.parse(
            JSON.stringify(data.planes)
          );
          const ccs = JSON.parse(
            JSON.stringify(data.caracteristicas)
          );
          // console.log("pps", pps);
          // console.log("ccs", ccs);
          const kplanes = Object.keys(pps);
          // return
          kplanes.forEach((kp) => {
            let nccs = [];
            const cks = Object.keys(pps[kp]["keys"]);
            // console.log(cks);
            cks.forEach((ck) => {
              //esto es c1, c2, etc
              let nc = {};
              nc.key = ck;
              let ttxx;
              ccs.forEach((car) => {
                if (car.key == ck) {
                  ttxx = car.text;
                }
              });
              nc.ck = Math.random();
              nc.include = pps[kp]["keys"][ck];
              nc.text = ttxx;
              nccs.push(nc);
            });
            pps[kp]["caracteristicas"] = nccs;
          });
          // return { pps: pps, ccs: ccs, kplanes: kplanes };

          return pps;
        }
        const losplanes = cplanes(data)
        store.commit('planes/setCplanes', losplanes)
      }
    }
  }
  const cart_id = app.$cookies.get('cart-id')
  if (cart_id) {
    const url_cart = `${process.env.apiUrl}/market-place/carts/${cart_id}`
    const res = await app.$axios.get(url_cart)
    store.commit('cart/setTicket', JSON.parse(res.data.ticket))
    store.commit('cart/setCart_id', cart_id)
  }
  const token = app.$cookies.get('token')
  if (token) {
    app.$axios.setHeader('Authorization', `Bearer ${token}`)
    await app.$setUser()
    // const url = `${process.env.apiUrl}/filegun/get-user`

    // let res
    // try {
    //   res = await app.$axios.get(url,
    //     // {
    //     //   params: {
    //     //     with: { 'subscription': 'filegun' }
    //     //   }
    //     // }
    //   )


    // } catch (error) {

    //   return false
    // }
    // let settings = null;
    // let lang = null;
    // if (res.data.settings) {
    //   settings = JSON.parse(res.data.settings);
    //   lang = settings.lang
    //   app.i18n.locale = lang
    //   // Get localized path for homepage
    //   const localePath = app.localePath(route.path)
    //   // const switchLocalePath = app.switchLocalePath(lang)
    //   if (route.path !== localePath) {
    //     redirect(localePath)
    //     // console.log(route.path)
    //     // console.log(localePath)
    //     return false;
    //   }


    //   // Get path to switch current route to French
    // }
    // store.commit('user/setLogged', true)
    // store.commit('user/setName', res.data.name)
    // store.commit("user/setEmail", res.data.email);
    // store.commit("user/setLang", lang ? lang : 'es');
    // store.commit("user/setSubscription", res.data.subscription);
    // store.commit("user/setPm_last_four", res.data.pm_last_four);
    // store.commit("user/setUser_id", res.data._id);
    // if (res.data.fiscal_data) {
    //   store.commit("user/setFiscal_data", res.data.fiscal_data);
    // }
    // if (res.data.is_admin) {
    //   store.commit("user/setIs_admin", res.data.is_admin);
    // }

    //##SETUSER##

    //  if (typeof app.$authAppMakeToken == 'function'){
      // app.$authAppMakeToken('init')
    //  }

    return false

  }

  //Recuperación del carrito de la compra de las cookies



  return false
}
