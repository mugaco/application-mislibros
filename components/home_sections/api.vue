<template>
  <div id="api" style="background-color: #333">
    <div class="mini-spacer">
      <v-container>
        <v-row justify="start">
          <v-col cols="12" md="10" lg="7">
            <h1 class="white-text">{{ $t('api-title') }}</h1>
            <h3 class="white-text">
              {{ $t('api-desc') }}
            </h3>
            <v-divider color="white"></v-divider>
            <v-btn
              to="#contacto"
              style="margin-top: 2em"
              outlined
              class="cta"
              rounded
              color="white"
              elevation="0"
            >
              {{$t('cta-contacta')}}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>
<script>
export default {
  name: "Api",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>
