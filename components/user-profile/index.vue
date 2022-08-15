<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <ProfileCard :user="$store.state.user" />
      </v-col>
      <v-col cols="12" lg="6">
        <EdicionDatosBasicos :user="$store.state.user" />
      </v-col>
      <!-- <v-col cols="12" lg="6" v-if="$store.state.user.subscription">
        <InfoCreditos />
      </v-col> -->
      <!-- <v-col cols="12" lg="6">
        <ComprarSms v-if="$store.state.user.subscription" />
      </v-col> -->
      <v-col cols="12" lg="6" v-if="$store.state.user.delivery_address">
        <DireccionEntrega
          v-if="$store.state.user.delivery_address"
          :title="$t('direccion-de-entrega')"
          :address="$store.state.user.delivery_address"
        />
      </v-col>
      <v-col cols="12" lg="6" v-if="$store.state.user.fiscal_data">
        <Direccion
          v-if="$store.state.user.fiscal_data"
          :title="$t('direccion-de-facturacion')"
          :address="$store.state.user.fiscal_data"
        />
      </v-col>
      <v-col cols="12" lg="6">
        <MetodosPagoProfile v-if="$store.state.user.subscription" />
      </v-col>
    </v-row>

    <!-- <ProfileCard :user="user2" />
    <pre>{{$store.state.user}}</pre> -->
  </v-container>
</template>

<script>
export default {
  name: "admin-cuenta",
  layout: "admin",
  components: {
    // MetodosPagoProfile: () =>
    //   import("@/components/user-profile/metodos-pago-profile.vue"),
    ProfileCard: () => import("@/components/user-profile/profile-card.vue"),
    Direccion: () => import("@/components/user-profile/direccion-fiscal.vue"),
    DireccionEntrega: () => import("@/components/user-profile/direccion-entrega.vue"),
    // ComprarSms: () =>
    //   import("@/components/user-profile/comprar-creditos-sms.vue"),
    EdicionDatosBasicos: () =>
      import("@/components/user-profile/edicion-datos-basicos.vue"),
    // InfoCreditos: () =>
    //   import("@/components/user-profile/info-creditos-sms.vue"),
  },
  data: () => ({}),
};
</script>