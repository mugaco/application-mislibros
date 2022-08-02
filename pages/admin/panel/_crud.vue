<template>
  <div>
    <!-- <pre>{{ json }}</pre> -->
    <v-container v-if="json">
      <Crud :json="json" />
    </v-container>
  </div>
</template>

<script>
import Crud from "&/common/crud";
// import modelo from "@/components/cruds/inspire.json";

export default {
  name: "index-crud",
  middleware:"is-logged",
  layout: "admin",
  components: { Crud },
  async asyncData({ params, error }) {
    try {
      const x = await import(`@/components/cruds/${params.crud}.json`);
      return {
        json: x.default,
      };
    } catch (e) {
      error({
        statusCode: 404,
        message: "No se encontró la página",
      });
      return;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>

