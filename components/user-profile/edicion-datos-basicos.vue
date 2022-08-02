<template>
  <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
    <v-card-title class="pl-15">
      <h3>{{$t('menu-cuenta-datos-basicos')}}</h3>
    </v-card-title>
    <v-card-text class="pr-15 pl-15  fill-height">
      <v-row>
        <v-col cols="12" class="pt-0">
          <Name editable />
          <Password editable />
          <Info />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Name from "&/common/pass-mongo-2/account/components/name";
import Password from "&/common/pass-mongo-2/account/components/password";
import Info from "&/common/market-place/planes/suscribir-plan/info-plan-and-cancel.vue";

export default {
  name: "profile-card",
  components: {
    Name,
    Password,
    Info,
  },
  data: () => ({
    mounted: false,
  }),
  mounted() {
    this.mounted = true;
  },
  props: {
    user: { required: true },
  },
  computed: {
    nombrePlan() {
      if (!this.$store.state.planes.cplanes) {
        return null;
      }
      let r = "base";
      const cplanes = this.$store.state.planes.cplanes;
      if (this.$store.state.user.subscription) {
        const keys = Object.keys(cplanes);
        // -------
        const stripe_price = this.$store.state.user.subscription.stripe_price;

        keys.forEach((ke) => {
          if (cplanes[ke]["price"]["base_imponible"] != 0) {
            if (cplanes[ke]["price"]["prices"]) {
              const st = cplanes[ke]["price"]["prices"].find(
                (e) => stripe_price == stripe_price
              );
              if (st) {
                r = cplanes[ke]["price"]["name"];
              }
            }
          }
        });
      }
      return this.$t("plan-x", {
        plan: cplanes[r]["nombre"][this.$i18n.locale],
      });
    },
  },
};
</script>   

<style lang="scss" scoped>
.user-name {
  font-size: 1.75rem;
}
.user-email {
  font-size: 0.75rem;
}
</style>