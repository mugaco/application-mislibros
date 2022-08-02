<template>
  <v-container 
  fluid 
  v-scroll="onScroll" 
  style="padding:0px"
  class="editor">
    <!-- Acciones -->
    <v-row class="nav-bar" :class="{ 'nav-bar-down': bajarBarra }" dense>
      <v-col>
        <v-menu offset-y transition="slide-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="service-button" color="primary" dark v-bind="attrs" v-on="on">
              <span> {{ serv_active ? serv_active.name : "Servicio" }} </span>
              <v-spacer />
              <v-icon> expand_more </v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item
              style="padding: 0"
              v-for="s in services_included"
              :key="s"
            >
              <v-btn @click="manage_service_select(s)" class="service-button" text>
                {{ s }}
                <v-spacer />
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>

      <v-spacer />
 
      <v-col>
        <ButtonSelector
          ref="buttonSelector"
          v-if="serv_active"
          :items="lang_names"
          :multiple="true"
          :mandatory="true"
          @items-active="set_lang"
        />
      </v-col>
 
      <v-col>
        <v-dialog
          v-if="serv_active"
          v-model="newLiteralDialog"
          max-width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              <v-icon>add</v-icon>
              <span v-if="!$vuetify.breakpoint.xs"> Literal </span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <h2>Nuevo literal</h2>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-radio-group v-model="group" mandatory>
                      <template v-slot:label>
                        <div>Escoje un grupo donde guardar el literal</div>
                      </template>
                      <v-radio label="app" value="app" />
                      <v-radio label="api" value="api" />
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      autofocus
                      v-model="literal"
                      placeholder="Escribe aquí el literal"
                      @keyup.enter="store_literal"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="cancel_new_literal"> Cancelar </v-btn>
              <v-btn color="primary" text @click="store_literal">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col>
        <v-btn v-if="serv_active" color="primary" @click.exact="save_changes">
          <v-icon>save</v-icon>
          <span v-if="!$vuetify.breakpoint.xs"> Guardar </span>
        </v-btn>
      </v-col>
    </v-row>

    <!-- Edición de locales -->
    <v-row class="locales" v-if="locales && serv_active">
      <v-col>
        <div v-for="k in Object.keys(locales.es)" :key="k">
          <div @click="hiddenKeys[k] = !hiddenKeys[k]">
            <h3 class="group-title">
              <span>{{ k }} </span>
              <v-btn icon>
                <v-icon class="chev" :class="{ 'chev-flipped': hiddenKeys[k] }"
                  >expand_more</v-icon
                >
              </v-btn>
            </h3>
          </div>
          <div v-if="hiddenKeys[k]" class="group">
            <div v-for="j in Object.keys(locales.es[k])" :key="j" class="key">
              <div>
                <strong>{{ j }}:</strong>
                <v-btn icon @click="delete_key(k, j)">
                  <v-icon small>delete</v-icon>
                </v-btn>
              </div>
              <!-- <pre>{{lang_active}}</pre> -->
              <div v-for="lang in lang_active" :key="lang" class="item">
                <div class="lang">{{ lang }}:</div>
                <v-text-field
                  v-model="locales[lang][k][j]"
                  dense
                  hide-details
                  outlined
                  background-color="white"
                />
              </div>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-dialog v-model="deleteLiteralDialog" max-width="600px">
      <v-card>
        <v-card-title>
          <div>
            Estás seguro que deseas borrar el literal "{{ deletingKey }}" ?
          </div>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="delete_key_cancel"> Cancelar </v-btn>
          <v-btn color="error" text @click="delete_key_confirm"> Borrar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-alert class="alertFixed" v-if="saveAlert" :type="saveAlertType">
      {{ saveAlert }}
    </v-alert>
  </v-container>
</template>

