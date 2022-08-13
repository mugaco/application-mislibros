<template>
  <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
    <!-- <pre>{{$store.state.user}}</pre> -->
    <v-snackbar
      :timeout="1000"
      v-model="snackbar"
      absolute
      top
      color="primary"
      right
      text
    >
      {{ text }}
    </v-snackbar>
    <v-card-title class="pl-15">
      <h3>{{ $t("menu-compra-sms") }}</h3>
    </v-card-title>
    <v-card-text class="pa-15 pt-9 fill-height">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          v-for="(item, index) in collection"
          :key="index"
        >
          <div class="este-title-class">
            {{ item.name[$store.state.user.lang] }}
          </div>
          <Moneda
            class="esta-moneda-class"
            :amount="item.amount"
            :iva="false"
          />
          <div style="min-height: 12px"></div>
          <!-- <pre>{{ {added:$store.state.cart.added} }}</pre> -->
          <v-btn color="primary" outlined @click="$cart('add', item)" block>
            {{ $t("comprar") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
// import json from "@/components/cruds/sms_packs.json";
// import Crud from "&/common/crud";
import Moneda from "&/common/moneda.vue";

export default {
  name: "profile-card",
  components: {
    Moneda,
    // Crud,
  },
  watch: {
    "$store.state.cart.added"() {
      this.snackbar = true;
      this.text = this.$t("item-anadido");
    },
  },
  data: () => ({
    // json: json,
    snackbar: false,
    text: null,
    mounted: false,
    collection: null,
  }),
  mounted() {
    // this.mounted = true;
    console.log("la gran cagada");
    this.getCollection();
  },

  computed: {
    request() {
      return {

        resource: "Mugaco\\Book\\Models\\Book",
        resource_id: this.$store.state.book.book_id,
        embeded:"products"
        // aggregation: JSON.stringify([
        //   {
        //     project: { name: 1, description: 1, amount: 1, images: 1, sms: 1 },
        //   },
        // ]),
      };
    },
  },
  methods: {
    getCollection() {
      this.loading = true;

      this.$axios
        .get("crud-collection-mongo/get-embeded", {
          params: this.request,
        })
        .then((response) => {
          // this.totalFilteredRows = response.data.totalFilteredRows;
          this.collection = response.data.collection;
          this.mounted = true;
          // this.loading = false;
        });
    },
  },
};
</script>   

<style lang="scss" scoped>
.este-title-class {
  font-size: 1.2rem;
  margin-bottom: 15px;
}
.esta-moneda-class {
  font-weight: bold;
  min-height: 12px;
}
</style>