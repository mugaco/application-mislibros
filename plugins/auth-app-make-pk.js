import { pki } from "node-forge";
export default (app) => {
  const keypair = pki.rsa.generateKeyPair({ bits: 2048, workers: 2 })
  const publicKey = pki.publicKeyToPem(keypair.publicKey);
  app.store.commit('app/setPublicKey', publicKey)
  app.store.commit('app/setKeypair', keypair)

}