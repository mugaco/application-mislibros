<template>
  <div id="contacto">
    <div class="mini-spacer">
      <v-container>
        <v-snackbar
          top
          rounded
          v-model="snackbar.active"
          :timeout="snackbar.timeout"
          :color="snackbar.color"
        >
          {{ snackbar.text }}
          <template v-slot:action="{ attrs }">
            <v-btn icon text v-bind="attrs" @click="resetSnackbar">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>

        <v-row justify="center">
          <v-col cols="12">
            <div>
              <h1 class="mt-0">{{ $t("contacta-titulo") }}</h1>
              <form>
                <v-row class="mt-15">
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      :label="this.$t('contacta-nombre') + ' *'"
                      outlined
                      v-model="name"
                      :placeholder="this.$t('contacta-nombre')"
                      @focus="nameError = ''"
                      :error-messages="nameError"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      :label="this.$t('contacta-correo') + ' *'"
                      outlined
                      type="email"
                      v-model="email"
                      :placeholder="this.$t('contacta-correo')"
                      @focus="emailError = ''"
                      :error-messages="emailError"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      :label="this.$t('telefono')"
                      outlined
                      type="number"
                      v-model="phone"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field
                      :label="this.$t('company')"
                      outlined
                      type="text"
                      v-model="company"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" class="py-0">
                    <v-textarea
                      :label="this.$t('contacta-mensaje') + ' *'"
                      outlined
                      v-model="message"
                      rows="3"
                      @focus="messageError = ''"
                      :error-messages="messageError"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row style="align-items: end">
                  <v-col cols="12" sm="6" class="py-0">
                    <AceptarLegal v-model="agree" :submit-clicked="submitClicked" />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-btn
                      block
                      @click="sendContactForm"
                      style="margin-top: 2em"
                      color="primary"
                      elevation="0"
                      :loading="sending"
                      :outlined="!agree"
                    >
                      {{ $t("contacta-boton") }}
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
import AceptarLegal from "&/common/aceptar-legal.vue";
export default {
  name: "Contacto",
  components: {
    AceptarLegal,
  },
  data() {
    return {
      submitClicked: false,
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      message: "",
      messageError: "",
      phone: null,
      company: "",

      agree: false,

      sending: false,

      snackbar: {
        active: false,
        text: "",
        timeout: 4000,
        color: "",
      },
    };
  },
  computed: {
    disabledButton() {
      let word = /[\wçÇñÑ]{3,}/;
      // let nameVal = word.test(this.name);
      return (
        !word.test(this.name) ||
        !word.test(this.email) ||
        !word.test(this.message)
      );
    },
  },

  methods: {
    resetSnackbar() {
      this.snackbar.active = false;
      this.snackbar.text = "";
      this.snackbar.timeout = 4000;
    },
    resetVars() {
      this.name = "";
      this.email = "";
      this.message = "";
      this.phone = "";
      this.company = "";
    },
    sendContactForm() {
      this.submitClicked = !this.submitClicked;
      if (!this.agree) {
        // this.agreeError = this.$t("agree-error-invalid");
        return;
      }
      this.sending = true;
      this.$axios
        .post("filegun/contact-form/info", {
          name: this.name,
          email: this.email,
          message: this.message,
          phone: this.phone,
          company: this.company,
        })
        .then((response) => {
          // console.log(response);
          this.sending = false;
          this.resetVars();
          this.snackbar.active = true;
          this.snackbar.text = this.$t("contacta-snackbar-sucess");
          this.snackbar.color = "primary";
        })
        .catch((error) => {
          this.sending = false;
          if (error.response.status == "422") {
            if (error.response.data.errors.name === "name required") {
              this.nameError = this.$t("contacta-nombre-requerido");
            }
            if (error.response.data.errors.message === "message required") {
              this.messageError = this.$t("contacta-mensaje-requerido");
            }
            if (error.response.data.errors.email === "email required") {
              this.emailError = this.$t("contacta-correo-requerido");
            } else if (error.response.data.errors.email === "email invalid") {
              this.emailError = this.$t("contacta-correo-no-valido");
            }
          } else {
            this.snackbar.active = true;
            this.snackbar.text = this.$t("contacta-snackbar-error");
            this.snackbar.color = "error";
          }
        });
    },
  },
};
</script>
