<template>
  <div class="banner2-component">
    <v-container v-if="loading">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </v-container>
    <v-container v-else>
      <IntroducirPin
        v-if="requirePin"
        :to-name="toName"
        :doc-name="docName"
        :error-msg="errorMsg"
        :sender-name="senderName"
        :sms="pin_sms"
        :phone="pin_phone"
        @pin="sendPin"
      />
      <Descargar
        v-else-if="!downloaded"
        :to-name="toName"
        :doc-name="docName"
        :doc-type="docType"
        :doc-size="docSize"
        :error-msg="errorMsg"
        @descargar="descargar"
      />
      <v-row v-else>
        <v-col class="text-center">
          <h2
          class="banner2-title font-weight-light"
        > {{$t('documento-descargado')}}</h2>
          <h4>{{$t('gracias-por-utilizar-filegun')}}</h4>

        <div class="mt-16 pt-2">
          <v-btn
            large
            color="primary"
            elevation="0"
            @click="newFile"
          >
            <span>{{ $t("hacer-un-envio") }}</span>
          </v-btn>
        </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import IntroducirPin from "./introducir-pin";
import Descargar from "./vista-descargar";
export default {
  name: "Descarga",
  props: [
    "token",
    "sender-name",
    "to-name",
    "doc-name",
    "doc-type",
    "doc-size",
  ],
  components: {
    Descargar,
    IntroducirPin,
  },
  computed: {
    errorMsg() {
      if (this.error) {
        if (this.error.error == "try_again") {
          return this.$t("intentar-de-nuevo");
        }
        if (this.error.error == "too_many_tries") {
          return this.$t("se-acumulan-demasiados-intentos-fallidos");
        }
        return this.$t("esta-pagina-ha-caducado");
      }
      return null;
    },
  },
  mounted() {
    this.RetrieveDocFromApp();
    this.loading = true;
  },
  data: () => ({
    response: null,
    error: null,
    requirePin: false,
    pin_sms: false,
    pin_phone: false,
    sender_name: null,
    to_name: null,
    newToken: null,
    loading: false,
    downloaded: false,
  }),
  methods: {
    newFile(){
      this.$router.push(this.localePath('/'));
      this.$store.commit("mod/setDrawerUploadFiles", true)
    },
    RetrieveDocFromApp() {
      this.$axios
        .get(`/filegun/prepare-download/${this.token}`)
        .then((response) => {
          this.requirePin = response.data.requirePin;
          this.pin_phone = response.data.phone;
          this.newToken = response.data.token;
          this.loading = false;
        });
    },

    sendPin(pin) {
      this.$axios
        .post(`/filegun/pin-resolution`, {
          pin: pin,
          token: this.newToken,
        })
        .then((response) => {
          this.requirePin = response.data.pin;
          this.newToken = response.data.token;
        })
        .catch((error) => {
          this.error = error.response.data;
          if (error.response.data.error) {
            if (error.response.data.error == "too_many_tries") {
              this.$router.push("/link/to_many_errors");
            }
            if (error.response.data.error == "has expired") {
              this.$router.push("/link/has_expired");
            }
          }
        });
    },
    descargar() {
      const link = document.createElement("a");
      link.href = `${process.env.apiUrl}/filegun/download-file/${this.newToken}`;
      link.click();
      link.remove();
      setTimeout(() => {
        this.downloaded = true;
      }, 2000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>