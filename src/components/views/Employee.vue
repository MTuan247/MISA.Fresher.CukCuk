<template>
  <div id="employee">
    <TheHeader />
    <div class="main">
      <EmployeeForm 
        baseUrl="http://cukcuk.manhnv.net/v1/Employees"
        v-show='modalShow'
        @closeModal='closeModal'
        :entityId='employeeId'
        :entity='entity'
      />
      <TheNavbar />
      <EmployeeContent 
        @openModal='openModal'
        @closeModal='closeModal'
        :modalShow='modalShow'
      />
    </div>
  </div>
</template>

<script>
import EmployeeContent from "./employee/EmployeeContent.vue";
import TheHeader from "../layout/TheHeader.vue";
import TheNavbar from "../layout/TheNavbar.vue";
import EmployeeForm from "./employee/EmployeeForm.vue"

export default {
  name: "Employee",
  components: {
    TheHeader,
    TheNavbar,
    EmployeeContent,
    EmployeeForm,
  },
  data() {
    return {
      modalShow: false,
      employeeId: null,
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