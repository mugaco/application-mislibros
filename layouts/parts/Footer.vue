<template>
  <!-- -----------------------------------------------
        Start Footer
  ----------------------------------------------- -->
  <v-footer class="footer">
    <v-container>
      <v-row class="py-0 py-md-15">
        <!-- -----------------------------------------------
        First Column
      ----------------------------------------------- -->
       <v-col cols="12" sm="12" md="12" lg="3" class="px-xs-0">
          <h4 class="font-weight-regular font-18">Social</h4>

          <Social />

        </v-col>
        <!-- -----------------------------------------------
        Second Column
      ----------------------------------------------- -->
        <!-- <v-col cols="12" sm="12" md="12" lg="3" class="px-xs-0">
          <h4 class="font-weight-regular font-18">Phone</h4>
          <p class="mt-10 mb-0">Reception : +205 123 4567</p>
          <p>Office : +207 235 7890</p>
        </v-col> -->
        <!-- -----------------------------------------------
        Third Column
      ----------------------------------------------- -->
        <!-- <v-col cols="12" sm="12" md="12" lg="3" class="px-xs-0">
          <h4 class="font-weight-regular font-18">Email</h4>
          <p class="mt-10 mb-0">
            info : <a class="infos dark-link" href="/">info@mugaco.com</a>
          </p>
          <p>
            Site :
            <a class="infos dark-link" href="https://mugaco.com/">
              mugaco.com
            </a>
          </p>
        </v-col> -->
        <!-- -----------------------------------------------
        Fourth Column
      ----------------------------------------------- -->
  
      </v-row>
      <div class="footer-bottom-bar font-14">
        <div class="d-block d-md-flex align-center">
          <p>
            All Rights Reserved by José Manuel Muñoz García
            <!-- <a href="https://mugaco.com/" class="link">mugaco.com</a> -->
          </p>
          <div class="ml-auto">
            <div class="d-flex align-center">
              <!-- /*--*/ -->

              <a :href="links[0].href" target="_blank" class="link px-4">
                {{ links[0].text }}
              </a>
              <a :href="links[1].href" target="_blank" class="link px-4">
                {{ links[1].text }}
              </a>
              <a :href="links[2].href" target="_blank" class="link px-4">{{
                links[2].text
              }}</a>
              <a :href="links[3].href" target="_blank" class="link px-4">
                {{ links[3].text }}
              </a>

              <!-- /*--*/ -->
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </v-footer>
  <!-- -----------------------------------------------
        End Footer
  ----------------------------------------------- -->
</template>

<script>
import Social from "@/components/social";
export default {
  name: "Footer",
  components: { Social },
  data() {
    return {
      links: [
        {
          text: this.$t("aviso-legal"),
          href: process.env.avisoLegal,
        },
        {
          text: this.$t("politica-privacidad"),
          href: process.env.politicaDePrivacidad,
        },
        {
          text: this.$t("terminos-y-condiciones"),
          href: process.env.terminosYCondiciones,
        },
        {
          text: this.$t("politica-de-cookies"),
          href: process.env.politicaDeCookies,
        },
      ],
    };
  },
};
</script>
 