<template>
  <div>
    <date-picker 
      v-model="computedDate"                 
      format='DD/MM/YYYY'
      value-type="YYYY-MM-DD"
      :lang="lang"
      :input-class="inputClass"
    ></date-picker>
  </div>
</template>

<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import 'vue2-datepicker/locale/vi'
  import '../../css/base/datepick.css'

  export default {
    components: { DatePicker },
    props: {                    
      inputClass: {

      },
      value: {

      }
    },
    computed: {
      computedDate: {
        get: function() {
          return this.value;
        },
        set: function(value) {
          this.$emit('input', value)
        },
      }
      
    },
    data() {
      return {
        date: "24/07/2019",
        lang: {
          formatLocale: {
            firstDayOfWeek: 1,
          },
          monthBeforeYear: false,
        }
      };
    },
    methods: {
      inputFocusoutEvent() {}
    }
  };
</script>
