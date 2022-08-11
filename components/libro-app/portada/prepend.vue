<template>
  <div>
   
    <div class="portrait-header">
      <p class="title-portrait">{{ $store.state.book.book_title }}</p>
      <p v-if="$store.state.book.book_subtitle" class="subtitle-portrait">
        {{ $store.state.book.book_subtitle }}
      </p>
      <p class="author-portrait">{{ $store.state.book.book_author }}</p>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css" scoped>

</style>
