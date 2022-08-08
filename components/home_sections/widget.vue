<template>
  <div id="widget" class="bg-widget">
    <div class="mini-spacer">
      <v-container>
        <v-row justify="start">
          <v-col cols="12" md="10" lg="7">
            <v-card
              color="primary"
              :elevation="0"
              class="fg-card fg-card-chaflan"
            >
              <v-card-title class="fg-card-title white-text">
                 {{$t('widget-title')}}
              </v-card-title>
              <div class="fg-card-subtitle white-text">
                {{$t('widget-desc')}}
              </div>
              <v-btn
                to="#contacto"
                class="cta"
                outlined
                rounded
                color="white"
                elevation="0"
              >
                {{$t('cta-contacta')}}
              </v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "Widget",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="scss">
.bg-widget {
  background-color: #b7c0cb;
  @media (min-width:600px){
    background-image: url("&/theme/assets/imagenes/f1.png");
    // background-image: url("&/theme/assets/imagenes/f2.png");
    background-repeat: no-repeat;
    background-position: right;
    background-size: auto 100%;
  }
}
</style>
