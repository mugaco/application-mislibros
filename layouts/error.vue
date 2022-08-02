<template>
  <v-main>
    <Banner :error="error"/>
  </v-main>
</template>

<script>
export default {
  // layout: "empty",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  components: {
    Banner: () => import("@/layouts/parts/BannerError")
  },
  data() {
    return {
      pageNotFound: this.$t('pagina-no-encontrada'),
      otherError: this.$t('error-generico'),
      msg: this.$t('error-generico'),
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title
    };
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
