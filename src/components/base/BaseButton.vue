<template>
  <div 
    tabindex="0" 
    class="btn-base" 
    :class="btnClass" 
    :id="id" 
    :style="{ backgroundImage: 'url(' + this.background + ')' }" 
    @click="this.handleEvent" 
    @keydown.enter="handleEvent"
  >
    <div
      v-if="icon"
      class="icon-lelf div-icon iconLeft"
      :style="{ backgroundImage: 'url(' + this.icon + ')' }"
    ></div>
    <i v-if="i" :class="i"></i>
    <div v-if="title" >{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: ['id', 'btnClass', 'icon', 'title', 'clickEvent', 'background', 'i', 'isDisabled'],
  computed: {
  },
  methods: {
    /**
     *Hàm xử lý event truyền vào
     */
    handleEvent() {
      if (!this.isDisabled) {
        this.clickEvent('')
      }
    }
  }
};
</script>

<style scoped>
@import "../../css/base/button.css";

</style>