<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="d-flex align-center">
      <div class="text-center">
        <h2 class="banner2-title font-weight-light" v-html="msg"></h2>

        <h2>{{ $t("introducir-pin") }}</h2>
        <div class="mt-16 pt-2">
          <v-text-field outlined v-model="pin" :label="`Pin`"></v-text-field>

          <v-btn
            large
            class="btn-custom-lg btn-arrow"
            depressed
            color="error"
            elevation="0"
            @click="$emit('pin', pin)"
          >
            <span>{{ $t("enviar") }}</span>
            <v-icon small >arrow_forward</v-icon>
          </v-btn>
        </div>
        <div class="mt-16 pt-2">
          <v-alert v-if="errorMsg" type="error">{{ errorMsg }}</v-alert>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "EnviarPin",
  props: ["to-name", "error-msg", "doc-name", "sender-name", "sms", "phone"],
  computed: {
    msg() {
      if (this.sms) {
        return this.$t(
          "gracias-toname-ya-solo-falta-que-proporciones-el-pin-que-se-te-ha-enviado-por-sms-al-numero-de-telefono-phone",
           { toName: this.toName, phone: this.phone }
        );
      }
      return this.$t(
        "gracias-toname-ya-solo-falta-que-proporciones-el-pin-que-te-ha-hecho-llegar-sendername",
        { toName: this.toName, senderName: this.senderName }
      );
    },
  },
  data: () => ({
    pin: null,
  }),
};
</script>

<style lang="scss" scoped>
</style>