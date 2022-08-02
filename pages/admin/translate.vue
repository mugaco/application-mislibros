<template>
  <Trans />
</template>

<script>
import Trans from "@/components/translate-app";
export default {
  middleware: "is-admin",
  components: {
    Trans,
  },
};
</script>

<style lang="scss" scoped>
</style>