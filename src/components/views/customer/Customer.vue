<template>
  <div id="employee">
    <!-- <div class="main"> -->
    <CustomerForm 
      baseUrl="http://cukcuk.manhnv.net/v1/Employees"
      v-if='modalShow'
      @closeModal='closeModal'
      :entityId='employeeId'
    />
    <BasePopup 
      :type="popup['type']"
      :title="popup['title']"
      :message="popup['message']"
      :isShow="popup['isShow']"
      :callback="popup['callback']"
      :confirm="popup['confirm']"
    />
    <CustomerContent 
      :isContentCollapse="isContentCollapse"
      ref="EmployeeContent"
      @openModal='openModal'
      @closeModal='closeModal'
      :modalShow='modalShow'
    />
    <!-- </div> -->
  </div>
</template>

<script>
import CustomerContent from "./CustomerContent.vue";
import CustomerForm from "./CustomerForm.vue"
import BasePopup from "../../base/BasePopup"

export default {
  name: "Employee",
  props: ['isContentCollapse'],
  components: {
    CustomerContent,
    CustomerForm,
    BasePopup,
  },
  data() {
    return {
      modalShow: false,
      employeeId: null,
      popup: {
        title: '',
        message: '',
        type: 'warning',
        isShow: false,
      },
    }
  },
  methods: {

    openModal(id) {
      this.modalShow = true
      this.employeeId = id
    },

    closeModal() {
      this.modalShow = false
    },

  }
};
</script>