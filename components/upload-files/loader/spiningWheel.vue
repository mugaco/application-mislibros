<template>
  <svg
    class="spining-input"
    :class="{ 'drag-over-input': $store.state.mod.dragingOverInput }"
    version="1.1"
    id="L1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    enable-background="new 0 0 100 100"
    xml:space="preserve"
  >
    <circle
      fill="none"
      :stroke="$store.state.files.filesUploading ? 'rgba(63,71,218,1)' : 'rgba(0,0,0,0.5)'"
      stroke-width="2"
      stroke-dasharray="9,18.2"
      cx="50"
      cy="50"
      r="48"
    >
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        dur="10"
        from="0 50 50"
        to="360 50 50"
        repeatCount="indefinite"
      />
    </circle>
    <animateTransform
      v-if="$store.state.files.filesUploading"
      attributeName="transform"
      dur="1s"
      type="scale"
      values="1; 1.2; 1"
      repeatCount="indefinite"
      begin="0"
    />
  </svg>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.spining-input {
  width: 150px;
  height: 150px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  stroke-linecap: round;

  &:hover,
  &.drag-over-input {
    transition: 0.5s;
    transform: scale(1.2);
  }
}
</style>