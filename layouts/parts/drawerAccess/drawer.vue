<template>
  <v-navigation-drawer
    v-model="ver_drawer"
    temporary
    right
    :width="$vuetify.breakpoint.mobile ? '100%' : '40%'"
    touchless
    app
  >
    <!-- CLOSE BUTTON -->
    <v-btn @click="ver_drawer = false" absolute right icon>
      <v-icon>close</v-icon>
    </v-btn>

    <div class="py-0 py-sm-16">
      <v-row style="justify-content: center; margin-top: 50px">
        <v-col style="flex-grow: 0">
          <Logo />
        </v-col>
      </v-row>
      <Auth style="max-width: 500px; margin: auto" @login="login" />
    </div>
  </v-navigation-drawer>
</template>
    
   

<script>
import Auth from "&/common/pass-mongo-2/access";
import Logo from "@/layouts/parts/Logo";

export default {
  name: "drawer-access",
  components: {
    Auth,
    Logo,
  },
  computed: {
    ver_drawer: {
      get() {
        return this.$store.state.mod.drawerAccess;
      },
      set(val) {
        this.$store.commit("mod/setDrawerAccess", val);
      },
    },
  },
  methods: {
    login() {
      setTimeout(() => {
        this.$store.commit("mod/setDrawerAccess", false);
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>