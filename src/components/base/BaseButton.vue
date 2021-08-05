<template>
  <div :id="id" :class="btnClass" @click="this.click" :style="{ backgroundImage: 'url(' + this.background + ')' }" >
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
    click() {
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