import ContentIs from '&/common/cms/js/content-info'

export default function ({
  store,
  params,
  app
}) {
  // console.log(params)
  const content = new ContentIs(store.state.web.web, app.i18n.locale, params)
  // console.log('esto ya no va')
  // console.log(content)
  store.commit('web/setContentInfo', content.contentInfo)
  // console.log(content.contentInfo)
  
  return false
}