<template>
  <div id="employee">
    <TheHeader />
    <div class="main">
      <BaseForm 
        baseUrl="http://cukcuk.manhnv.net/v1/Employees"
      />
      <TheNavbar />
      <TheContent />
    </div>
  </div>
</template>

<script>
import TheContent from "../layout/TheContent.vue";
import TheHeader from "../layout/TheHeader.vue";
import TheNavbar from "../layout/TheNavbar.vue";
import BaseForm from "../base/BaseForm.vue"
export default {
  name: "Employee",
  components: {
    TheHeader,
    TheNavbar,
    TheContent,
    BaseForm,
  },
};
</script>