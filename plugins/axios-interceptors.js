export default function ({ app, $axios, store, redirect, route }) {

  $axios.onResponse(response => {
    // console.log('response.config', response.config)
    // console.log('response.data', response.data)
    // console.log('response.status', response.status)
    if (response.status == 205) {
      // app.$authAppMakeToken();
      // $axios.setHeader('success', `pepepex`)
      // setTimeout(()=>{
      //   console.log('paso por el interceptor')
      //   return $axios.request(response.config)
      // },3000)
    }
  })
  $axios.onError(error => {
    console.log('error.config', error.config)
    console.log('paso por la error', error.response.data)
    console.log('ah', $axios)
    // if(error.response.status == 500){
    //   app.$axios.setHeader('AuthApp', `pepepex`)
    //   setTimeout(()=>{
    //     return $axios.request(error.config)
    //   },10000)
    // }
   // $axios.request(error.config)

  })
}