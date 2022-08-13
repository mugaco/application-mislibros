<template>
  <v-list v-if="items">
    <!-- <pre>{{ items }}</pre> -->
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      @click="itemAction(item)"
      router
      exact
    >
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>
          <div>
            <span>
              {{ item.title }}
            </span>
          </div>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script>
export default {
  props: ["en"],
  methods: {
    itemAction(item) {
      if (item.to) {
        this.$router.push(item.to);
        return;
      }
      if (item.action) {
        if (item.action == "leer") {
          this.$store.commit("book/setMostrar_portada", false);
          this.$store.commit("book/setMostrar_contraportada", false);

        }
        if (item.action == "contra") {
          this.$store.commit("book/setMostrar_portada", false);
          this.$store.commit("book/setMostrar_contraportada", true);
        }
        if (item.action == "portada") {
          this.$store.commit("book/setMostrar_portada", true);
          this.$store.commit("book/setMostrar_contraportada", false);
        }
      }
    },
  },
  computed: {
    items() {
      let items = [
        // {
        //   icon: "home_work",
        //   title: "Home",
        //   to: "/",
        // },
        {
          icon: "mdi-book-open",
          title: this.$t("leer"),
          action: "leer",
        },
      ];
      if (this.en == "portada") {
        items.push({
          icon: "mdi-grease-pencil",
          title: this.$t("el-autor"),
          //action: "leer",
        });
        items.push({
          icon: "mdi-human-greeting-proximity",
          title: this.$t("boca-a-boca"),
          //action: "leer",
        });
        items.push({
          icon: "mdi-newspaper-variant-multiple-outline",
          title: this.$t("prensa"),
          //action: "leer",
        });
        items.push({
          icon: "mdi-arrange-send-backward",
          title: this.$t("contraportada"),
          action: "contra",
        });
      }
      if (this.en == "contraportada") {
        items.push({
          icon: "mdi-arrange-send-backward",
          title: this.$t("portada"),
          action: "portada",
        });
      }
      if (this.user) {
        if (this.user.permissions) {
          if (this.user.permissions.edit) {
            items.push({
              icon: "edit",
              title: this.$t("edition"),
              to: "/admin/book-documents",
            });
          }
          if (this.user.permissions.setting) {
            items.push({
              icon: "ballot",
              title: this.$t("options.options"),
              to: "/admin/settings",
            });
            items.push({
              icon: "shopping_basket",
              title: this.$t("admin.sales"),
              to: "/admin/sales",
            });
            items.push({
              icon: "money",
              title: this.$t("admin.finance"),
              to: "/admin/finance",
            });
          }
        }
      }
      return items;
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
