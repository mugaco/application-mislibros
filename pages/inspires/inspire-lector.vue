<template>
  <div>
    <Contraportada />
    <Portada />

    <!-- <pre>{{ { o: $store.state.book } }}</pre> -->
    <Reader :html="html" v-if="html" />
  </div>
</template>

<script>
import parseMd from "&/utils/parseMd.js";

import Reader from "&/common/stuff/reader";
import Portada from "@/components/libro-app/portada";
import Contraportada from "@/components/libro-app/contra";
export default {
  layout: "lector",
  components: {
    Reader,
    Portada,
    Contraportada,
  },
  data: () => ({ md: null }),
  mounted() {
    this.getMd();
  },
  computed: {
    md_id() {
      return this.$store.state.book.md_id;
    },
    book_id() {
      return this.$store.state.book.book_id;
    },
    html() {
      if (this.md) {
        return parseMd(this.md);
      }
      return "<p>...</p>";
    },
  },
  methods: {
    getMd() {
      this.$axios
        .get(`book/md/${this.book_id}/${this.md_id}`)
        .then((response) => {
          console.log(response);
          if (response.data.md) {
            this.md = response.data.md;
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            //create

            return false;
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>