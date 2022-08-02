
export default function ({
  store,
  redirect,
  app

}) {
  if (store.state.user.is_admin == false) {
    redirect(app.localePath("/"))
  }

  return false
}