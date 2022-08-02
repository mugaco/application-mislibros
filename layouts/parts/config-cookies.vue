<template>
  <v-dialog v-model="dialog" width="70em">
    <v-card>
      <div class="d-flex justify-end">
        <v-btn icon @click="$emit('change', false)" fixed fab>
          <v-icon>close</v-icon>
        </v-btn>
      </div>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12" md="6">
            <v-tabs
              v-model="tab"
              color="primary"
              :centered="$vuetify.breakpoint.width < 768"
              :vertical="$vuetify.breakpoint.width > 767"
            >
              <v-tab
                v-for="(tab, i) in tabs"
                :key="i"
                :class="{ tab: $vuetify.breakpoint.width > 767 }"
              >
                <v-icon :left="$vuetify.breakpoint.width > 767">
                  {{ tab.button.icon }}
                </v-icon>
                <span v-if="$vuetify.breakpoint.width > 767">
                  {{ tab.button.name }}
                </span>
              </v-tab>
            </v-tabs>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="0">
              <v-card-text>
                <div v-text="tabs[tab].button.name" class="text-h2" />
                <br />
                <span v-html="tabs[tab].message" />
                <v-switch
                  v-if="tabs[tab].switch"
                  v-model="tabs[tab].switch.active"
                  :disabled="tabs[tab].switch.required"
                  :label="
                    tabs[tab].switch.active ? $t('activado') : $t('desactivado')
                  "
                  color="primary"
                />
              </v-card-text>
            </v-card>
            <v-card-actions>
              <v-spacer />

              <v-btn
                v-text="$t('activar-todo')"
                @click="acceptAll"
                color="primary"
              />
              <v-btn
                @click="accept"
                v-text="$t('guardar-ajustes')"
                color="primary"
                :class="$vuetify.breakpoint.mobile ? 'mt-2' : null"
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "config-cookies",
  props: ["value"],
  model: {
    prop: "value",
    event: "change",
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
  },
  data() {
    return {
      tab: 0,

      tabs: [
        {
          button: {
            icon: "mdi-security",
            name: this.$t("resumen-de-privacidad"),
          },
          message: this.$t("resumen-de-privacidad-message"),
        },
        {
          button: {
            icon: "mdi-check-circle-outline",
            name: this.$t("cookies-estrictamente-necesarias"),
          },
          message: this.$t("cookies-estrictamente-necesarias-message"),
          switch: {
            required: true,
            active: true,
          },
        },
        {
          button: {
            icon: "mdi-square-rounded-badge-outline",
            name: this.$t("cookies-de-terceros"),
          },
          message: this.$t("cookies-de-terceros-message"),
          switch: {
            required: false,
            active: true,
          },
        },
      ],
    };
  },
  methods: {
    acceptAll() {
      this.$emit("accept-all");
      this.$emit("change", false);
    },
    accept() {
      this.$emit("accept");
      this.$emit("change", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.tab {
  justify-content: start !important;
}
</style>