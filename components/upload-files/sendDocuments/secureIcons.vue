<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-row justify="center">
        <v-col cols="auto" class="pa-0">
          <i class="secure fg-icon-end-to-end"></i>
        </v-col>
        <v-col
          cols="auto"
          class="pa-0 description"
          style="line-height: 1.1; margin: auto"
        >
          <div><strong> End-to-End </strong></div>
          <div>Encryption</div>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="auto">
      <v-row justify="center">
        <v-col cols="auto" class="pa-0">
          <i class="secure fg-icon-gdpr"></i>
        </v-col>
        <v-col
          cols="auto"
          class="pa-0 description"
          style="line-height: 1.1; margin: auto"
        >
          <div><strong>GDPR compliant </strong></div>
          <div>Technology</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.secure {
  width: 48px;
  height: 48px;
  background-size: 48px 48px;
  @media (max-width: 600px) {
    width: 32px;
    height: 32px;
    background-size: 32px 32px;
  }
}
.description {
  @media (max-width: 600px) {
    font-size: 12px;
  }
}
</style>