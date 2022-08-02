<template>
  <div class="input-container">
    <input
      ref="uploader"
      class="d-none"
      type="file"
      :multiple="$subscriptorCan('c3')"
      accept="*/*"
      @change="inputChange"
    />

    <v-card
      max-width="150"
      class="mx-auto rounded-circle input-file-card"
      elevation="0"
      height="150"
      width="100%"
      @dragover="dragover"
      @dragleave="dragleave"
      @drop="drop"
      @click="inputClick"
    >
      <SpiningWheel />
      <div
        style="
          display: flex;
          justify-content: center;
          height: 100%;
          align-items: center;
        "
      >
        <div>
          <div>
            <i
              v-if="this.$store.state.files.paths.length == 0"
              class="input-files-icon fg-icon-nube-arriba-black"
            ></i>
            <span v-else style="font-size: 2rem">{{
              this.$store.state.files.paths.length
            }}</span>
          </div>
          <div class="label-in-phone">
            <div>
              {{
                $store.state.files.filesUploading
                  ? $t("input-cargar")
                  : $t("input-subir")
              }}
            </div>
            <div
              v-if="
                this.$store.state.files.paths.length > 0 &&
                !$store.state.files.filesUploading
              "
            >
              {{ $t("input-mas") }}
            </div>
            <div>{{ $t("input-archivos") }}</div>
          </div>
        </div>
      </div>
    </v-card>

    <v-snackbar
      style="z-index: 999"
      v-model="snackbarActive"
      :timeout="snackbarTimeout"
      :multi-line="true"
      :color="snackbarType"
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="() => (snackbarActive = false)">
          <v-icon>close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import SpiningWheel from "./spiningWheel";
import prettyBytes from "&/utils/prettyBytes";
import dCopy from "&/utils/dCopy";

export default {
  props: {
    allowDrag: Boolean,
  },
  components: { SpiningWheel },


  data: () => ({
    prettyBytes: prettyBytes,
    dCopy: dCopy,

    snackbarActive: false,
    snackbarText: "",
    snackbarType: "info",
    snackbarTimeout: 4000,
  }),


  // beforeDestroy() {
  //   this.$store.dispatch("files/deleteAllFiles");
  // },

  methods: {
    inputClick() {
      this.$store.commit("files/setError", null);
      //c3 = permisos para enviar más de 1 archivo
      if (
        !this.$subscriptorCan("c3") &&
        this.$store.state.files.fileList.length >= 1
      ) {
        this.$store.commit("mod/setDrawerUploadFiles", true);
      } else {
        this.$refs.uploader.click();
      }
    },
    snackbar(type, msg, time = 4000) {
      this.snackbarActive = true;
      this.snackbarType = type;
      this.snackbarTimeout = time;
      this.snackbarText = msg;
    },

    inputChange() {
      if (this.$refs.uploader.files.length == 0) {
        this.snackbar("error", this.$t("input-error-subir-archivos"));
        return;
      }
      this.$store.commit("files/setFileList", [...this.$refs.uploader.files]);
      this.$refs.uploader.value = null;

      setTimeout(() => {
        this.$store.commit("mod/setDrawerUploadFiles", true);
      }, 300);
    },
    dragover(event) {
      event.preventDefault();
      if (this.allowDrag) {
        this.$store.commit("mod/setDragingOverInput", true);
      }
    },
    dragleave() {
      if (this.allowDrag) {
        this.$store.commit("mod/setDragingOverInput", false);
      }
    },
    drop(event) {
      event.preventDefault();
      if (this.allowDrag) {
        this.dragleave();
        if (
          !this.$subscriptorCan("c3") &&
          this.$store.state.files.fileList.length >= 1
        ) {
          this.$refs.uploader.files = event.dataTransfer.files;
          console.log(event.dataTransfer.files);
          this.inputChange();
        } else {
          this.snackbar("error", this.$t("input-error-subir-archivos"));
        }
      }
      else{
        this.snackbar("error", this.$t("input-error-subir-archivos"));
      }
    },
  },
};
</script>
<style lang="scss">
[v-cloak] {
  display: none;
}

.v-snack__content {
  font-size: 1rem !important;
  line-height: 1.5 !important;
}

.input-container {
  position: relative;
  .v-card--link:before {
    background: none;
  }
}

.input-file-card {
  cursor: pointer;
  background-color: transparent !important;
  &:focus {
    font-family: roobertmedium;
  }
}
.input-files-icon {
  width: 60px;
  height: 48px;
  background-size: 60px 60px;
  margin: auto;
}

.label-in-phone {
  line-height: 1 !important;
}
</style>
