<template>
  <v-footer class="footer white-text pb-8 pt-12">
    <v-row justify="center" align="baseline">
      
      <v-col cols="12" sm="auto" class="pl-0 pr-8 pr-lg-16 py-2">
        <v-row justify="center" align="baseline" no-gutters>
          <v-col cols="auto">
            <span style="font-size: 14px; color: #aaa; margin-right: 5px"
              >powered by
            </span>
          </v-col>
          <v-col cols="auto" align-self="end">
            <a href="https://www.quartup.com/" target="_blank">
              <img src="/q.png" alt="quartuplogo" style="max-width: 90px"/>
            </a>
          </v-col>
        </v-row>
      </v-col>

      <!-- <v-col cols="auto" class="px-4 py-2"> 2022 © Quartup, S.L. </v-col> -->

      <v-col cols="auto" class="px-2 px-lg-4 py-2">
        <a :href="links[0].href" target="_blank" class="link white-text pr-4 pr-lg-8">{{
          links[0].text
        }}</a>
        <a :href="links[1].href" target="_blank" class="link white-text">{{
          links[1].text
        }}</a>
      </v-col>

            <v-col cols="auto" class="px-2 px-lg-4 py-2">
        <a :href="links[2].href" target="_blank" class="link white-text pr-4 pr-lg-8">{{
          links[2].text
        }}</a>
        <a :href="links[3].href" target="_blank" class="link white-text">{{
          links[3].text
        }}</a>
      </v-col>


            <!-- <v-col v-for="(l, i) in links" :key="i" cols="auto" class="px-2 px-lg-4 py-2">
        <a :href="l.href" target="_blank" class="link white-text">{{
          l.text
        }}</a>
      </v-col> -->
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
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
<style lang="scss">

  .footer {
    font-size: 12px !important;
  }

</style>
 