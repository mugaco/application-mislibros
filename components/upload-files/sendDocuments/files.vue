<template>
  <div style="text-align: center">
    <!-- HIDDEN FILE INPUT -->
    <input
      ref="uploader"
      class="d-none"
      type="file"
      :multiple="$subscriptorCan('c3')"
      accept="*/*"
      @change="inputChange"
    />

    <v-alert
      v-show="file_list.length == 0"
      :icon="false"
      outlined
      width="100%"
      :type="$store.state.files.error ? 'error' : 'info'"
    >
      <v-row align="center" style="height: 52px; text-align: left">
        <v-col class="grow py-0">
          {{
            $store.state.files.error
              ? $t("input-drawer-no-archivos")
              : $t("input-archivos-a-enviar")
          }}
        </v-col>
        <v-col class="shrink py-0">
          <v-btn
            @click="inputClick"
            elevation="0"
            :color="$store.state.files.error ? 'error' : 'primary'"
            small
          >
            {{ $t("input-subir") }}
            <v-icon> file_upload </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-alert
      v-show="
        !!$store.state.files.errorToMany &&
        $store.state.files.paths.length > 1 &&
        !$subscriptorCan('c3')
      "
      icon="warning"
      outlined
      width="100%"
      type="error"
    >
      <v-row align="center">
        <v-col class="grow py-0">
          {{ $store.state.files.errorToMany }}
        </v-col>
      </v-row>
    </v-alert>

    <v-list v-show="file_list.length != 0" subheader two-line style="position: relative">
      <v-subheader
        v-show="file_list.length > 1"
        style="position: absolute; top: -3em; left: 0"
      >
        total : {{ prettyBytes($store.state.files.sizeToUpload) }}
      </v-subheader>
      <!-- <v-list-item dense v-show="file_list.length == 0"> </v-list-item> -->

      <!-- <v-list-item
        v-show="
          !!$store.state.files.errorToMany &&
          $store.state.files.paths.length > 1 &&
          !$subscriptorCan('c3')
        "
      >
      </v-list-item> -->

      <div class="files-list">
        <template v-for="(f, i) in file_list">
          <v-list-item
            :key="i"
            dense
            class="file-item"
            :class="{ 'file-deleting': f.deleting }"
            :style="f.status == 2 ? 'color: red !important' : ''"
            style="
              border-bottom: 1px solid #cccccc;
              border-top: 1px solid #cccccc;
              margin-top: -1px;
            "
          >
            <v-list-item-avatar>
              <v-icon :dark="false" :color="f.status == 2 ? 'error' : ''">{{
                prepend_icon(f.status)
              }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-subtitle
                v-show="f.status != 2"
                class="text-left"
                v-text="f.sizeHuman"
              >
              </v-list-item-subtitle>
              <v-list-item-title class="text-left">
                {{ f.status == 2 ? f.errorMessageName : f.name }}
              </v-list-item-title>

              <v-list-item-title v-show="f.status == 2" class="text-left">
                {{ f.errorMessageDescription }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action style="z-index: 10">
              <v-btn
                :disabled="f.status == 2"
                icon
                @click="manage_delete_file(f, i)"
              >
                <v-icon color="grey lighten-1">{{
                  f.status == 1 ? "delete_outline" : "close"
                }}</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-progress-linear
              :value="f.loaded"
              :color="f.status == 2 ? 'rgb(255,0,0)' : 'primary'"
              v-show="f.loaded > 0 && f.status != 1"
              :background-opacity="0.2"
              style="
                position: absolute;

                left: 0;
                height: 64px;
                opacity: 0.4;
                z-index: 1;
              "
            >
            </v-progress-linear>
          </v-list-item>
        </template>
        <template v-for="(f, i) in $store.state.files.filesError">
          <v-list-item
            :key="i"
            dense
            class="file-item"
            :class="{ 'file-deleting': f.deleting }"
            style="
              color: red !important;
              background-color: rgba(255, 0, 0, 0.2);
              margin-top: -1px;
              border-bottom: 1px solid #ffaaaa;
              border-top: 1px solid #ffaaaa;
            "
          >
            <v-list-item-avatar>
              <v-icon color="error">warning</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="text-left">
                {{ `${f.name} (${f.size})` }}
              </v-list-item-title>
              <v-list-item-title class="text-left">
                {{
                  $t("input-error-supera-capacidad-archivos", {
                    capacidadMax: prettyBytes($store.state.user.max_size),
                  })
                }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action style="z-index: 10">
              <v-btn
                icon
                @click="$store.commit('files/removeFromFilesError', i)"
              >
                <v-icon color="grey lighten-1">{{
                  f.status == 1 ? "delete_outline" : "close"
                }}</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </template>
      </div>
    </v-list>
    <v-btn
      v-show="file_list.length != 0 && $subscriptorCan('c3')"
      @click="inputClick"
      color="primary"
      :small="$vuetify.breakpoint.mobile"
    >
      <!-- :disabled="!$subscriptorCan('c3') && file_list.length >= 1" -->
      {{ $t("input-drawer-subir-mas") }}
      <v-icon>file_upload</v-icon>
    </v-btn>
  </div>
</template>

<script>
import prettyBytes from "&/utils/prettyBytes";
export default {
  mounted() {
    if (this.$store.state.files.paths) {
      this.$store.state.files.paths.forEach((p) => {
        let fileListEl = {
          id: p.id,
          name: p.originalName,
          sizeHuman: p.sizeHuman,
          status: 1, //0-carregant, 1-ok, 2-error-arxiu
          loaded: 100,
        };
        this.file_list.push(fileListEl);
      });
    }
  },
  data() {
    return {
      prettyBytes: prettyBytes,
      file_list: [],
    };
  },
  watch: {
    "$store.state.files.fileList"(files) {
      if (files) {
        files.forEach((file) => {
          if (file.size != 0) {
            let availableSize =
              this.$store.state.user.max_size -
              this.$store.state.files.sizeToUpload;
            if (file.size < availableSize) {
              this.uploadFile(file);
            } else {
              this.$store.commit("files/addToFilesError", {
                name: file.name,
                size: this.prettyBytes(file.size),
              });
            }
          }
        });
      }
    },
  },
  methods: {
    inputClick() {
      this.$store.commit("files/setError", null);
      this.$refs.uploader.click();
    },
    inputChange(event) {
      this.$store.commit("files/setFileList", [...event.target.files]);
      event.target.value = null;
    },
    uploadFile(file) {
      this.$store.commit("files/sizeToUploadIncrement", file.size);
      this.$store.commit("files/filesUploadingIncrement");
      this.$store.commit("files/fileCounterIncrement");
      const ID = this.$store.state.files.fileCounter;
      const formData = new FormData();
      formData.append("file", file);

      //Token de cancelación para axios
      const CancelToken = this.$axios.CancelToken;
      const source = CancelToken.source();

      let fileListEl = {
        id: ID,
        name: file.name,
        sizeHuman: this.prettyBytes(file.size),
        status: 0, //0-carregant, 1-ok, 2-error-arxiu
        loaded: 0,
        source: source,
      };
      this.file_list.push(fileListEl);
      // this.$store.commit("files/addToFileList", dCopy(fileListEl));

      this.$axios
        .post("filegun/temp-file-not-auth-user", formData, {
          cancelToken: source.token,
          onUploadProgress: (event) => {
            fileListEl.loaded = Math.round((event.loaded * 100) / event.total);
            // this.$store.commit("files/editFileListItem", dCopy(fileListEl));
          },
        })
        .then((response) => {
          fileListEl.status = 1;
          // this.$store.commit("files/editFileListItem", dCopy(fileListEl));

          this.$store.commit("files/addToPaths", {
            ...response.data,
            id: ID,
            name: response.data.originalName,
          });
        })
        .catch((error) => {
          this.$store.commit("files/sizeToUploadDecrement", file.size);
          fileListEl.status = 2;
          fileListEl.errorMessageName = this.$t("input-error-file-title", {
            filename: file.name,
          });
          if (error.message) {
            if (error.message == "input-error-cancelada-usuario") {
              fileListEl.errorMessageName = this.$t(
                "input-error-cancelada-usuario"
              );
            }
          } else if (error.response.data) {
            if (error.response.data.error == "too large file") {
              fileListEl.errorMessageDescription = this.$t(
                "input-error-supera-capacidad",
                {
                  capacidadMax: `(${error.response.data.allowed_in_megabytes}Mb)`,
                }
              );
            } else if (
              error.response.data.error == "not supported type of file"
            ) {
              fileListEl.errorMessageDescription = this.$t(
                "error.illegal_format"
              );
            }
          }
          // this.$store.commit("files/editFileListItem", dCopy(fileListEl));
        })
        .finally(() => {
          this.$store.commit("files/filesUploadingDecrement");
        });
    },
    prepend_icon(status) {
      if (status == 0) {
        return "lock_reset";
      }
      if (status == 1) {
        return "lock_outline";
      }
      if (status == 2) {
        return "warning";
      }
    },

    manage_delete_file(file, index) {
      file.deleting = true;

      if (file.status == 0) {
        file.source.cancel("input-error-cancelada-usuario");
        this.deleteFromFileList(file.id, 1500);
      } else if (file.status == 1) {
        file.status = 2;
        file.errorMessageName = this.$t("eliminando");
        this.$store.dispatch("files/deleteFile", file.id);
        this.deleteFromFileList(file.id, 500);
      }
    },
    deleteFromFileList(id, delay = 0) {
      setTimeout(() => {
        let index = this.file_list.findIndex((f) => f.id == id);
        this.file_list.splice(index, 1);
      }, delay);
    },
  },
};
</script>

<style lang="scss" scoped>
.files-list {
  .v-list-item {
    max-height: 60px;
    @media (max-width: 767px) {
      max-height: 45px;
    }
  }
  @media (max-width: 767px) {
    max-height: 100px;
  }
  overflow-y: auto;
  & .file-item {
    opacity: 1;
    transition: opacity 0.5s !important;
    transition-delay: 1.5s !important;
  }
  & .file-deleting {
    opacity: 0 !important;
  }
}
</style>