<template >
  <div class="portrait-footer">
    <p class="publisher-portrait">
      <span class="editor">
        {{ $store.state.book.book_publisher }}
      </span>
      <span class="coleccion">{{ $store.state.book.book_collection }}</span>
    </p>
  </div>
</template>

<script>
export default {};
</script>

