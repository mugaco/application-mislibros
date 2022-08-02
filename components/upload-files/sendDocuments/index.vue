<template>
  <div class="pb-16">
    <!-- TÍTULO -->
    <v-row justify="center">
      <v-col cols="12" md="10" lg="7" class="text-center">
        <h2 class="section-title font-weight-medium">
          {{
            !$store.state.files.success
              ? $t("input-drawer-titulo")
              : $t("input-drawer-titulo-success-user")
          }}
        </h2>
      </v-col>
    </v-row>

    <!-- CUERPO ENVÍO ARCHIVOS -->
    <v-row justify="center" v-if="!$store.state.files.success" :class="{'pt-16': !$vuetify.breakpoint.mobile}">
      <v-col v-if="$store.state.files.noUserSendWindow == 1" cols="12" lg="6" class="pb-0 pt-9">
        <Files />
      </v-col>

      <v-col cols="12" lg="6">
        <Form @success="$emit('success')" />
      </v-col>
    </v-row>

    <!-- CUERPO MENSAJE RESUMEN -->
    <v-row v-else style="text-align: center; max-width: 700px; margin: auto">
      <v-col>
        <h5
          v-html="$store.state.files.successMessage"
          class="font-weight-regular font-18"
        />
        <h5
          v-html="$store.state.files.successPin"
          class="font-weight-regular font-18"
        />
        <v-btn
          autofocus
          @click="$store.dispatch('files/reset')"
          color="primary"
        >
          {{ $t("aceptar") }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
    
   

<script>
export default {
  name: "SendDocuments",

  components: {
    Form: () => import("./formulario"),
    Files: () => import("./files"),
  },
};
</script>

<style lang="scss">
</style>