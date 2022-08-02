<template>
  <div>
    <!-- <v-card-title class="text-h3 justify-space-arround">
      {{ $t("creditos-sms") }}
    </v-card-title> -->

    <v-row class="tee">
      <v-col cols="12" sm="6">
        <v-card dark color="info">
          <v-card-title> {{ $t("suscripcion") }} </v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h1" cols="12" align="center">
                {{ by_subscription }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card dark color="info">
          <v-card-title> {{ $t("adquiridos") }} </v-card-title>
          <v-card-text>
            <v-row align="center">
              <v-col class="text-h1" cols="12" align="center">
                {{ by_purchase }}
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script>
export default {
  mounted() {
    this.getCreditos();
  },
  data: () => ({
    by_subscription: 0,
    by_purchase: 0,
  }),
  methods: {
    getCreditos() {
      this.$axios.get("filegun/get-info-credits-sms").then((response) => {
        this.by_subscription = response.data.credit.by_subscription;
        this.by_purchase = response.data.credit.by_purchase;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>