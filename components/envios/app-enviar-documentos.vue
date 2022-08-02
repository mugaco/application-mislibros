<template>
  <div class="mini-spacer" style="padding-top: 0px; padding-bottom: 0px">
    <v-container>
      <SendDocuments @success="$emit('reload')"/>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    SendDocuments: () => import("@/components/upload-files/sendDocuments"),
  },
};
</script>

<style lang="scss" scoped>
</style>