<template>
  <v-navigation-drawer v-model="drawer" app class="drawer-app-menu-pal">
    <template v-slot:prepend> <Header /></template>
    <Menu />
    <template v-slot:append><Footer /></template>
  </v-navigation-drawer>
</template>

<script>
import Menu from "./recursiveMenu.vue";
import Header from "./header";
import Footer from "./footer";

export default {
  name: "Drawer",
  components: {
    Menu,
    Footer,
    Header,
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.mod.drawerMenu;
      },
      set(val) {
        this.$store.commit("mod/setDrawerMenu", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>