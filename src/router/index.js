import Vue from 'vue'
import Router from 'vue-router'
import Employee from '../components/views/employee/Employee.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Default',
      component: Employee,
      props: true
    },
    {
      path: '/Employee',
      name: 'Employee',
      component: Employee
    }
  ]
})