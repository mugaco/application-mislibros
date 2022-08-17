<template>
  <div class="social-icons mt-10">
    <a :href="facebook">
      <i class="mdi mdi-facebook"></i>
    </a>
    <a href="#">
      <i class="mdi mdi-twitter"></i>
    </a>
    <a href="#">
      <i class="mdi mdi-google-plus"></i>
    </a>
    <a href="#">
      <i class="mdi mdi-youtube"></i>
    </a>
    <a href="#">
      <i class="mdi mdi-instagram"></i>
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    facebook() {
      return "javascript:window.open('https://www.facebook.com/sharer/sharer.php?u=https://smallbusiness.chron.com/add-social-media-buttons-facebook-business-28705.html', 'socialshare', 'width=550,height=450')";
    },
  },
};
</script>

<style lang="scss" scoped>
</style>