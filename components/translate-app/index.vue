<!--
READ ME:

1 - Pasar prop a 'Locales' con el nombre del servicio.

2 - Habilitar variable $store.services en archivo translate.js
    Definirla y guardarla en el archivo i18n.js
    Define otros servicios de los que se pueden usar y editar los locales

3 - Añadir en rest-api-master/config/translate.php un item al array 'services' con;
     ·El nombre del servicio  
     ·Las lenguas a las que se quiere traducir
-->


<template>
  <v-container style="padding:0px">
    <Locales 
    service_name="quartup.filegun"
    />
  </v-container>
</template>

<script>
export default {
  components: {
    Locales: () => import("./components/locales.vue"),
  },
};
</script>