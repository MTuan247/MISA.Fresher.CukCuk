<template>
  <div class="router-view">
    <transition name="fade">
      <EmployeeForm 
        v-if='modalShow'
        @closeModal='closeModal'
        :entityId='employeeId'
      />
    </transition>
    <BaseToastContainer />
    <BasePopup 
      :type="popup['type']"
      :title="popup['title']"
      :message="popup['message']"
      :isShow="popup['isShow']"
      :callback="popup['callback']"
      :confirm="popup['confirm']"
    />
    
    <EmployeeContent 
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
import EmployeeContent from "./EmployeeContent.vue";
import EmployeeForm from "./EmployeeForm.vue"
import BasePopup from "../../base/BasePopup"
import BaseToastContainer from '../../base/BaseToastContainer.vue';

export default {
  name: "Employee",
  props: ['isContentCollapse'],
  components: {
    EmployeeContent,
    EmployeeForm,
    BasePopup,
    BaseToastContainer,
  },
  created() {
    localStorage.formatDate = "DD/MM/YYYY"
    this.$eventBus.$on('openModal', this.openModal)
  },
  destroyed() {
    this.$eventBus.$off('openModal', this.openModal);
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
    /**
     * Hàm mở form
     */
    openModal(id) {
      this.modalShow = true
      this.employeeId = id
    },

    /**
     * Hàm đóng form
     */
    closeModal() {
      this.modalShow = false
    }

  }
};
</script>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>