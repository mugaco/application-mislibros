<template>
  <v-app dark>
    <v-overlay
      color="header"
      :opacity="1"
      :absolute="false"
      :value="overlay"
      :z-index="100"
    >
      <v-progress-circular
        indeterminate
        size="32"
        width="2"
        color="primary"
      ></v-progress-circular>
    </v-overlay>

    <Header :height="$vuetify.breakpoint.xs ? 70 : 85" color="header"> </Header>

    <v-main class="template-admin-main" :style="`margin-left:${marginLeft}`">
      <!-- <pre>{{ { id: $store.state.cms.publicationIdMounted } }}</pre> -->
      <!-- <pre>{{ $vuetify.breakpoint.mobile }}</pre> -->
      <nuxt />
    </v-main>
    <!-- <Footer /> -->
    <DrawerMenu />
    <Galletas />

    <!-- <CmsInLayout /> -->

    <v-fab-transition>
      <v-btn
        color="primary"
        v-scroll="onScroll"
        v-show="fabButton"
        fixed
        fab
        bottom
        right
        @click="toTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import socket from "./socket-mixin.js";
import storeFiles from "./storeFiles-mixin.js";

export default {
  mixins: [socket, storeFiles],
  name: "layaut-admin",
  components: {
    Galletas: () => import("@/layouts/parts/aviso-cookies"),
    Header: () => import("@/layouts/parts/header/admin"),
    // Footer: () => import("@/layouts/parts/Footer"),
    DrawerMenu: () => import("./parts/drawerMenu"),
    // CmsInLayout,
  },
  data: () => ({
    overlay: true,
    fabButton: false,
  }),
  mounted() {
    this.overlay = false;
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const scrollTop = window.pageYOffset || e.target.scrollTop || 0;
      const scrollBottom =
        document.body.clientHeight - (window.pageYOffset + window.innerHeight);
      this.fabButton = scrollTop > 100 && scrollBottom > 100;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
  computed: {
    marginLeft() {
      if (!this.$vuetify.breakpoint.mobile) {
        if (this.$store.state.mod.drawerMenu) {
          return "250px";
        }
      }
      return "0px";
    },
  },
};
</script>

<style style>
</style>
