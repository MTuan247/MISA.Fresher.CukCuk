<template>
    <div class="date-picker">
        <input 
            ref="input" 
            v-model="computedDate" 
            class="date-picker__input" 
            type="text"
            placeholder="__/__/____"
            :class="[inputClass, {'date-picker__input--error' : !isValid}]"
            @focus="inputFocusEvent" 
            @blur="inputFocusoutEvent"
            @input="inputEvent" 
            @keypress.enter="inputEnterPress"
        />
        <v-date-picker 
            v-show="isShow" 
            v-model="date"
            locale="vi"
            color="#019160"
            header-color="#019160"
            :class="{'v-picker--up' : position == 'up', 'v-picker--down' : position == 'down'}"
            @click:date="dateClickEvent"
        ></v-date-picker>
        <i @click="iconClickEvent" class="far fa-calendar calender-icon"></i>
    </div>
</template>

<script>

    export default {
        name: 'BaseDatePicker',
        props: {
            inputClass: {
                type: String
            },
            value: {
                default: ''
            },
            position: {
                default: 'down'
            }
        },
        data() {
            return {
                isShow: false,
                date: this.value,
                inputDate: this.value,
                isValid: true
            }
        },
        computed: {
            /**
             * Giá trị đã chuyển đổi sang dd/mm/yyyy
             */
            computedDate: {
                get: function() {
                    return this.formatDate(this.date);
                },

                set: function(value) {
                    // this.date = this.reverseFormatDate(value)
                    if (this.isDate(value)) {
                        this.date = this.reverseFormatDate(value)
                    }
                }
            }
        },
        watch: {
            value: function(val) {
                this.date = val
            }
        },
        methods: {
            /**
             * Method xử lý khi focus input
             */
            inputFocusEvent() {
            },

            /**
             * Method xử lý khi focusout
             * @author: NMTuan (29/07/2021)
             */
            inputFocusoutEvent() {
                if (this.isValid) this.$emit('input', this.date)
                else this.$emit('input', null)
                this.$emit('setValid', this.isValid)
            },

            /**
             * Method xử lý khi đang input
             */
            inputEvent() {

            },

            /**
             * Method xử lý khi click dropdown icon
             * @author: NMTuan (29/07/2021)
             */
            iconClickEvent() {
                this.$refs.input.focus()
                this.isShow = true
            },

            /**
             * Method xử lý khi nhấn enter
             * @author: NMTuan (29/07/2021)
             */
            inputEnterPress() {
                this.isShow=true
            },

            /**
             * Method xử lý khi click chọn ngày
             * @author: NMTuan (29/07/2021)
             */
            dateClickEvent(value) {
                this.computedDate = value;
                this.isShow = false
                this.$emit('input', this.date)
                this.$emit('setValid', true)
            },

            /**
             * Method chuyển đổi về dạng dd/mm/yyyy
             * @author: NMTuan (29/07/2021)
             */
            formatDate(date) {
                if (!date) return null;
                const [year, month, day] = date.split("-");
                return `${day}/${month}/${year}`;
            },

            /**
             * Chuyển đổi về dạng yyyy-mm-dd
             * @author: NMTuan (29/07/2021)
             */
            reverseFormatDate(date) {
                if (!date) return null;
                const [day, month, year] = date.split("/");
                return `${year}-${month}-${day}`;
            },

            /**
             * Check value có phải date k
             * @author: NMTuan (29/07/2021)
             */
            isDate(date) {
                if (!date) {
                    this.isValid = true;
                    return true
                } 
                let checkDate = this.reverseFormatDate(date)
                checkDate = new Date(checkDate)
                if(checkDate == 'Invalid Date') {
                    this.isValid = false
                    return false
                } else {
                    date = checkDate
                }
                this.isValid = true
                return true
            },

            /**
             * Method xử lý khi click ra ngoài
             */
            clickOutside (e) {
                if (!this.$el.contains(e.target)) {
                    this.isShow = false
                }
            }
        },
        mounted () {
            document.addEventListener('click', this.clickOutside)
        },
        beforeDestroy () {
            document.removeEventListener('click',this.clickOutside)
        }
    }
</script>

<style scoped>
@import '../../css/base/datepicker.css';
</style>