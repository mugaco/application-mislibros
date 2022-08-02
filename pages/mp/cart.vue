<template>
  <v-container>
    <Ticket
      :actions="true"
      _key="_id"
      :group="true"
      name="name"
      amount="amount"
      description="description"
      :iva="false"
    />
    <LiTotales />
  </v-container>
</template>

<script>
import Ticket from "&/common/market-place/cart/ticket";
import LiTotales from "&/common/market-place/cart/ticket/li-totales";
export default {
  components: { Ticket, LiTotales },
  layout:"default"
};
</script>

<style lang="scss" scoped>
</style>