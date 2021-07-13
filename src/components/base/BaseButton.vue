<template>
  <div :id="id" :class="btnClass" @click="this.clickEvent" >
    <div
      class="icon-lelf div-icon iconLeft"
      :style="{ backgroundImage: 'url(' + this.icon + ')' }"
    ></div>
    <div>{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "BaseButton",
  props: ['id', 'btnClass', 'icon', 'title', 'clickEvent'],
  computed: {
  },
  methods: {
    
  }
};
</script>

<style scoped>
@import "../../css/base/button.css";

</style>