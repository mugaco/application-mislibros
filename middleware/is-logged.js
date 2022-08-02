
export default function ({
  store,
  redirect,
  app

}) {
  if (store.state.user.logged !== true) {
    redirect(app.localePath("/"))
  }

  return false
}