<script>
export default {
  props: ["service_name"],
  components: {
    ButtonSelector: () => import("./buttonSelector.vue"),
  },
  mounted() {
    this.$nextTick(() => {
      this.get_services();
    });
  },
  data() {
    return {
      serv_list: null,
      serv_active: null,
      services_included: this.$store.state.translate.services,

      lang_list: {},
      lang_names: [],
      lang_active: [],

      locales: {
        es: {},
      },

      hiddenKeys: {
        app: false,
        api: false,
      },

      newLiteralDialog: false,
      namespace: null,
      servicio: null,
      group: null,
      literal: null,

      deleteLiteralDialog: false,
      deletingKey: null,

      deletingGroup: null,

      saveAlert: false,
      saveAlertType: "info",

      offsetTop: 0,
      previousOffsetTop: 0,
      bajadaAcumulada: 0,
      subidaAcumulada: 0,
      bajarBarra: false,
    };
  },

  methods: {
    manage_service_select(s) {
      this.serv_list.forEach((serv) => {
        if (serv.name == s) this.set_service(serv);
      });
    },
    get_services() {
      this.$axios.get("translate/services").then((response) => {
        this.serv_list = response.data.services;
        this.serv_list.forEach((s) => {
          if (s.name == this.service_name) this.set_service(s);
        });
      });
      // .catch((error) =>{
      //   console.error(error);
      // });
    },
    onScroll(e) {
      this.previousOffsetTop = this.offsetTop;
      this.offsetTop = e.target.scrollingElement.scrollTop;
      let mov = this.offsetTop - this.previousOffsetTop;
      if (mov < 0) {
        this.subidaAcumulada += mov;
        this.bajadaAcumulada = 0;
        if (this.subidaAcumulada < -12) {
          this.bajarBarra = true;
        }
      } else {
        this.bajadaAcumulada += mov;
        this.subidaAcumulada = 0;
        if (this.bajadaAcumulada > 12) {
          this.bajarBarra = false;
        }
      }
    },
    delete_key(group, key) {
      this.deleteLiteralDialog = true;
      this.deletingKey = key;
      this.deletingGroup = group;
    },
    delete_key_confirm() {
      this.lang_names.forEach((lang) => {
        delete this.locales[lang][this.deletingGroup][this.deletingKey];
      });
      this.deleteLiteralDialog = false;
      this.deletingKey = null;
      this.deletingGroup = null;
      this.save_changes();
    },
    delete_key_cancel() {
      this.deleteLiteralDialog = false;
      this.deletingKey = null;
      this.deletingGroup = null;
    },
    save_alert(message, type, time = 3000) {
      this.saveAlert = message;
      this.saveAlertType = type;
      setTimeout(() => {
        this.saveAlert = false;
        this.saveAlertType = "info";
      }, time);
    },
    get_langs_list() {
      // console.log("get_langs_list()");
      this.$axios.get("translate/langs").then((response) => {
        this.lang_names = this.serv_active.langs;
        // console.log("lang_names: ", this.lang_names);

        Object.keys(response.data.langs).forEach((k) => {
          // console.log(`'${k}' in lang_names:`, this.lang_names.includes(k));
          if (this.lang_names.includes(k)) {
            this.lang_list[k] = response.data.langs[k];
          }
        });
        this.$refs.buttonSelector.itemsActive = [this.lang_names[0]];
        this.lang_active = [this.lang_names[0]];
        // console.log("lang_list:", this.lang_list);
        // console.log("lang_names:", this.lang_names);
      });
    },
    save_changes() {
      this.$axios
        .put("translate/save-changes", {
          locales: this.locales,
          service: this.serv_active.name,
        })
        .then((response) => {
          this.save_alert("Guardado correctamente", "success");
          // console.log(response.data);
        })
        .catch((error) => {
          this.save_alert("Error en el servidor", "error");
        });
    },
    set_lang(lang) {
      this.lang_active = lang;
    },
    set_service(serv) {
      this.$axios
        .get(`translate/locales/${serv.name}`)
        .then((response) => {
          this.locales = response.data.locales;
          // console.log("locales: ", this.locales);
          this.serv_active = serv;
          // console.log("",serv_active);
          this.get_langs_list();
          let nameArr = serv.name.split(".");
          if (serv.name == "app") {
            this.namespace = null;
            this.servicio = "app";
          } else if (nameArr.length == 2) {
            if (nameArr[0]) {
              this.namespace = nameArr[0];
              this.servicio = nameArr[1];
            }
          } else {
            console.error("serv.name should be 'app' or 'namespace.service'");
          }
        })
        .catch((error) => {
          this.locales = {};
          alert("Error al cargar las traducciones");
        });
    },
    get_locales(serv) {
      this.$axios
        .get(`translate/locales/${serv}`)
        .then((response) => {
          this.locales = response.data.locales;
        })
        .catch((error) => {
          this.locales = {};
          alert("Error al cargar las traducciones");
        });
    },
    store_literal() {
      this.$axios
        .post("translate/store-literal", {
          namespace: this.namespace,
          servicio: this.servicio,
          nivel: this.group,
          literal: this.literal,
        })
        .then((response) => {
          this.newLiteralDialog = false;
          this.literal = null;
          this.group = null;
          this.get_locales(this.serv_active.name);
          // console.log(response.data);
        })
        .catch((error) => {
          // alert("Error al cargar las traducciones");
        });
    },
    cancel_new_literal() {
      this.newLiteralDialog = false;
      this.literal = null;
      this.group = null;
    },
  },
};
</script>

<style scoped>
.service-button{
  width: 180px;
}
@media (max-width: 450px){
  .group-title {
    padding-left: 0px;
  }
  .group .key button {
    display:inline !important;
  }
  .group > .key {
    padding-left: 0px !important;
  }
  .item {
    padding-left: 5px !important;  
  }
}
h2 {
  padding: 10px;
}
.locales {
  max-height: auto;
  overflow-y: auto;
}
.chev {
  transition: 0.3s;
}
.chev-flipped {
  transform: scaleY(-1);
}
.group {
  padding: 4px;
}
.group-title {
  border-bottom: 1px solid grey;
  margin-bottom: 5px;
  padding-left: 10px;
  /* border-radius: 4px; */
  /* background-color: rgba(0, 0, 0, 0.05); */
}
.key {
  margin-bottom: 15px;
  cursor: default;
}
.group .key button {
  display: none;
  position: absolute;
  margin-left: 25px;
  transition: 0.3s;
  height: 24px;
  width: 24px;
}
.group .key:hover button {
  display: inline;
  transform: scale(1.2);
}
.group > .key {
  padding-left: 20px;
}
.item {
  margin: 5px 0px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.lang {
  width: 30px;
}
.nav-bar {
  position: sticky;
  top: 0px;
  z-index: 1;
  margin: -12px;
  padding: 12px;
  transition: 0.3s;
}
.nav-bar-down {
  top: 85px;
}
.nav-bar .col {
  flex-grow: 0;
}
.alertFixed {
  z-index: 10;
  position: fixed;
  top: 100px;
  left: 25%;
  width: 50%;
}
</style>