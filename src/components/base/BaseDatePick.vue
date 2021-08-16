<template>
  <div>
    <date-picker 
      v-model="computedDate"                 
      :format='formatType'
      value-type="YYYY-MM-DD"
      :placeholder="formatType"
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

      },
      formatType: {
        default: 'DD/MM/YYYY'
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
