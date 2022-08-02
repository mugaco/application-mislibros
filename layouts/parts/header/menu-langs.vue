<template>
  <v-menu
    bottom
    origin="top center"
    transition="scale-transition"
    ref="menulangs"
    offset-y
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        dark
        class="btn-select-lang-menu-lang"
      >
        <v-icon color="black">translate</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="handleSelect(locale.code)"
      >
        <v-list-item-title>{{ locale.name }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "langs",
  methods: {
    handleSelect(code) {
      this.$axios.setHeader("Request-lang", code);
      this.$router.push(this.switchLocalePath(code));
      this.$vuetify.lang.current = code;
      this.$store.commit("user/setLang", code);
    },
  },
  beforeDestroy() {
    this.$refs.menulangs.activatorNode = null;
  },
  computed: {
    availableLocales() {
      return this.$i18n.locales;
      // return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-select-lang-menu-lang {
  opacity: 0.5;
  &:hover {
    opacity: 1;
  }
}
.v-list {
  padding: 0;
}
</style>