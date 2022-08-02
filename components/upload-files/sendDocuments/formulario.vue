<template>
  <div class="hide-details__responsive">
    <v-window v-model="windowModel" touchless style="margin-bottom: 1em">
      <v-window-item
        @keyup.ctrl.enter="_send"
        :value="1"
        style="padding-top: 4px; padding-bottom: 8px; overflow: visible"
      >
        <!-- AUTOCOMPLETE -->
        <v-row v-if="$subscriptorCan('c11')">
          <v-col cols="12" class="col-form__responsive mt-xs-5">
            <Autocomplete
              v-model="contactModel"
              :json="jsonAutoContact"
              :errorMessages="contactModel_error"
              @focus="contactModel_error = ''"
              ref="contacts"
            />
          </v-col>
        </v-row>

        <!-- FORMULARIO BASICO -->
        <v-row v-else>
          <!-- Si no está logado, identificamos al sender -->
          <v-col v-if="!$store.state.user.logged" cols="12" md="6">
            <v-text-field
              v-model="sender_email"
              :label="`${$t('email-remitente')} *`"
              :error-messages="sender_email_error"
              @focus="sender_email_error = []"
              autofocus
              :dense="$vuetify.breakpoint.mobile"
              outlined
              autocomplete="off"
            />
            <v-text-field
              v-model="sender_name"
              :label="`${$t('nombre-remitente')} *`"
              :dense="$vuetify.breakpoint.mobile"
              :error-messages="sender_name_error"
              @focus="sender_name_error = []"
              outlined
              autocomplete="off"
            />
          </v-col>

          <v-col
            cols="12"
            :md="!$store.state.user.logged ? 6 : 12"
            class="col-form__responsive"
          >
            <v-text-field
              v-model="to_email"
              :label="`${$t('email-destinatario')} *`"
              :error-messages="to_email_error"
              @focus="to_email_error = []"
              :autofocus="!!$store.state.user.logged"
              :dense="$vuetify.breakpoint.mobile"
              outlined
            />
            <v-text-field
              v-model="to_name"
              :label="`${$t('nombre-destinatario')} *`"
              :error-messages="to_name_error"
              @focus="to_name_error = []"
              :dense="$vuetify.breakpoint.mobile"
              outlined
            />
          </v-col>
        </v-row>

        <v-row>
          <!-- ENVIAR PIN -->
          <v-col cols="12" class="col-form__responsive py-0">
            <!-- checkbox -->
            <v-row class="align-center my-0">
              <v-col cols="auto" class="py-0">
                <v-checkbox
                  class="hide-details__responsive"
                  :dense="$vuetify.breakpoint.xs"
                  v-model="pinRequired"
                  :label="labelPin"
                  off-icon="check_box_outline_blank"
                  on-icon="check_box"
                ></v-checkbox>
              </v-col>
              <v-col cols="auto" class="pa-0">
                <v-btn icon small @click="pinInfo = !pinInfo">
                  <v-icon small>info_outline</v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <!-- info pin -->
            <v-expand-transition>
              <v-row v-if="pinInfo" class="mt-md-n4">
                <v-col cols="12" class="pt-0">
                  <v-alert
                    dense
                    text
                    @click="pinInfo = false"
                    outlined
                    icon="info_outline"
                    class="text--secondary"
                  >
                    {{ $t("info-pin") }}
                  </v-alert>
                </v-col>
              </v-row>
            </v-expand-transition>
          </v-col>

          <!-- ENVIAR SMS -->
          <v-expand-transition>
            <v-col
              v-if="pinRequired && $subscriptorCan('c7')"
              cols="12"
              class="col-form__responsive py-0"
            >
              <!-- checkbox -->
              <v-row class="align-center my-0">
                <v-col cols="auto" class="py-0">
                  <v-checkbox
                    class="hide-details__responsive"
                    :dense="$vuetify.breakpoint.xs"
                    v-model="pinSms"
                    :label="$t('enviar-pin-por-sms')"
                    off-icon="check_box_outline_blank"
                    on-icon="check_box"
                    :error-messages="errorSms"
                  ></v-checkbox>
                </v-col>
                <v-col cols="auto" class="pa-0">
                  <v-btn icon small @click="pinSmsInfo = !pinSmsInfo">
                    <v-icon small>info_outline</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-expand-transition>
                <v-row v-if="pinSmsInfo" class="mt-md-n4">
                  <v-col cols="12" class="pt-0">
                    <v-alert
                      dense
                      text
                      @click="pinSmsInfo = false"
                      outlined
                      icon="info_outline"
                      class="text--secondary"
                    >
                      {{ $t("info-pin-sms") }}
                    </v-alert>
                  </v-col>
                </v-row>
              </v-expand-transition>
            </v-col>
          </v-expand-transition>

          <input v-if="pinRequired" type="hidden" v-model="pin" />

          <!-- MENSAJE -->
          <v-col class="col-form__responsive" cols="12">
            <v-textarea
              :rows="$vuetify.breakpoint.mobile ? '3' : '5'"
              outlined
              :label="$t('anadir-mensaje')"
              v-model="message"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-window-item>

      <!-- PIN DE VALIDACIÓN DEL CORREO PARA NO USERS -->
      <v-window-item @keyup.ctrl.enter="_send" :value="2">
        <div class="text-h4 text-center px-16" _style="word-break: unset">
          {{ $t("pin-enviado-titulo", { email: sender_email }) }}
        </div>
        <v-text-field
          class="my-16"
          type="number"
          hide-spin-buttons
          v-model="codigoValidacion"
          outlined
          clearable
          @keyup.enter="validarPIN"
          autofocus
          tabindex="1"
          :disabled="codigoValidacion_disabled"
          :label="$t('pin-label')"
          :placeholder="$t('pin-placeholder')"
          :error-messages="codigoValidacion_error"
          :error-count="2"
          @focus="codigoValidacion_error = []"
        />
        <v-alert
          v-if="codigoValidacion_disabled"
          type="error"
          text
          prominent
          dense
        >
          {{ $t("registro-pin-bloqueado") }}
        </v-alert>
      </v-window-item>
    </v-window>

    <v-row>
      <v-col
        v-if="!$store.state.user.logged && windowModel == 1"
        cols="12"
        style="text-align: center; color: #00000099; font-size: 14px"
        class="py-0 mt-4"
      >
        {{ $t("al-enviar-aceptas") }}
        <a target="blank" :href="terminosYCondiciones">{{
          $t("terminos-y-condiciones")
        }}</a>
        {{ $t("y") }}
        <a target="blank" :href="politicaDePrivacidad">{{
          $t("politica-privacidad")
        }}</a>
      </v-col>
      <v-col cols="12">
        <v-btn
          :loading="loading"
          :disabled="!!$store.state.files.filesUploading"
          block
          color="primary"
          elevation="0"
          @click="_send"
        >
          {{
            $store.state.user.logged || codValToken
              ? $t("enviar-seguro")
              : codigoValidacion_disabled
              ? $t("volver")
              : $t("continuar")
          }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <SecureIcons />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  components: {
    Autocomplete: () => import("&/common/formulario/inputs/json-autocomplete"),
    SecureIcons: () => import("./secureIcons.vue"),
  },
  watch: {
    pinSms() {
      this.errorSms = "";
    },
    pinRequired(val) {
      if (val) {
        this.pin = parseInt(10000 + Math.random() * 90000);
      } else {
        this.pinSms = false;
        this.pin = null;
      }
    },
  },
  computed: {
    labelPin() {
      if (this.pinRequired) {
        return this.$t("proteger-la-descarga-con-el-pin-pin", {
          pin: this.pin,
        });
      }
      return this.$t("proteger-la-descarga-con-un-pin");
    },
    windowModel: {
      get() {
        return this.$store.state.files.noUserSendWindow;
      },
      set(val) {
        this.$store.commit("files/setNoUserSendWindow", val);
      },
    },

    jsonAutoContact() {
      return {
        // check:true,

        label: this.$t("contactos"),
        // label: "Contactos",
        outlined: true,

        resource: "Quartup\\Filegun\\Models\\Contact",
        // returnObject: true,
        // aggregation:{
        //   project:{
        //     name:1,
        //     email:1,
        //     phone:1
        //   }
        // },
        permanent: {
          // deleted: false,
          // tenant_id: "624c0d6c647bce6bdf4402cb",
          user_id: this.$store.state.user.user_id,
        },
        fill: "user/setTemp_value",
        searchBy: ["name", "email"],
        itemText: ["name", "email"],
        aggregation: [{ project: { name: 1, email: 1, phone: 1 } }],
        // returnObject:true,
        multiple: true,
        itemKey: "_id",
        add: {
          name: this.$t("contacto"),

          resource: "Quartup\\Filegun\\Models\\Contact",
          model: {
            name: null,
            email: null,
            user_id: this.$store.state.user.user_id,
          },
          validation: {
            name: ["required"],
            email: ["required", "email"],
          },
          form: [
            {
              component: "input",
              props: {
                auto: "store-state-user-temp_value",
                key: "name",
                label: this.$t("nombre"),
                cols: {
                  cols: 12,
                  md: 12,
                  sm: 3,
                },
              },
            },
            {
              component: "input",
              props: {
                key: "email",
                label: this.$t("email"),
                cols: {
                  cols: 12,
                  md: 6,
                  sm: 3,
                },
              },
            },
            {
              component: "input-phone",
              props: {
                key: "phone",
                label: this.$t("telefono"),
                cols: {
                  cols: 12,
                  md: 6,
                  sm: 3,
                },
              },
            },
          ],
        },
      };
    },
  },
  data: () => ({
    avisoLegal: process.env.avisoLegal,
    terminosYCondiciones: process.env.terminosYCondiciones,
    politicaDePrivacidad: process.env.politicaDePrivacidad,
    errorSms: "",

    contactModel: [],
    contactModel_error: [],

    to_name: null,
    to_name_error: null,
    to_email: null,
    to_email_error: null,

    sender_name: null,
    sender_name_error: null,
    sender_email: null,
    sender_email_error: null,

    message: null,

    //Validación Email
    codigoValidacion: null,
    codigoValidacion_error: [],
    codigoValidacion_disabled: false,
    codValToken: null,

    pinRequired: false,
    pin: null,
    pinInfo: false,
    pinSms: false,
    pinSmsInfo: false,

    loading: false,
  }),
  methods: {
    resetData() {
      this.contactModel = [];
      this.contactModel_error = [];
      this.to_name = null;
      this.to_name_error = null;
      this.to_email = null;
      this.to_email_error = null;
      this.sender_name = null;
      this.sender_name_error = null;
      this.sender_email = null;
      this.sender_email_error = null;
      this.message = null;
      this.pin = null;
      this.codigoValidacion = false;
      this.codigoValidacion_error = [];
      this.codigoValidacion_disabled = false;
      this.codValToken = null;
      this.pinRequired = false;
      this.pin = null;
      this.pinInfo = false;
      this.pinSms = false;
      this.pinSmsInfo = false;
      this.loading = false;
    },

    successMessage(data) {
      // Procesamos los datos para mostrar
      this.$store.commit("files/setSuccess", true);

      let emails = "";
      if (data.contacts.length > 1) {
        let em = [];
        data.contacts.forEach((c) => {
          em.push("'" + c.email + "'");
        });
        let lastEm = em.pop();
        emails = em.join(", ") + " " + this.$t("y") + " " + lastEm;
      } else {
        emails = data.contacts[0].email;
      }

      this.$store.commit(
        "files/setSuccessMessage",
        this.$t("el-envio-se-realizo-correctamente", {
          email: emails,
        })
      );
      if (this.pinRequired) {
        this.$store.commit(
          "files/setSuccessPin",
          this.$t("el-pin-para-descargar-es", {
            pin: this.pin,
          })
        );
      }
    },

    getContactErrorMessage(err) {
      const validacion = "validacion CONTACTOS --> ";
      let message = "";

      //Errores si no se reciben contactos en el formato esperado.
      if (err == "contacts required") {
        console.error(
          validacion + "La petición no contiene el campo <contactos>"
        );
      } else if (err == "array expected") {
        console.error(
          validacion + "El campo <contactos> tiene que ser un array"
        );
      } else if (err == "array empty") {
        console.error(validacion + "El campo <contactos> és un array vacío");
        message += this.$t("field-es-requerido");
      } else {
        Object.entries(err).forEach(([contact, err]) => {
          let contact_message = contact + " ";
          let hay_errores = false;
          if (err.email == "invalid") {
            contact_message += this.$t("error-contacto-no-valido");
            hay_errores = true;
          }
          if (err.name == "required") {
            contact_message +=
              (hay_errores ? ", " : "") + this.$t("error-contacto-no-nombre");
            hay_errores = true;
          }
          if (err.phone == "required") {
            contact_message +=
              (hay_errores ? ", " : "") + this.$t("error-contacto-no-telefono");
            hay_errores = true;
          } else if (err.phone == "invalid") {
            contact_message +=
              (hay_errores ? " " + this.$t("y") + " " : "") +
              this.$t("error-contacto-telefono-no-valido");
            hay_errores = true;
          }
          if (hay_errores) {
            message += contact_message + ".  ";
          }
        });
      }
      return message;
    },
    manageFileError(e) {
      if (e == "required") {
        this.$store.commit(
          "files/setError",
          this.$t("input-drawer-error-no-archivos")
        );
      } else if (e == "to_many_files") {
        this.$store.commit(
          "files/setErrorTooMany",
          // "Demasiados archivos"
          this.$t("input-error-demasiados-archivos")
        );
        console.error("aaa", e);
      } else if (e.total_max_size) {
        this.$store.commit(
          "files/setError",
          this.$t("el-archivo-excede-el-tamano-permitido", {
            sizeMax: e.total_max_size,
          })
        );
      }
    },
    manageErrorsEnvioSimple(e) {
      if (e.file) {
        this.manageFileError(e.file);
      }
      if (e.contacts) {
        if (e.contacts.name) {
          this.to_name_error = this.$t("field-es-requerido");
        }
        if (e.contacts.email == "required") {
          this.to_email_error = this.$t("field-es-requerido");
        } else if (e.contacts.email == "invalid") {
          this.to_email_error = "email invalid";
        }
      }
      if (e.sender) {
        if (e.sender.name) {
          this.sender_name_error = this.$t("field-es-requerido");
        }
        if (e.sender.email == "required") {
          this.sender_email_error = this.$t("field-es-requerido");
        } else if (e.sender.email == "invalid") {
          this.sender_email_error = "email invalid";
        }
      }
    },

    _send() {
      // Para evitar envios mientras se cargan o modifican datos,
      // El botón se puede desactivar, pero el Cntl.Enter no
      if (!(this.loading || !!this.$store.state.files.filesUploading)) {
        if (this.$subscriptorCan("c11")) {
          this.envioMultiple();
        } else if (this.$store.state.user.logged) {
          this.envioSimple();
        } else {
          if (this.codigoValidacion_disabled) {
            this.windowModel = 1;
            this.resetData();
          }
          if (this.codValToken) {
            this.validarPinNoUser();
          } else {
            this.validarEmailNoUser();
          }
        }
      }
    },
    validarEmailNoUser() {
      var form = {
        sender: {
          name: this.sender_name,
          email: this.sender_email,
        },
        contacts: [
          {
            name: this.to_name,
            email: this.to_email,
          },
        ],
        paths: JSON.stringify(this.$store.state.files.paths),
      };
      // Opcionales
      if (this.message) {
        form.message = this.message;
      }
      if (this.pinRequired) {
        form.pin = this.pin;
      }
      this.loading = true;
      this.$axios
        .post("filegun/envio-simple-validar-email", form)
        .then((res) => {
          this.codValToken = res.data.token;
          this.windowModel = 2;
        })
        .catch((error) => {
          this.manageErrorsEnvioSimple(error.response.data.error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    validarPinNoUser() {
      this.loading = true;
      this.$axios
        .post("filegun/envio-simple-comprobar-pin", {
          pin: this.codigoValidacion,
          token: this.codValToken,
        })
        .then((res) => {
          this.windowModel = 1;
          this.successMessage(res.data);
          this.resetData();
        })
        .catch((error) => {
          let err = error.response.data.error;
          if (err == "bad token") {
            this.codigoValidacion_disabled = true;
            this.codValToken = null;
            this.codigoValidacion_error = this.$t("pin-error-token-invalid");
          } else if (err == "has expired") {
            this.codigoValidacion_disabled = true;
            this.codValToken = null;
            this.codigoValidacion_error = this.$t("pin-error-token-expired");
          } else if (err.pin == "required") {
            this.codigoValidacion_error = this.$t("pin-error-required");
          } else if (err.pin == "invalid") {
            this.codigoValidacion_error =
              this.$tc("pin-error-invalid") +
              ", " +
              this.$tc("quedan-intentos", err.attempts);
            this.codValToken = err.token;
          } else if (err.pin == "blocked") {
            this.codigoValidacion_error = [
              this.$tc("pin-error-invalid") +
                ", " +
                this.$tc("quedan-intentos", 0),
              this.$t("pin-error-blocked"),
            ];
            this.codigoValidacion_disabled = true;
            this.codValToken = null;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    envioSimple() {
      const contacts = [
        {
          name: this.to_name,
          email: this.to_email,
        },
      ];

      // Obligatorias en todos los casos
      var form = {
        contacts: contacts,
        paths: JSON.stringify(this.$store.state.files.paths),
      };

      // Opcionales
      if (this.message) {
        form.message = this.message;
      }
      if (this.pinRequired) {
        form.pin = this.pin;
      }

      this.loading = true;
      this.$axios
        .post("filegun/envio-simple-user", form)
        .then((res) => {
          this.successMessage(res.data);
          this.resetData();
          // alert('success')
        })
        .catch((error) => {
          this.errorSms = "foox";
          this.manageErrorsEnvioSimple(error.response.data.error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    envioMultiple() {
      var form = {
        contacts: this.$refs.contacts.items,
        // contacts: this.contactModel,
        paths: JSON.stringify(this.$store.state.files.paths),
      };

      // Opcionales
      if (this.message) {
        form.message = this.message;
      }
      if (this.pinRequired) {
        form.pin = this.pin;
      }
      if (this.pinSms) {
        form.pinSms = 1;
      }

      this.loading = true;
      this.$axios
        .post("filegun/envio-multiple-user", form)
        .then((res) => {
          this.successMessage(res.data);
          this.resetData();
          this.$emit("success");

        })
        .catch((error) => {
          let err = error.response.data.error;
          if (err === "no credit sms") {
            this.errorSms = this.$t("no-tienes-suficiente-credito");
          }
          if (err === "sms no disponible") {
            this.errorSms = this.$t("servicio-temporalmente-no-disponible");
          }

          if (err.file) {
            this.manageFileError(err.file);
          }

          if (err.contacts) {
            this.contactModel_error = this.getContactErrorMessage(err.contacts);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
.v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  font-size: 14px;
}
</style>