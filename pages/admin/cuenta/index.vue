<template>
  <Profile />
</template>

<script>
export default {
  name: "admin-cuenta",
  middleware:"is-logged",
  layout: "admin",
  components: {
    Profile: () => import("@/components/user-profile/index.vue"),
  },
  data: () => ({}),
};
</script>