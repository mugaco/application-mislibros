<template>
  <div class="item-buttons-container">
    <v-btn
      v-for="i in items"
      :key="i"
      @click="manage_item(i)"
      class="item-button"
      text
      :style="
        itemsActive.includes(i)
          ? 'background-color:rgb(0,0,0,0.15)'
          : 'color:grey'
      "
    >
      {{ i }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["items", "multiple", "mandatory"],
  data() {
    return{
      itemsActive: [],
    }
  },
  mounted() {
    this.itemsActive = [this.items[0]];
    if(this.multiple){
      this.$emit("items-active", this.itemsActive);
    }
    else{
      this.$emit("items-active", this.itemsActive[0]);
    }
  },
  methods: {
    manage_item(item) {
      this.itemsActive = this.itemsActive.filter(i => i != null);
      if (this.multiple) {
        if (this.itemsActive.includes(item)) {
          if (!this.mandatory || (this.mandatory && this.itemsActive.length > 1)) {
            this.itemsActive = this.itemsActive.filter((i) => i != item);
            this.$emit("items-active", this.itemsActive);
          }
        }
        else {
          this.itemsActive.push(item);
          this.$emit("items-active", this.itemsActive);
        }
      }
      else {
        if (this.itemsActive[0] != item) {
          this.itemsActive = [item];
          this.$emit("items-active", this.itemsActive[0]);
        } else if (!this.mandatory) {
          this.itemsActive = [];
          this.$emit("items-active", null);
        }
      }
    },
  },
};
</script>

<style lang="css" scoped>
.item-buttons-container {
  background-color: #d5d5d5;
  height: 46px;
  display: flex;
  border-radius: 8px;
}
.item-button {
  min-width: 42px !important;
  width: 42px !important;
  height: 42px !important;
  padding: 0 0 !important;
  margin: 2px;
}
</style>