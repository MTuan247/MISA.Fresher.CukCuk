<template>
  <div id="app">
    <TheHeader />
    <div class="main">
      <TheNavbar />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheContent from './components/layout/TheContent.vue'
import TheHeader from './components/layout/TheHeader.vue'
import TheNavbar from './components/layout/TheNavbar.vue'
export default {
  name: 'App',
  components: {
    TheHeader, TheNavbar,
    TheContent
  }
}
</script>

<style>
@import './css/main.css'
</style>
