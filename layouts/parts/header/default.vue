<template>
  <v-app-bar
    :color="color"
    :height="height"
    class="app-header"
    fixed
    app
    elevate-on-scroll
  >
    <v-container class="pa-0 fill-height">
      <Logo />

      <v-spacer />
      <div>
    
    

        <Cart />
        <Langs />
        <template v-if="!$store.state.user.logged">
          <v-btn
            @click="handleOpenDrawerAccess(1)"
            :plain="!$vuetify.breakpoint.xs"
            :color="$vuetify.breakpoint.xs ? 'primary' : ''"
          >
            {{ $t("login") }}
          </v-btn>
          <v-btn
            @click="handleOpenDrawerAccess(0)"
            color="primary"
            class="d-none d-sm-inline-block"
          >
            {{ $t("registrarse") }}
          </v-btn>
        </template>

        <v-menu v-else bottom offset-y left style="width: 200px !important">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="primary"
              :fab="$vuetify.breakpoint.xs"
              :small="$vuetify.breakpoint.xs"
              elevation="0"
            >
              {{ $vuetify.breakpoint.xs ? initials : nombre_cortado }}
            </v-btn>
          </template>

          <v-card class="text-center">
            <v-avatar color="primary" size="48" class="mt-8">
              <span class="white--text text-h5">{{ initials }}</span>
            </v-avatar>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{
                    $store.state.user.name
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    $store.state.user.email
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />

            <v-list>
              <v-list-item>
                <v-list-item-title class="pt-5">
                  <Logout @logout="logout">
                    <v-btn text>{{ $t("cuenta-cerrar-sesion") }}</v-btn>
                  </Logout>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title class="pt-5 pb-10">
                  <v-btn :to="localePath('/admin/cuenta')" outlined>{{
                    $t("gestionar-cuenta")
                  }}</v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    color: {
      required: true,
    },
    height: {
      default: () => {
        return 64;
      },
    },
  },
  name: "Header1",
  components: {
    Logo: () => import("@/layouts/parts/Logo"),
    Langs: () => import("./menu-langs"),
    Logout: () => import("&/common/pass-mongo-2/account/components/logout"),
    Cart: () => import("&/common/market-place/cart/badge"),
  },
  computed: {
    home() {
      if (this.$nuxt.$route.path == "/") {
        return true;
      }
      return false;
    },
    nombre_cortado() {
      const n = this.$store.state.user.name;
      if (n.length > 15) {
        return n.substring(0, 12) + "...";
      }
      return n;
    },
    initials() {
      let initials = "";
      if (this.$store.state.user.logged) {
        const n = this.$store.state.user.name.toUpperCase();
        const n_array = n.split(" ");
        if (n_array.length == 1) {
          initials = n.substring(0, 1).toUpperCase();
          if (n.length > 1) {
            initials += n.substring(1, 2).toLowerCase();
          }
        } else {
          initials =
            n_array[0].substring(0, 1).toUpperCase() +
            n_array[1].substring(0, 1).toUpperCase();
        }
      }
      return initials;
    },
  },
  methods: {
    logout() {
      this.$router.push(this.localePath("/"));
    },
    handleOpenDrawerAccess(val) {
      this.$store.commit("mod/setDrawerAccess", true);
      this.$store.commit("mod/setAccessMode", val);
    },
  },
};
</script>