<template>
  <div>
  
    <Editor  />

    <!-- <div v-html="html" v-if="md"></div> -->
  </div>
</template>

<script>
import parseMd from "&/utils/parseMd.js";

 import Editor from "&/common/stuff/editor-md";
export default {
  layout: "editor-md",
  components: { Editor },
  mounted(){
     this.getMd()
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
        .get(`wlibro/md/${this.book_id}/${this.md_id}`)
        .then((response) => {
          console.log(response);
          if (response.data.md) {
            this.md = response.data.md;
          }
        })
        .catch((error) => {
          if (error.response.status == 404) {
            //create
            this.create();
            return false;
          }
        });
    },
 
    create() {
      console.log("create");
      this.$axios.post(`wlibro/md/${this.book_id}`).then((response) => {
        this.$store.commit("book/setBook_id", response.data._id);
      });
    },
  },
  data: () => ({
    md:null,
 
  }),
};
</script>

<style lang="scss" scoped>
</style>