<template>
  <div id="funcionalidad" style="background-color: #b7c0cb">
    <div class="mini-spacer">
      <v-container>
        <!-- -----------------------------------------------
            Start Feature 1 Text
        ----------------------------------------------- -->
        <v-row justify="start">
          <v-col cols="12" md="10" lg="7">
            <h1>{{ $t("funcionalidad") }}</h1>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Feature 1 Text
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
            Start Feature 1
        ----------------------------------------------- -->
        <v-row justify="center" class="mt-13" style="align-items: stretch">
          <v-col cols="12" sm="6" lg="3">
            <v-card
              color="primary"
              class="fg-card-chaflan fg-card-funcionalidad"
              :elevation="0"
            >
              <v-card-title class="fg-card-subtitle white-text">
                <i class="fg-icon-nube-arriba funcionalidades"></i>
                <span>{{ $t("funcionalidad-envia-titulo") }}</span>
              </v-card-title>
              <div class="fg-card-text white-text">
                {{ $t("funcionalidad-envia-descripcion") }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card
              color="primary"
              class="fg-card-chaflan fg-card-funcionalidad"
              :elevation="0"
            >
              <v-card-title class="fg-card-subtitle white-text">
                <i class="fg-icon-nube-abajo funcionalidades"></i>
                <span>{{ $t("funcionalidad-recibe-titulo") }}</span>
              </v-card-title>
              <div class="fg-card-text white-text">
                {{ $t("funcionalidad-recibe-descripcion") }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card
              color="primary"
              class="fg-card-chaflan fg-card-funcionalidad"
              :elevation="0"
            >
              <v-card-title class="fg-card-subtitle white-text">
                <i class="fg-icon-candado-doc funcionalidades"></i>
                <span>{{ $t("funcionalidad-privacidad-titulo") }}</span>
              </v-card-title>
              <div class="fg-card-text white-text">
                {{ $t("funcionalidad-privacidad-descripcion") }}
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" lg="3">
            <v-card
              color="primary"
              class="fg-card-chaflan fg-card-funcionalidad"
              :elevation="0"
            >
              <v-card-title class="fg-card-subtitle white-text">
                <i class="fg-icon-escudo funcionalidades"></i>
                <span>{{ $t("funcionalidad-seguridad-titulo") }}</span>
              </v-card-title>
              <div class="fg-card-text white-text">
                {{ $t("funcionalidad-seguridad-descripcion") }}
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- -----------------------------------------------
            End Feature 1
        ----------------------------------------------- -->
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "Funcionalidad",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.funcionalidades {
  width: 90px;
  height: 90px;
  background-size: 90px 90px;
}
</style>