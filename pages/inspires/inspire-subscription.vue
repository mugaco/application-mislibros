<template>
  <!-- <pre>{{model}}</pre> -->
  <v-container>
    <pre>{{this.$i18n.locales}}</pre>
<v-card>
      <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h1"
          cols="12"
          align="center"
        >
          23
        </v-col>
    
      </v-row>
    </v-card-text>
</v-card>
    <!-- <LimitHtml
      :html="lorem"
      :limit="300"
      more="ver algo mas"
      @ver-mas="handle"
    /> -->

    <!-- <pre>{{ model }}</pre>
    <v-card>
      <Form v-model="model" :form="form" />
    </v-card> -->
  </v-container>
</template>

<script>
import Form from "&/common/formulario/dinamico";
import LimitHtml from "&/common/limit-html";
export default {
  name: "inspire-json",
  components: {
    Form,
    LimitHtml,
  },
  methods: {
    handle() {
      alert(1);
    },
  },
  data: () => ({
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" },
    ],
    d1: false,
    d2: false,
    lorem: `<p>Lo</p>
    <ul>
    <li> rem afa afda fasdf </li>
    </ul> <p>ipsum dolor sit amet, consectetur adipiscing elit. Integer a turpis vitae est rhoncus rhoncus. Phasellus consectetur faucibus faucibus. Pellentesque pulvinar diam non porttitor pharetra. Pellentesque dictum eleifend ultrices. Vivamus molestie interdum justo non ornare. Nulla tempor, nisl vel consectetur rhoncus, ipsum nunc consectetur magna, id tincidunt odio lacus non nisl. Sed convallis vel elit eu ullamcorper. Aliquam erat volutpat.</p>
<p>Suspendisse sagittis egestas feugiat. Nam faucibus lacus a lorem tempor interdum. Sed in malesuada dui. Morbi a tincidunt ligula. Aliquam nec metus iaculis, tempus ligula eget, accumsan purus. Sed sagittis aliquam euismod. Vivamus sapien nibh, malesuada sit amet mi eu, pretium dapibus est. Sed bibendum vehicula velit, vel ullamcorper urna sodales tristique. Nullam interdum est aliquam scelerisque placerat. Quisque nisi lacus, ullamcorper nec ante vitae, porta viverra ante. In vel lacus et neque vehicula iaculis in bibendum massa.</p>`,
    model: {
      user_id: null,
      name: null,
      description: null,
      amount: null,
      sms: null,
      iva_producto_grupo_id: null,
    },
    form: [
      {
        component: "input-locales",
        props: {
          key: "name",
          label: "Nombre",
        },
      },
      {
        component: "input-locales-html",
        props: {
          key: "description",
          label: "Descripcion",
        },
      },
      {
        component: "input",
        props: {
          type: "number",
          key: "amount",
          label: "Céntimos",
          cols: {
            cols: 12,
            md: 6,
            sm: 3,
          },
        },
      },
      {
        component: "input",
        props: {
          type: "number",
          key: "sms",
          label: "Sms",
          cols: {
            cols: 12,
            md: 6,
            sm: 3,
          },
        },
      },
      {
        component: "json-autocomplete",
        props: {
          key: "iva_producto_grupo_id",
          json: {
            label: "Iva producto",
            resource: "Mugaco\\MarketPlace\\Models\\Iva\\IvaProductoGrupo",
            searchBy: ["name"],
            itemText: ["name"],
            multiple: false,
            itemKey: "_id",
            aggregation: [
              {
                project: {
                  name: 1,
                },
              },
            ],
          },
          cols: {
            cols: 12,
            md: 6,
            sm: 3,
          },
        },
      },
      {
        component: "input-files",
        props: {
          key: "att_s3",
          label: "Adjuntos",
          storage: {
            location: "S3",
            "location-name": "helpdesk-aux-module",
          },
        },
      },
      {
        component: "input-files",
        props: {
          key: "attachments",
          storage: {
            location: "local",
            "location-name": "/carpeta-local/adjuntos/{$id_folder}",
          },
        },
      },
    ],
  }),
};
</script>