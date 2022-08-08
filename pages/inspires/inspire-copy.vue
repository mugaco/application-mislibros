<template>

  <EditorDocs :book_id="book_id" :md_id="md_id"/>
 
</template>

<script>
import Reader from "&/common/stuff/reader"
import EditorDocs from "&/common/stuff/editor-docs"
  export default {
    layout:"editor-docs",
    components:{Reader,EditorDocs},
    data:()=>({
      md_id:null,
      book_id:"62ea8367f383af0d312ad1e5"
    })
  }
</script>

<style lang="scss" scoped>

</style>