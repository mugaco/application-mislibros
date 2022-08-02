<template>
  <div>
    <MainBanner class="baner-100" />
  <!-- <nuxt-link to="/inspire-subscription">Inspire (estoy en pages index)</nuxt-link> -->
    <Claim2 />
    <MultiFactor />
    <Claim1 />
    <Beneficios />
    <Funcionalidad />
    <Api />
    <Widget />
    <Planes :planes="planes" />
    <Contacto />
  </div>
</template>
<script>
export default {
  name: "Home",
  components: {
    MainBanner: () => import("@/components/mainBanner"),
    Claim1: () => import("@/components/home_sections/claim1"),
    Claim2: () => import("@/components/home_sections/claim2"),
    MultiFactor: () => import("@/components/home_sections/multiFactor"),
    Beneficios: () => import("@/components/home_sections/Beneficios"),
    Funcionalidad: () => import("@/components/home_sections/Funcionalidad"),
    Api: () => import("@/components/home_sections/api"),
    Widget: () => import("@/components/home_sections/widget"),
    // Planes: () => import("@/components/home_sections/Planes"),
    Planes: () => import("&/common/market-place/planes"),
    Contacto: () => import("@/components/home_sections/Contact"),
  },
  data() {
    return { planes: null };
  },
  mounted() {
    this.$subscriptorCan('c10')
    this.getPlanes();
  },
  methods: {
    getPlanes() {
      const subs = this.$store.state.planes.subscription;
      this.$axios
        .get(`market-place/products/admin/${subs}`)
        .then((response) => {
          // console.log('app por aqui')
          const product = JSON.parse(response.data.product.att);
          // console.log('pp', product)
          this.planes = product.stripe_product.plans;
        });
    },
  },
};
</script>
<style lang="scss">
// .baner-100 {
//   height: 100vh;
//   width: 100vw;
//   padding-top: 85px;
//   min-height: 850px;
//   @media (max-width: 600px) {
//     min-height: 0;
//   }
//   position: relative;
//   background-color: #6294f8;
// }
</style>
