<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="d-flex align-center">
      <div class="text-center">
        <h2
          class="banner2-title font-weight-light"
          v-html="
            $t('gracias-toname-ya-tienes-disponible-bla-descargab-de-docname', {
              toName: toName,
            })
          "
        ></h2>
        <ul style="list-style-type: none">
          <li>
            {{ $t("documento") }}: <strong> {{ docName }} </strong>
          </li>
          <li>
            {{ $t("tipo") }}: <strong> {{ docType }}</strong>
          </li>
          <li>
            {{ $t("tamano") }}: <strong> {{ niceBytes(docSize) }}</strong>
          </li>
        </ul>

        <div class="mt-16 pt-2">
          <v-btn
            large
            class="btn-custom-lg btn-arrow"
            depressed
            color="accent"
            elevation="0"
            @click="$emit('descargar')"
          >
            <span>{{ $t("descargar") }}</span>
            <v-icon small >arrow_forward</v-icon>
          </v-btn>
        </div>
        <div class="mt-16 pt-2">
          <!-- <v-alert dismissible v-if="errorMsg" type="error">{{
            errorMsg
          }}</v-alert> -->
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Descargar_doc",
  props: ["to-name", "error-msg", "doc-name", "doc-type", "doc-size"],
  data: () => ({
    math_result: null,
  }),
  methods: {
    niceBytes(x) {
      const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
      let l = 0,
        n = parseInt(x, 10) || 0;
      while (n >= 1024 && ++l) {
        n = n / 1024;
      }
      return n.toFixed(n < 10 && l > 0 ? 1 : 0) + " " + units[l];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>