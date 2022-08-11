import les from '&/locales/es/locales.json'
import lca from '&/locales/ca/locales.json'
import len from '&/locales/en/locales.json'

import lles from '@/locales/es/locales.json'
import llca from '@/locales/ca/locales.json'
import llen from '@/locales/en/locales.json'

export default async ({ app, store }) => {
  const services = ['quartup.filegun', 'mugaco.market-place', 'mugaco.pass-mongo-2'];
  store.commit("translate/setServices", services);
  const res = await app.$axios.get('translate/get-app-locales', {
    params: {
      'services': JSON.stringify(services),
      'langs': JSON.stringify(['es', 'ca', 'en'])
    }
  })

  const messages = res.data.messages
  messages.es.locales = les;
  messages.ca.locales = lca;
  messages.en.locales = len;

  messages.es.llocales = lles;
  messages.ca.llocales = llca;
  messages.en.llocales = llen;

  app.$axios.setHeader(
    "Request-lang",
    app.i18n.locale
  );
  const langs = Object.keys(messages);
  langs.forEach((lang) => {
    app.i18n.setLocaleMessage(lang, {
      ...messages[lang]['filegun'],
      ...messages[lang]['market-place'],
      ...messages[lang]['pass-mongo-2'],
      ...messages[lang]['locales'],
      ...messages[lang]['llocales'],

    });
  });
}