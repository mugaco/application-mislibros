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
      <!-- <pre>{{ $store.state.book }}</pre> -->
      <nuxt />
    </v-main>
    <!-- <Footer />
    <DrawerAccess />
    <Galletas /> -->
    <!-- <CmsInLayout /> -->
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fabButton"
        color="transparent"
        fixed
        fab
        style="top: 40px; opacity: 1"
        left
        small
        @click="$store.commit('book/setMostrar_portada', true)"
      >
        <v-icon small>mdi-book-heart-outline</v-icon>
      </v-btn>
    </v-fab-transition>
    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fabButton"
        color="transparent"
        fixed
        fab
        style="top: 40px; opacity: 1"
        right
        small
        @click="$store.commit('wp/setShowControl', true)"
      >
        <v-icon small>mdi-cog-outline</v-icon>
      </v-btn>
    </v-fab-transition>
    <!-- :style="$vuetify.breakpoint.xs ? 'bottom:100px' : ''" -->
  </v-app>
</template>

<script>
// import CmsInLayout from "&/common/cms/admin/CmsInLayout";
// import socket from "./socket-mixin.js";
// import storeFiles from "./storeFiles-mixin.js";

export default {
  // mixins: [socket, storeFiles],

  // components: {
  //   // CmsInLayout,
  //   Galletas: () => import("@/layouts/parts/aviso-cookies"),

  //   Header: () => import("@/layouts/parts/header/default"),
  //   Footer: () => import("@/layouts/parts/Footer"),

  //   DrawerAccess: () => import("@/layouts/parts/drawerAccess/drawer"),
  // },
  data: () => ({
    overlay: true,
    fabButton: true,
    oldValue: 0,
    newValue: 0,
  }),
  mounted() {
    this.overlay = false;
    // function killCopy(e) {
    //   return false;
    // }
    // function reEnable() {
    //   return true;
    // }
    document.onselectstart = new Function("return false");
    // if (window.sidebar) {
    //   document.onmousedown = killCopy;
    //   document.onclick = reEnable;
    // }
  },
  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      // ---------
      this.newValue = window.pageYOffset || e.target.scrollTop || 0;
      if (this.oldValue < this.newValue) {
        this.fabButton = false;
      } else if (this.oldValue > this.newValue) {
        this.fabButton = true;
      }
      this.oldValue = this.newValue;
    },
  },
};
</script>

<style></style>
