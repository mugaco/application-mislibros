<template>
  <Banner :msg="msg" :title="title" />
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      status: params.status,
    };
  },
  computed: {
    title() {
      if (this.status == "has_expired") {
        return this.$t("esta-pagina-ha-caducado");
      }
      else if (this.status == "bad_token") {
        return this.$t("esta-pagina-ha-caducado");
      }
      else if (this.status == "to_many_errors") {
        return this.$t("error");
      }
      else if (this.status == "document_deleted") {
        return this.$t("no-disponible");
      }
      
    },

    msg() {
      if (this.status == "has_expired") {
        return this.$t("esta-pagina-ha-caducado-msg");
      }
      else if (this.status == "bad_token") {
        return this.$t("esta-pagina-ha-caducado-msg");
      }
      else if (this.status == "to_many_errors") {
        return this.$t("muchos-errores-acumulados-al-activar-la-descarga");
      }
      else if (this.status == "document_deleted") {
        return this.$t("el-documento-ya-no-esta-disponible");
      }
    },
  },
  components: {
    Banner: () => import("@/layouts/parts/BannerError"),
  },
};
</script>