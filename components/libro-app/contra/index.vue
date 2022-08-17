<template>
  <v-navigation-drawer
    color="#6200ff"
    dark
    v-model="drawer"
    app
    temporary
    :width="500"
    right
  >
    <div class="book-app-contraportada">
      <div class="tit-aut">
        <div class="tit">Barcino siglo III, independencia</div>
        <div class="aut">Jose Manuel Nuñoz García</div>
      </div>
      <div><Prepend /></div>
      <Social />
      <div><Menu en="contraportada"/></div>
      <div><Append /></div>
    </div>
  </v-navigation-drawer>
</template>
<script>
import Social from "@/components/social";

import Prepend from "./prepend";
import Append from "./append";
import Menu from "../menu";

export default {
  components: {
    Prepend,
    Append,
    Menu,
    Social,
  },
  methods: {},
  computed: {
    drawer: {
      get() {
        return this.$store.state.book.mostrar_contraportada;
      },
      set(val) {
        this.$store.commit("book/setMostrar_contraportada", val);
      },
    },
  },
  // mounted() {
  //   this.$axios
  //     .get(
  //       `book-market-place/books/${this.$store.state.book.book_id}/public/set-info`
  //     )
  //     .then((response) => {
  //       this.$store.commit("book/setTitle", response.data.book.title);
  //       this.$store.commit("book/setSubtitle", response.data.book.subtitle);
  //       this.$store.commit("book/setAuthor", response.data.book.author);
  //       this.$store.commit("book/setPublisher", response.data.book.publisher);
  //       this.$store.commit("book/setCollection", response.data.book.collection);
  //       this.$store.commit(
  //         "book/setPortrait",
  //         `${process.env.apiUrl}/book-market-place/book/portrait/${this.$store.state.book.book_id}/${response.data.book.portrait}`
  //       );
  //     });
  // },
  data() {
    return {};
  },
};
</script>
