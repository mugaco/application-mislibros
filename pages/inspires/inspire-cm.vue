<template>
  <v-card>
    <v-card-text>
      <Hash v-model="hash" />
    
    </v-card-text>
  </v-card>
</template>

<script>
import Hash from "&/common/formulario/inputs/hash";
export default {
  components: {
    Hash,
  },
  data: () => ({
    hash: null,
  }),
};
</script>
