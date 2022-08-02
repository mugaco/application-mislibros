<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <pre>{{ arbol }}</pre>
        <!-- <pre>{{ arbolFromWeb }}</pre> -->
        <!-- <pre>{{ $i18n.locale }}</pre> -->
        <pre>{{ menu }}</pre>
        <!-- <Menu :items="menu" /> -->
        <!-- <pre>{{$i18n.defaultLocale}}</pre>
        <pre>{{$i18n.locale}}</pre>
        <pre>{{ w.content.loops[loop] }}</pre> -->
      </v-col>
      <v-col cols="6">
        <!-- @change="handleLangChange" -->
        <!-- <SelectLang v-model="lang" :idiomas-contenido-web="['es', 'en']" /> -->
        <!-- :lang="lang"
          v-if="lang" -->
        <TreeEditor
          :idiomas-contenido-web="['es', 'en', 'ca']"
          init-lang="es"
          v-model="arbol"
          title="Editando árbol"
        />
        <Menu :items="menu" item-children="pepes" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Menu from "&/common/cms/views/blog-sidebar-menu-cats.vue";
import TreeEditor from "&/common/cms/config/m-tree-editor";
// import SelectLang from "@/components/universal/m-tree-editor/select-lang.vue";
export default {
  components: { TreeEditor, Menu },
  mounted() {
    this.getTaxonomyTree();
  },
  watch: {
    arbol: {
      handler(v, va) {
        // console.log("el arbol ha cambiado");
        // console.log({ v: v });
        // console.log({ va: va });

        this.postTaxonomyTree();
      },
      deep: true,
    },
  },

  data: () => ({
    web_id: "62c7020edd6b7c8419b9b560",
    loop: "books",
    category: "coleccion",
    lang: "es",
    arbol: [],
  }),
  computed: {
    arbolFromWeb() {
      return this.$store.state.web.web.content.loops[this.loop]["taxonomy"][
        "categories"
      ][this.category]["tree"];
    },
    menu() {
      const funcRecur = (items, menu) => {
        items.forEach((item) => {
          let ob = {
            id: item.id,
            to: `/${this.loop}/${this.category}/${
              item.slug[this.$i18n.locale]
            }`,
            name: item.label[this.$i18n.locale],
          };
          if (item.children) {
            if (item.children.length > 0) {
              ob.pepes = funcRecur(item.children, []);
            }
          }
          menu.push(ob);
        });
        return menu;
      };
      return funcRecur(this.arbolFromWeb, []);
      return funcRecur(this.arbol, []);
    },
  },

  methods: {
    getTaxonomyTree() {
      this.$axios
        .get(
          `cms/web/taxonomy-tree/${this.web_id}/${this.loop}/${this.category}`
        )
        .then((response) => {
          console.log("una ejecucion", response.data);
          this.arbol = response.data.tree;
        });
    },
    postTaxonomyTree() {
      this.$axios
        .post(
          `cms/web/taxonomy-tree/${this.web_id}/${this.loop}/${this.category}`,
          {
            tree: this.arbol,
          }
        )
        .then((response) => {
          console.log("parece que lo guardo en el mounted tambien");
        });
    },
    handleLangChange(lang) {
      this.lang = lang;
    },
  },
};
</script>
<style></style>
