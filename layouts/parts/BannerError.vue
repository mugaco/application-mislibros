<template>
  <div class="text-center error-banner-message">
    <h4 class="banner-subtitle mr-0 font-weight-regular">
      {{ _title }}
    </h4>
    <div v-if="msg">
      {{ msg }}
    </div>
    <div class="mt-16 pt-2">
      <v-btn nuxt large :to="localePath('/')" color="primary" elevation="0">
        {{ this.$t("ir-a-inicio") }}
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "msg", "error"],
  name: "BannerError",
  data() {
    return {};
  },
  computed: {
    //lógica para que, si no hay título, el mensage pase a título
    _title() {
      if(this.title){
        return this.title;
      }else{
        if (this.error.title && this.error.message) {
          return this.error.title;
        } else if (this.error.title || this.error.message) {
          return this.error.title || this.error.message;
        } else if (!this.error.message) {
          return this.$t("error-generico");
        }
        }
    },
    _message() {
      if(this.msg){
        return this.msg
      }else{
        if (this.error.title && this.error.message) {
          return this.error.message;
        } else if (!this.error.title) {
          return;
        } 
      }
    },
  },
  methods: {},
};
</script>

<style>
.error-banner-message {
  position: fixed;
  height: 300px;
  width: 100%;
  top: calc(50% - 150px);
  left: 0;
}
</style>
