<template>
  <div>
    <ConfigCookies
      v-model="showConfig"
      @accept-all="aceptCookies"
      @accept="aceptCookies"
    />
    <v-bottom-sheet :value="cookies" persistent overlay-color="white"  >
      <v-sheet class="sheet" >
        <v-container class="custom">
          <p v-html="$t('aviso-cookies-mensaje')" class="mb-10"/>
          <div class="d-flex py-30">
            <v-spacer></v-spacer>

            <v-btn
              @click="aceptCookies"
              color="primary"
              v-text="$t('aceptar')"
            />
            <v-btn
              @click="showConfig = true"
              v-text="$t('ajustes')"
              class="ml-2"
            />
          </div>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "aviso-cookies",
  components: {
    ConfigCookies: () => import("./config-cookies.vue"),
  },

  methods: {
    aceptCookies() {
      this.$cookies.set("accepted-cookies", 1, {
        path: "/",
        maxAge: 60 * 60 * 24 * 1000,
        //maxAge: 10
      });
      this.cookies = false;
      this.reject = false;
    },
    rejectCookies() {
      // console.log("rechazamos");
      this.reject = true;
      // this.cookies = false;
    },
    configCookies() {
      console.log("configuramos");
    },
  },

  mounted() {
    if (typeof this.$cookies.get("accepted-cookies") === "undefined") {
      this.cookies = true;
    }
  },

  data() {
    return {
      urlCookies: process.env.politicaDeCookies,
      showConfig: false,
      reject: false,
      cookies: false,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },
};
</script>

<style lang="scss" scope>
.sheet {
  background-color: rgba(225, 225, 225, 0.8) !important;
}
.custom{
  padding: 25px !important;
}
// .fg-cookies {
//   position: fixed !important;
//   padding: 1em;
//   bottom: 0px;
//   left: 0px;
//   width: 100vw;
//   .v-btn {
//     margin: 1em;
//     width: 120px;
//   }
// }
</style>