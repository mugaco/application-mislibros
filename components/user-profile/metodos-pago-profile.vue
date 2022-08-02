<template>
  <div>
    <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
      <v-card-title class="pl-15">
        <h3>{{ $t("metodos-de-pago") }}</h3>
      </v-card-title>
      <v-card-text class="pr-15 pl-15 fill-height">
        <Metodos />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Metodos from "&/common/market-place/metodos-de-pago/gestion-metodos.vue";

export default {
  name: "metodos-pago-en-profile",

  components: {
    Metodos,
  },
  data: () => ({
    mounted: false,
  }),

  mounted() {
    this.mounted = true;
  },
};
</script>   

<style lang="scss" scoped>
</style>