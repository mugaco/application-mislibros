<template>
  <v-navigation-drawer
    overlay-color="black"
    :overlay-opacity="0.5"
    v-model="drawer"
    app
    touchless
    :dark="true"
    :clipped="false"
       src="https://i.picsum.photos/id/201/200/300.jpg?hmac=Tx2yx6Oeoo9q0lVwstbf0IaJXW4CFkKJgjpRVnSpNyU"
  >
       <!-- :src="require('&/common/cms/images/portfolio/libro1.jpg')" -->
    <template v-slot:img="props">
      <v-img :gradient="`to bottom, ${barColor}`" v-bind="props" />
    </template>
    <v-row style="height: 100%; flex-direction: column">
      <v-col style="flex-grow: 0" class="mt-8 ml-8">
        <Logo white clas/>
      </v-col>

      <v-divider />

      <v-col style="flex-grow: 1; overflow-y: auto;">
        <Menu />
      </v-col>

      <v-col style="flex-grow: 0; display:flex">
        <div style="margin: auto ">
          <span style ="font-size: 14px; color: #aaa; position: relative; bottom: 7px; padding-right: 4px"> powered by </span> 
          <img id="logo" src="/q.png" alt="quartup-logo" />
        </div>
      </v-col>

    </v-row>
  </v-navigation-drawer>
</template>
<script>
import Menu from "./recursiveMenu.vue";
import Logo from "@/layouts/parts/Logo.vue";

export default {
  name: "Drawer",
  components: {
    Menu,
    Logo
  },

  computed: {
  
    barImage() {
      // return this.$store.state.app.barImage;
      return null;
    },
    drawer: {
      get() {
        return this.$store.state.mod.drawerMenu;
      },
      set(val) {
        this.$store.commit("mod/setDrawerMenu", val);
      },
    },
    barColor() {
      return "red"
      // return this.$store.state.app.barColor;
    },
  },
};
</script>
<style lang="scss">
// .draw-active-item {
//   color: #316ce8 !important; 
//   & .v-icon{
//     color: #316ce8 !important;
//   }
// }
// .active-menu-user {
//   /* background: #73AD21; */
//   color: white !important;
// }
// .menu-user_avatar-text {
//   font-size: 0.8em !important;
// }
// .active-menu-user_avatar-avatar {
//   background-color: rgba(255, 255, 255, 0.5) !important;
// }
</style>