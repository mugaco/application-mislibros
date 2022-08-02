export default ({ app }) => {
  console.log('fi',Math.floor(Date.now() / 1000))
  app.$authAppMakeToken('init')
}




