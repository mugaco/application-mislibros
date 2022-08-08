<template>
  <v-container class="all" :class="{ 'fade-in-mounted': ver }" fluid>
   
    <v-row
      justify="center"
      :align="$vuetify.breakpoint.xs ? 'start' : 'center'"
      style="height: calc(100vh - 85px)"
    >
      <v-col cols="12" lg="4" xl="6" v-show="!$vuetify.breakpoint.xs">
        <h1 class="fg-baner-titulo">
          {{ $t("banner-titulo") }}
        </h1>
        <h3 class="fg-baner-subtitulo">
          {{ $t("banner-subtitulo") }}
        </h3>
      </v-col>
      <v-col cols="12" lg="8" xl="6" class="columna-imagen">
        <v-row justify="center" align="center" class="upload-card">
          <!-- Imágenes de fondo -->
          <div :class="{ draging: $store.state.mod.dragingOverInput }">
            <img
              class="bg-imagen bg-iconos"
              :src="
                require('&/theme/assets/imagenes/mobil-filegun-negre1.png')
              "
            />
            <img
              class="bg-imagen bg-fondo"
              :src="
                require('&/theme/assets/imagenes/mobil-filegun-negre3.png')
              "
            />
            <img
              class="bg-imagen bg-mobil"
              :src="
                require('&/theme/assets/imagenes/mobil-filegun-negre2.png')
              "
            />
          </div>

          <!-- texto solo responsive -->
          <v-col cols="12" v-show="$vuetify.breakpoint.xs">
            <h1 class="fg-baner-titulo">
              {{ $t("banner-titulo") }}
            </h1>
          </v-col>

          <!-- Input archivos -->
          <v-col cols="12" class="text-center">
            <FileLoader />
          </v-col>

          <v-col cols="12" class="boton-continuar">
            <v-row justify="center" align="center">
              <v-col style="flex-grow: 0">
                <v-btn
                  x-large
                  style="margin: auto"
                  class="btn-custom-md"
                  outlined
                  elevation="1"
                  @click="$store.commit('mod/setDrawerUploadFiles', true)"
                >
                  {{ $t("continuar") }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>


export default {
  name: "ContentBanner",
  mounted() {
    this.$nextTick(() => {
      this.ver = true;
    });
  },
  components: {

  },
  data: () => ({
    ver: false,
  }),
};
</script>

<style lang="scss">
.all {
  opacity: 0;
  transition-property: opacity;
  transition: 1s;
  user-select: none;
}
.fade-in-mounted {
  opacity: 1;
}
.upload-card {
  position: relative;
  margin: auto auto;
  min-height: 600px;
  min-width: min(630px, 100%);
  @media (max-width: 600px) {
    min-height: 0px;
    min-width: 0px;
    height: 100%;
  }
  @media (max-width: 991px) and (max-height: 830px) {
    min-height: 400px;
  }
  // height: 50vh;
  width: 300px;
  transition: 0.5s;
}
.fg-baner {
  max-width: min(600px, 80%);
  color: white;
  text-shadow: -2px 2px 3px #0003;
  margin: auto;
  line-height: 1.3;
  &-titulo {
    @extend .fg-baner;
    font-size: 3.5rem;
  }
  &-subtitulo {
    @extend .fg-baner;
    font-size: 1.5rem;
    margin-top: 1.2em;
    @media (max-width: 991px) {
      display: none;
    }
  }
}
.columna-imagen {
  position: relative;
  min-width: min(630px, 100%);
  background-color: transparent;

  @media (max-width: 600px) {
    height: 80%;
  }

  &:hover,
  :focus-within,
  .draging {
    .bg-fondo {
      opacity: 1;
      transform: scale(1.05);
    }
    .bg-iconos {
      opacity: 1;
    }
    .bg-mobil {
      opacity: 1;
      transform: scale(1.05);
    }
  }
}
.bg-imagen {
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: auto;
  transition: 0.5s;
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;

  @media (max-width: 600px) {
    display: none;
  }
  @media (max-width: 991px) and (max-height: 830px) {
    height: 400px;
    width: auto;
    left: calc(50% - 210px);
  }
}

.bg-iconos {
  opacity: 0.5;
}
.bg-fondo {
  opacity: 0.3;
}
.bg-mobil {
  opacity: 0.9;
}

.boton-continuar {
  position: absolute;
  bottom: 4em;
  margin: auto;
  @media (max-width: 991px) and (max-height: 830px) {
    bottom: 2em;
  }
}
@media (max-width: 1264px) {
  .fg-baner-titulo {
    font-size: 2.6rem;
  }
  .fg-baner-subtitulo {
    font-size: 1.1rem;
  }
}

@media (max-width: 600px) {
  .fg-baner {
    text-align: center;
    margin-left: 0;
    margin-right: 0;
    max-width: 100%;
  }
  .fg-baner-titulo {
    font-size: 2rem;
  }
  .fg-baner-subtitulo {
    font-size: 1rem;
  }

  .boton-continuar {
    position: relative;
    bottom: 0;
    margin: auto;
  }
}
</style>
