<template>
  <div id="beneficios" style="background-color: #ededed">
    <div class="mini-spacer">
      <v-container>
        <v-row justify="start">
          <v-col cols="12" md="10" lg="7">
            <h1>{{ $t("beneficios") }}</h1>
          </v-col>
        </v-row>

        <v-row justify="center" class="mt-13" style="align-items: stretch">
          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-responsive"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-responsive") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-compartir-docs"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-compartir") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-api"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-api") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-escudo-black"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-seguro") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-nodos-location"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-tracking") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="4">
            <v-card
              color="transparent"
              class="fg-card-beneficios"
              :elevation="0"
            >
              <i class="beneficios fg-icon-ajustes"></i>
              <v-card-title class="fg-card-subtitle black-text">
                <div>
                  {{ $t("beneficios-personalizacion") }}
                </div>
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "Beneficios",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.beneficios {
  width: 60px;
  height: 50px;
  background-size: 60px 50px;
  margin: 20px;
}
</style>
