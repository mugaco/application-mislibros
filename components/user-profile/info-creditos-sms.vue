<template>
  <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
    <v-card-title class="pl-15">
      <h3>{{$t('menu-admin-creditos-sms')}}</h3>
    </v-card-title>
    <v-card-text class="pa-15 pt-9 fill-height">
      <v-row>
        <v-col cols="12">
          <InfoSms />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import InfoSms from "@/components/sms-packs/info-sms-user.vue";

export default {
  name: "profile-card",
  components: {
    InfoSms,
  },
  data: () => ({
    mounted: false,
  }),
  mounted() {
    this.mounted = true;
  },

  computed: {

  },
};
</script>   

<style lang="scss" scoped>

</style>