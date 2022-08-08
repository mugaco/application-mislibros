<template>
  <div id="claim2" class="bg-claim2 mini-spacer">
    <v-container>
      <v-row justify="end">
        <v-col cols="12" md="9" lg="6">
          <v-card
            color="primary"
            :elevation="0"
            class="fg-card fg-card-chaflan"
          >
            <div
              class="fg-card-subtitle white-text"
              style="font-family: roobertsemibold"
            >
              {{ $t("claim2") }}
            </div>
            <div
              class="fg-card-subtitle white-text"
              style="font-family: roobertregular"
            >
              {{ $t("claim2-1") }}
            </div>

            <div
              class="fg-card-subtitle white-text"
              style="font-family: roobertregular"
            >
              {{ $t("claim2-2") }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "claim2",
};
</script>
<style lang="scss">
.bg-claim2 {
  background-color: rgb(221, 221, 221);
  @media (min-width: 600px) {
    background-image: url("&/theme/assets/imagenes/filegunClaim1.jpg");
    // background-image: url("&/theme/assets/imagenes/f1.png");
    background-repeat: no-repeat;
    background-position: left;
    background-size: 60% auto;
    // background-size: cover;
  }

  /* background: black url('&/theme/assets/imagenes/filegun-b3.png') cover right top; */
}
</style>
