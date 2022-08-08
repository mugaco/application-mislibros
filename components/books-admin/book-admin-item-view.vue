<template>
  <v-card class="mx-auto my-12" max-width="374">
    <pre>{{ item }}</pre>
    <!-- <pre>{{ imgFeatured }}</pre> -->
    <!-- <pre>{{ item.images }}</pre> -->
    <!-- <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template> -->
    <!-- <v-card-text
      class="text-center grey d-flex flex-column align-center justify-center"
    >
      <v-img v-if="imgFeatured" :src="imgFeatured" height="200" width="200" />
    </v-card-text> -->
    <v-card-title>
      <span class="title-class">
        {{ item.title }}
      </span>
    </v-card-title>

    <!-- <v-card-text> -->
    <!-- <v-row align="center" class="ma-4">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>
      </v-row> -->

    <!-- <div style="margin-top: 10px; margin-bottom: 10px">
        <LimitHtml
          :html="item.description[$store.state.user.lang]"
          :limit="300"
        />
      </div> -->
    <!-- more="ver algo mas" -->
    <!-- </v-card-text> -->

    <!-- <v-divider class="mx-4"></v-divider>

    <v-card-title>{{ $t("precio-unidad") }}</v-card-title> -->

    <v-card-text>
      <v-file-input
        truncate-length="25"
        outlined
        chips
        v-model="file"
        :loading="loading"
      ></v-file-input>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" text @click="updateFuente" block>
        {{ $t("desde archivo") }}
      </v-btn>
      <v-btn color="primary" text @click="editarFuente" block>
        {{ $t("editar md") }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import LimitHtml from "&/common/limit-html";

import Moneda from "&/common/moneda.vue";

export default {
  props: ["item", "headers"],
  components: {
    Moneda,
    LimitHtml,
  },
  methods: {
    editarFuente() {
      this.$store.commit("book/setBook_id", this.item._id);
      this.$store.commit("book/setMd_id", this.md_id);
    },
    updateFuente() {
      this.$axios.get(`book/book/has-md/${this.item._id}`).then((response) => {
        this.hasMd = response.data.has;
      });
      this.$axios
        .post(`book/book/update-md-from-file/${this.item._id}`, {
          md_file: this.md_file,
        })
        .then((response) => {
          this.md_id = response.data._id;
        });
    },
    transform(f) {
      this.$axios
        .post("pan-trans/transform-file", { file: f })
        .then((response) => {
          this.loading = false;
          this.md_file = response.data.md_file;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    _up(file) {
      const formData = new FormData();

      formData.append("file", file);

      let endpoint = "pan-trans/up-file";
      this.loading = true;

      this.$axios
        .post(endpoint, formData, {})
        .then((response) => {
          // item.source = response.data.file;

          this.transform(response.data.file);
        })
        .catch((error) => {
          let e = "Error";
          if (error.response.data.error == "not supported type of file") {
            e = this.$t("error.illegal_format");
            alert(e);
            this.loading = false;
          }
        });
    },
  },
  data: () => ({
    file: null,
    loading: false,
    md_file: null,
    hasMd: null,
    md_id: null,
  }),
  watch: {
    file(f) {
      console.log(f);
      if (f) {
        this._up(f);
      }
    },
  },
  computed: {
    imgFeatured() {
      if (this.item.images) {
        if (this.item.images[0]) return this.item.images[0]["printUri"]; //"https://previews.123rf.com/images/jovanas/jovanas1605/jovanas160500244/56353901-blue-square-icon-sms.jpg";
      }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.title-class {
  font-size: 1.5rem;
}
</style>