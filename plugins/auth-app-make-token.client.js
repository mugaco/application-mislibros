import {  util, random, cipher } from "node-forge";
export default (app, inject) => {
  const authAppMakeToken = async (pepe='def') => {
    const keypair = app.store.state.app.keypair
    const publicKey = app.store.state.app.publicKey
    const response = await app.$axios.post("auth-app/handshake", {
      pepe: pepe,
      publicKey: publicKey,
    })
    console.log(Math.floor(Date.now() / 1000))
    console.log('pepe',pepe)
    console.log('respuesta', response.data)
    const sharedKey = util.decode64(response.data.encryptedKey);
    const decryptedSharedKey = keypair.privateKey.decrypt(sharedKey);
    const expire_id = response.data.expire_id;
    const handshake_id = response.data.handshake_id;

    const data = app.store.state.app.phrase

    //  generate a random 16 byte IV
    const iv = random.getBytesSync(16);

    // encrypt the data using the random IV and the shared key
    const encryption = cipher.createCipher(
      "AES-CBC",
      decryptedSharedKey
    );
    encryption.start({ iv: iv });
    encryption.update(util.createBuffer(data, "utf8"));
    encryption.finish();
    const e = encryption.output.data;
    const token = util.encode64(JSON.stringify({
      handshake_id: handshake_id,
      expire_id: expire_id,
      encryptedData: util.encode64(iv + e)
    }))
    app.$axios.setHeader('AuthApp', `${token}`)
    // app.$axios.setHeader('AuthApp',   Math.floor(Date.now() / 1000))
    Math.floor(Date.now() / 1000)
    app.store.commit('app/setToken',token)
    console.log('paso por aqui', 205)
    // app.$axios.setHeader('AuthApp', `token`)
  }
  console.log('antes de inject')
  inject('authAppMakeToken', authAppMakeToken)
}