<template>
  <v-container>
    <div v-if="mounted" class="wlibro-libreria-single-book">
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
      <h3>{{ $t("libreria") }}</h3>
      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="0">
            <v-card-text class="pa-15 pt-9 fill-height">
              <v-img
                contain
                class="libro-portada"
                v-if="portada"
                :src="portada"
                :alt="plus.title"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div>
            <div class="pl-15 pt-9 libro-titulo">
              {{ plus.title }}
            </div>
            <div class="pl-15 libro-autor">
              {{ plus.author }}
            </div>
            <div class="pl-15 libro-idioma">
              {{ $t("idioma") }}:
              <v-chip class="ma-2" color="#f4f4f4">
                {{ book_lang }}
              </v-chip>
            </div>
            <v-card-text class="pa-15 pt-9 fill-height">
              <v-row>
                <v-col
                  cols="12"
                  v-for="(item, index) in collection"
                  :key="index"
                >
                  <div>
                    <div>
                      <div class="formato">
                      {{$t('formato')}}:  <v-chip class="ma-2" color="#f4f4f4">{{ setFormat(item.format) }}</v-chip>
                      </div>
                      <Moneda
                        class="esta-moneda-class"
                        :amount="item.amount"
                        :iva="false"
                      />
                      <div style="min-height: 12px"></div>
                    </div>
                    <!-- <pre>{{ {added:$store.state.cart.added} }}</pre> -->
                    <div>
                      <v-btn color="accent" @click="$cart('add', item)" small>
                        <!-- outlined
                    block -->
                        {{ $t("anadir-al-carrito") }}
                      </v-btn>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  interdum magna vitae sapien pharetra convallis. Etiam gravida
                  ipsum nec tincidunt lobortis. Interdum et malesuada fames ac
                  ante ipsum primis in faucibus. Nulla iaculis mollis tincidunt.
                  Pellentesque id euismod sapien, eget convallis sem. Vivamus
                  bibendum tristique elit, hendrerit auctor orci viverra sit
                  amet. Phasellus cursus consectetur libero, nec tincidunt
                  ligula eleifend aliquet. Fusce eget orci vel ipsum laoreet
                  interdum sed pulvinar elit. Quisque a est eu metus rhoncus
                  condimentum. Integer et dolor turpis. Nulla et iaculis ipsum.
                  Praesent fermentum lacinia vulputate.
                </v-col>
              </v-row>
            </v-card-text>
          </div>
        </v-col>
      </v-row>
      <!-- <v-row>
        <v-col cols="12" v-for="(item, index) in collection" :key="index">
          <v-card>
            <pre>{{ item }}</pre>
            <v-card-title class="pl-15">
              {{ item.name[$store.state.user.lang] }}
            </v-card-title>
            <v-card-text class="pa-15 pt-9 fill-height">
              <img
                class="portada"
                v-if="plus"
                :src="item.portada"
                :alt="item.title"
              />
              <div class="descripcion">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                interdum magna vitae sapien pharetra convallis. Etiam gravida
                ipsum nec tincidunt lobortis. Interdum et malesuada fames ac
                ante ipsum primis in faucibus. Nulla iaculis mollis tincidunt.
                Pellentesque id euismod sapien, eget convallis sem. Vivamus
                bibendum tristique elit, hendrerit auctor orci viverra sit amet.
                Phasellus cursus consectetur libero, nec tincidunt ligula
                eleifend aliquet. Fusce eget orci vel ipsum laoreet interdum sed
                pulvinar elit. Quisque a est eu metus rhoncus condimentum.
                Integer et dolor turpis. Nulla et iaculis ipsum. Praesent
                fermentum lacinia vulputate.
              </div>
              <div class="formato">formato</div>
              <Moneda
                class="esta-moneda-class"
                :amount="item.amount"
                :iva="false"
              />
              <div style="min-height: 12px"></div>
               
              <v-btn color="primary" outlined @click="$cart('add', item)" block>
                {{ $t("comprar") }}
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row> -->
    </div>
  </v-container>
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
    plus: null,
  }),
  mounted() {
    // this.mounted = true;
    this.getCollection();
  },

  computed: {
    request() {
      return {
        resource: "Mugaco\\Book\\Models\\Book",
        resource_id: this.$store.state.book.book_id,
        embeded: "products",

        add: [
          "images",
          "title",
          "back_cover",
          "author",
          "about_author",
          "book_lang",
        ],
        // aggregation: JSON.stringify([
        //   {
        //     project: { name: 1, description: 1, amount: 1, images: 1, sms: 1 },
        //   },
        // ]),
      };
    },
    portada() {
      if (this.plus) {
        if (this.plus.images) {
          if (this.plus.images[0]) {
            return this.plus.images[0]["printUri"];
          }
        }
      }
      return false;
    },
    book_lang() {
      if (this.plus) {
        if (this.plus.book_lang) {
          if (this.plus.book_lang.toLowerCase() === "castellano") {
            return "Español";
          }
          return this.plus.book_lang;
        }
      }
      return false;
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
          this.plus = response.data.plus;
          this.mounted = true;
          // this.loading = false;
        });
    },
    setFormat(format) {
      if (format == "wlibro") {
        return this.$t("formato-wlibro");
      }
      if (format == "libro") {
        return this.$t("formato-libro");
      }
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