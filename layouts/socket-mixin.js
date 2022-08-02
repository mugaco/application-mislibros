import io from "socket.io-client";
export default {
  computed: {
    socket() {
      return io.connect(process.env.socket)
    }
  },

  mounted() {
    this.socket.on("filegun-subscription-deleted", this.callbackSubscriptionDeleted);
    this.socket.on("force-location-reload", this.callbackLocationReload);
    //this.$setAgentNotiList(this.$store.state.user.agent_id)
  },
  destroyed() {
    this.socket.removeListener(
      "filegun-subscription-deleted",
      this.callbackSubscriptionDeleted
    );
    this.socket.removeListener(
      "force-location-reload",
      this.callbackLocationReload
    );
  },
  methods: {
    callbackSubscriptionDeleted(subs) {
      if (this.$store.state.user.subscription) {
        if (this.$store.state.user.subscription.stripe_id) {
          if (subs.subscription_id == this.$store.state.user.subscription.stripe_id) {
            this.$store.commit("user/setSubscription", null);

          }

        }
      }


    },


    callbackLocationReload(data) {
      // console.log('reload')
      // location.reload()
      this.$store.commit('app/setControl',data.control)
      setTimeout(()=>{
        location.reload()
      },2000)
    },




  },
}
