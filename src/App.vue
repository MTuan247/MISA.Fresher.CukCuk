<template>
  <div id="app">
    <div id="employee">
      <TheHeader />
      <div class="main">
        <TheNavbar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from "./components/layout/TheHeader.vue";
import TheNavbar from "./components/layout/TheNavbar.vue";

export default {
  name: 'App',
  components: {
    TheHeader, TheNavbar
  }
}
</script>

<style>
@import '../lib/fontawesome-5.15.1/css/all.min.css';
@import './css/main.css';
@import './css/common/common.css';
@import './css/common/text.css';
</style>
