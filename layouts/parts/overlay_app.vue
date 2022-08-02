<template>
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
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: ["overlay"],
};
</script>

