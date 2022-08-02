<template>
  <div class="logo" :class="{'icon': icon}" @click="$vuetify.goTo(0)">
    <NLink :to="localePath('/')" >
      <v-img
        :src="require(`&/theme/assets-filegun/Logo/svg/${name}`)"
        alt="logo filegun"
      />
    </NLink>
  </div>
</template>

<script>
export default {
  name: "Logo",
  props: {
    white: Boolean,
    icon: Boolean,
  },
  computed: {
    name() {
      if (this.white) {
        if (this.icon) {
          return "simbol-white.svg";
        }
        return "logo-white.svg";
      }
      if (this.icon) {
        return "simbol-black.svg";
      }
      return "logo-black.svg";
    },
  },
};
</script>

<style lang="scss">
.logo a {
  display: flex;
  max-width: 190px;
  @media (max-width:440px){
    max-width: 135px;
  }
  max-height: 45px;
  & .v-image__image--cover {
    background-size: contain;
  }
}
.icon a {
  max-width: 45px;
}
</style>