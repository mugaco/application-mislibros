<template>
  <v-card class="ma-1" style="min-height: 282px" v-if="mounted">
    <v-card-text class="pa-5 pt-9 fill-heisght" style="margin:auto">
      <v-row justify="space-around" align="center" class="fill-height">
        <v-col
          cols="12"
          sm="auto"
          class="d-flex justify-center align-center flex-column "
        >
          <div class="avatar-wrapper" style="text-align: center">
            <v-responsive content-class>
              <v-avatar size="120" :color="user.img ? null : 'primary'">
                <v-img v-if="user.img" :src="user.img" />
                <span
                  v-else
                  v-text="initials"
                  class="white--text text-h1 font-weight-regular"
                />
              </v-avatar>
            </v-responsive>
            <DeleteAccount :service="service" small plain />
          </div>
        </v-col>
        <v-col
          cols="12"
          sm="auto"
          class="
            pl-0
            pt-sm-15
            pl-sm-4
            d-flex
            flex-column
            align-center align-sm-start
          "
        >
          <p
            class="user-name greyMedium--text font-weight-regular"
            v-text="user.name"
          ></p>
          <p class="user-email greyTint--text ma-0" v-text="user.email"></p>

          <v-chip color="info" class="mr-2 mt-12 mb-4 mb-sm-0" x-large>
            <span style="margin-left: 10px; margin-right: 10px">
              {{ nombrePlan }}
            </span>
          </v-chip>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import DeleteAccount from "&/common/pass-mongo-2/account/components/deleteAccount";
export default {
  name: "profile-card",
  components: {
    DeleteAccount,
  },
  data: () => ({
    mounted: false,
  }),
  mounted() {
    this.mounted = true;
  },
  props: {
    user: { required: true },
  },
  computed: {
    service() {
      return process.env.serviceSlugName;
    },
    initials() {
      let initials = "";
      if (this.$store.state.user.logged) {
        const n = this.$store.state.user.name.toUpperCase();
        const n_array = n.split(" ");
        if (n_array.length == 1) {
          initials = n.substring(0, 1).toUpperCase();
          if (n.length > 1) {
            initials += n.substring(1, 2).toLowerCase();
          }
        } else {
          initials =
            n_array[0].substring(0, 1).toUpperCase() +
            n_array[1].substring(0, 1).toUpperCase();
        }
      }
      return initials;
    },
    nombrePlan() {
      if (!this.$store.state.planes.cplanes) {
        return null;
      }
      let r = "base";
      const cplanes = this.$store.state.planes.cplanes;
      if (this.$store.state.user.subscription) {
        const keys = Object.keys(cplanes);
        // -------
        const stripe_price = this.$store.state.user.subscription.stripe_price;

        keys.forEach((ke) => {
          if (cplanes[ke]["price"]["base_imponible"] != 0) {
            if (cplanes[ke]["price"]["prices"]) {
              const st = cplanes[ke]["price"]["prices"].find(
                (e) => stripe_price == stripe_price
              );
              if (st) {
                r = cplanes[ke]["price"]["name"];
              }
            }
          }
        });
      }
      return this.$t("plan-x", {
        plan: cplanes[r]["nombre"][this.$i18n.locale],
      });
    },
  },
};
</script>   

<style lang="scss" scoped>
.user-name {
  font-size: 1.75rem;
}
.user-email {
  font-size: 0.75rem;
}
</style>