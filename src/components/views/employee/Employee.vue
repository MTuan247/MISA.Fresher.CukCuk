<template>
  <div id="employee">
    <!-- <div class="main"> -->
    <EmployeeForm 
      baseUrl="http://cukcuk.manhnv.net/v1/Employees"
      v-if='modalShow'
      @closeModal='closeModal'
      :entityId='employeeId'
      :entity='entity'
    />
    <EmployeeContent 
      @openModal='openModal'
      @closeModal='closeModal'
      :modalShow='modalShow'
    />
    <!-- </div> -->
  </div>
</template>

<script>
import EmployeeContent from "./EmployeeContent.vue";
import EmployeeForm from "./EmployeeForm.vue"

export default {
  name: "Employee",
  components: {
    EmployeeContent,
    EmployeeForm,
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