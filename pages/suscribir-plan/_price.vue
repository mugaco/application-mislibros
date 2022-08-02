<template>
  <!-- <div> -->
  <!-- <pre>{{ price }}</pre> -->
  <!-- <pre>{{ $store.state.planes.data.planes }}</pre> -->

    <Suscribir :price="price" />

  <!-- </div> -->
</template>
<script>
import Suscribir from "&/common/market-place/planes/suscribir-plan/index.vue";

export default {
  name: "PricingSuscribir",
  // layout: "home",
  // middleware: "pass",
  asyncData({ params, store }) {
    // console.log("price", params);
    let price = null;
    if (typeof params.price !== "undefined") {
      // price = params.price;
      // console.log("price", price);
      price = store.state.planes.data.planes[params.price]["price"];
    }
    return {
      price: price,
    };
  },
  components: { Suscribir },
};
</script>
