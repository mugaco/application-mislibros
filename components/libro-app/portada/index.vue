<template>
  <v-navigation-drawer
    dark
    v-model="drawer"
    app
    temporary
    :width="500"
    :src="$store.state.book.book_portrait"
    class="book-app-portada"
  >
    <template slot="prepend">
      <!-- <pre>{{ {pep: $store.state.book.book_portrait } }}</pre> -->
      <Prepend />
    </template>
    <template slot="append">
      <Append />
    </template>
    <Menu en="portada" />
    <Social />
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
        return this.$store.state.book.mostrar_portada;
      },
      set(val) {
        this.$store.commit("book/setMostrar_portada", val);
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
