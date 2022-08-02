<template>
  <v-navigation-drawer
    v-model="verDrawer"
    temporary
    right
    :width="$vuetify.breakpoint.mobile ? '100%' : '80%'"
    app
    style="z-index: 200"
  >
    <v-btn
      style="position: absolute; top: 0.5em; right: 0.5em; z-index: 999"
      @click="verDrawer = false"
      icon
    >
      <v-icon>close</v-icon>
    </v-btn>

    <div class="mini-spacer pt-0 pt-xs-16" _style="padding-top: 0px;">
      <v-container>
        <SendDocuments />
      </v-container>
    </div>
  </v-navigation-drawer>
</template>
    
   

<script>

export default {

  name: "DrawerSend",

  components: {
    SendDocuments: () => import("./sendDocuments"),
  },

  computed: {
    verDrawer: {
      get() {
        return this.$store.state.mod.drawerUploadFiles;
      },
      set(val) {
        this.$store.commit("mod/setDrawerUploadFiles", val);
      },
    },
  },
};
</script>

<style lang="scss">

</style>