// pwa-update.js
// import io from "socket.io-client";

export default async (app) => {
  let url = `${process.env.apiUrl}/get-version`
  const res = await app.$axios.get(url)
  app.store.commit("app/setVersion", res.data.version);

  const workbox = await window.$workbox;
  if (workbox) {
    workbox.addEventListener("installed", (event) => {
      // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
      if (event.isUpdate) {
        console.log('que hay de nuevo')
        // whatever logic you want to use to notify the user that they need to refresh the page.
      }
    });
  }
  window.addEventListener("focus", () => {
    url = `${process.env.apiUrl}/get-version`
    app.$axios.get(url).then(res => {
      if (app.store.state.app.version != res.data.version) {
        window.location.reload();
      }

    })

    // if (app.store.state.app.control != app.store.state.app.controlClient) {
    //   app.store.commit("app/setControlClient", app.store.state.app.control)
    //   window.location.reload();
    // } else {
    //   // console.log('same version')
    // }
  });
  // const socket = io.connect(process.env.socket)
  // const workbox = await window.$workbox;
  // console.log(workbox)


  // if (!workbox) {
  //   console.debug("Workbox couldn't be loaded.");
  //   return;
  // }

  // workbox.addEventListener('installed', (event) => {
  //   console.log('le event' ,event.isUpdate)
  //   if (!event.isUpdate) {
  //     console.debug('The PWA is on the latest version.');
  //     return;
  //   }

  //   console.debug('There is an update for the PWA, reloading...');
  //   setTimeout(() => {

  //     window.location.reload();
  //   }, 4000)
  // });
};