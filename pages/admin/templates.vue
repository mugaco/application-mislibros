<template >
  <div style="height: 100%">
    <EditorMjml />
  </div>
</template>

<script>
// import EditorMjml from "&/common/editor-mjml";
// import EditorMjml from "@/components/universal/editor-mjml/index.vue";
export default {
  middleware: "is-admin",
  components: { EditorMjml: () => import("&/common/editor-mjml") },
};
</script>

<style>
</style>