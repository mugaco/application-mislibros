export default {
  mounted() {
    window.onbeforeunload = (e) => {
      this.$store.dispatch("files/deleteAllFiles");
    };
  },
  destroyed() {
    window.onbeforeunload = null;
  },
}
