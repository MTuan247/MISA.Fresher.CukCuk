<template>
  <div id="employee">
    <TheHeader />
    <div class="main">
      <BaseForm 
        baseUrl="http://cukcuk.manhnv.net/v1/Employees"
        v-show='modalShow'
        @closeModal='closeModal'
        :entityId='employeeId'
        :entity='entity'
      />
      <TheNavbar />
      <TheContent 
        @openModal='openModal'
        @closeModal='closeModal'
        :modalShow='modalShow'
      />
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
  data() {
    return {
      modalShow: false,
      employeeId: null,
      entity: []
    }
  },
  methods: {

    openModal(id) {
      this.modalShow = true
      this.employeeId = id
    },

    closeModal() {
      this.modalShow = false
    }

  }
};
</script>