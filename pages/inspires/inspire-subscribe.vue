<template>
  <v-row no-gutters style="height: 100vh">
    <v-col cols="11" md="8" lg="10">
      
        <v-stepper non-linear>
          <v-stepper-header>
            <v-stepper-step editable step="1">
              Select campaign settings
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step editable step="2">
              Create an ad group
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable> Create an ad </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      

      <v-row> </v-row>
    </v-col>
    <v-col cols="1" md="4" lg="2" style="background-color: #0001">
      <h1>Plan X</h1>
    </v-col>
  </v-row>
</template>

<script>
export default {
  mounted() {
    this.$store.commit("mod/setDrawerMenu", false);
  },
};
</script>

<style lang="scss" scoped>
</style>