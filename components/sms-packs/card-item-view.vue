<template>
  <v-card class="mx-auto my-12" max-width="374">
    <!-- <pre>{{ imgFeatured }}</pre> -->
    <!-- <pre>{{ item.images }}</pre> -->
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->
    <!-- <v-card-text
      class="text-center grey d-flex flex-column align-center justify-center"
    >
      <v-img v-if="imgFeatured" :src="imgFeatured" height="200" width="200" />
    </v-card-text> -->
    <v-card-title>
      <span class="title-class">
        {{ item.name[$store.state.user.lang] }}
      </span>
    </v-card-title>

    <!-- <v-card-text> -->
      <!-- <v-row align="center" class="ma-4">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-row> -->

      <!-- <div style="margin-top: 10px; margin-bottom: 10px">
        <LimitHtml
          :html="item.description[$store.state.user.lang]"
          :limit="300"
        />
      </div> -->
          <!-- more="ver algo mas" -->
    <!-- </v-card-text> -->

    <!-- <v-divider class="mx-4"></v-divider>

    <v-card-title>{{ $t("precio-unidad") }}</v-card-title> -->

    <v-card-text>
      <Moneda class="title-class" :amount="item.amount" :iva="iva" />
      <!-- <div v-if="iva" v-text="$t('iva-incluido')" /> -->
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text @click="$cart('add', item)" block>
        {{ $t("comprar") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LimitHtml from "&/common/limit-html";

import Moneda from "&/common/moneda.vue";
export default {
  props: ["item", "headers", "iva"],
  components: {
    Moneda,
    LimitHtml,
  },
  computed: {
    imgFeatured() {
      if (this.item.images) {
        if (this.item.images[0]) return this.item.images[0]["printUri"]; //"https://previews.123rf.com/images/jovanas/jovanas1605/jovanas160500244/56353901-blue-square-icon-sms.jpg";
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.title-class {
  font-size: 1.5rem;
}
</style>