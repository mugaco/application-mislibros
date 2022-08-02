export default function ({ app, $axios, store, redirect, route }) {

  $axios.onResponse( response => {
    if (response.status === 205) {
      console.log("HTTP 205 received, polling operation...");
      console.log("Operation running at " + response.headers.location);

      // Retrieve the initial operation status
      // let pollingResponse = await $axios.get(response.headers.location);
      // console.log("Operation status is " + pollingResponse.data.status);
      // if (response.data.expired) {
      // console.log('aqui tenemos que refrescar el token')
      // app.$authAppMakeToken()
      // store.commit("app/setApp", 'filegun-app');
      // return redirect(route.path)
      // }
    }
  })
  $axios.onError(error => {
    // console.log('erroror')

    if (error.response.status === 401) {
      // app.$cookies.removeAll();
      // store.commit("mod/setDraweAccess", false);
      // store.commit("user/setName", false);
      // store.commit("user/setEmail", false);
      // store.commit("user/setLogged", false);
      // $axios.setHeader("Authorization", ``);
      // return redirect("/")
    }
    if (error.response.status === 403) {
      console.log('aqui me lo tengo que montar para sacar un alert global')
      // store.commit("app/setApp", 'filegun-app');
      // return redirect("/inspires/inspire-cm")
      // console.log(context.$nuxt.refresh());
    }
  })
}