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

    <!-- <Header :height="$vuetify.breakpoint.xs ? 70 : 85" color="header" /> -->

    <v-main class="template-default-main">
      <nuxt />
    </v-main>
    <Footer />
    <DrawerAccess />
    <Galletas />
    <!-- <CmsInLayout /> -->
    <v-fab-transition>
      <v-btn
        color="primary"
        v-scroll="onScroll"
        v-show="fabButton"
        fixed
        fab
        style="bottom: 40px; opacity: 0.7"
        :style="$vuetify.breakpoint.xs ? 'bottom:100px' : ''"
        right
        to="#"
        @click="toTop"
      >
        <v-icon>keyboard_arrow_up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
// import CmsInLayout from "&/common/cms/admin/CmsInLayout";
import socket from "./socket-mixin.js";
import storeFiles from "./storeFiles-mixin.js";

export default {
  mixins: [socket, storeFiles],

  components: {
    // CmsInLayout,
    Galletas: () => import("@/layouts/parts/aviso-cookies"),

    Header: () => import("@/layouts/parts/header/default"),
    Footer: () => import("@/layouts/parts/Footer"),

    DrawerAccess: () => import("@/layouts/parts/drawerAccess/drawer"),
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
};
</script>

<style></style>
