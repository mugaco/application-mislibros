<template>
  <div>

    <FiscalForm v-model="showDrawer" />
    <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
      <v-card-title class="pl-15">
        <h3>{{ title }}</h3>
        <v-btn icon @click="showDrawer = true">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="pr-15 pl-15 fill-height">
        <v-row>
          <!-- <pre>{{ address }}</pre> -->
          <v-col cols="12">
            <!-- <v-list> -->
            <v-row>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("name") }}
                </div>
                <div class="address-title">
                  {{ name }}
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("nif") }}
                </div>
                <div class="address-title">
                  {{ nif }}
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("country") }}
                </div>
                <div class="address-title">
                  {{ country_name }}
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("provincia") }}
                </div>
                <div class="address-title">
                  {{ provincia }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("poblacion") }}
                </div>
                <div class="address-title">
                  {{ poblacion }}
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("postal_code") }}
                </div>
                <div class="address-title">
                  {{ postal_code }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("address") }} 1
                </div>
                <div class="address-title">
                  {{ address0 }}
                </div>
              </v-col>
              <v-col cols="12" sm="6" class="pt-0">
                <div class="address-subtitle">
                  {{ $t("address") }} 2
                </div>
                <div class="address-title">
                  {{ address1 }}
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import FiscalForm from "&/common/market-place/form-fiscal-data/form-in-drawer.vue";
export default {
  name: "direccion",
  props: ["title", "address"],
  components: {
    FiscalForm,
  },
  data: () => ({
    mounted: false,
    showDrawer: false,
    loading: false,
  }),
  computed: {
    name() {
      if (this.address) {
        return this.address.name;
      }
      return null;
    },
    nif() {
      if (this.address) {
        return this.address.nif;
      }
      return null;
    },
    country_name() {
      if (this.address) {
        return this.address.country.name;
      }
      return null;
    },
    provincia() {
      if (this.address) {
        return this.address.provincia;
      }
      return null;
    },
    poblacion() {
      if (this.address) {
        return this.address.poblacion;
      }
      return null;
    },
    postal_code() {
      if (this.address) {
        return this.address.postal_code;
      }
      return null;
    },
    address0() {
      if (this.address) {
        return this.address.address;
      }
      return null;
    },
    address1() {
      if (this.address) {
        return this.address.address1;
      }
      return null;
    },
  },
  mounted() {
    this.mounted = true;
  },


};
</script>   

<style lang="scss" scoped>
.address-title {
  font-size: 1.1rem;
}
.address-subtitle {
  font-size: 0.75rem;
}
</style>