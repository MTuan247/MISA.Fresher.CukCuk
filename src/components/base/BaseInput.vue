<template>
    <div class="field-label">
        <transition name="fade">
            <div v-if="tooltip" v-show="isShowTooltip" class="input-warning">
                <span>{{ this.tooltipMessage }}</span>
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </div>
        </transition>
        <div class="label" >{{inputLabel}} <span v-if="required" >(<span style="color: red;">*</span>)</span></div>
        <input 
            ref="Input"
            autocomplete="off"
            :disabled="isDisabled"
            :id="inputId" 
            :class="[inputClass, { 'field--error': !isValid, 'field--focus': isFocus }]" 
            :type="inputType" 
            :maxlength="inputMaxlength" 
            :name="inputName"
            :required="required"
            :pattern="pattern"
            :value="this.value"
            @input="onInputEvent"
            @focus="inputFocusEvent"
            @blur="inputFocusoutEvent"
            @keypress="filterInput($event)"
        >
        <span class="currency" v-if="inputId == 'salary'">(VND)</span>
        <i v-if="clearIcon" v-show="!this.isEmpty" class="fa fa-times icon-right" @click="clearInput" aria-hidden="true"></i>
    </div>
</template>

<script>
    export default {
        name: 'BaseInput',
        props: {
            //Label input
            inputLabel: {},
            //Loại input email, text, number
            inputType: {
                type: String,
                default: 'text'
            },
            //Class cho input
            inputClass: {
                type: String
            },
            //Id cho input
            inputId: {
                type: String
            },
            //Name attribute input
            inputName: {
                type:String
            },
            //Max length
            inputMaxlength: {
                type: Number,
                default: 100
            },
            //Clear icon
            clearIcon: {
                default: true,
            },
            //Có tooltip k
            tooltip: {
                default: false,
            },
            //Bắt buộc
            required: {
                default: false
            },
            //Pattern
            pattern: {
                default: ''
            },
            //Giá trị truyền vào
            modelValue: {
                type: String,
                default: ''
            },
            isDisabled: {
                default: false
            },
            filterInputType: {
                default: 'text'
            }
        },
        data() {
            return {
                isFocus: false,
                isEmpty: true,
                isValid: true,
                isShowTooltip: false,
                value: this.modelValue,
                tooltipMessage: '',
            }
        },
        computed: {
        },
        watch: {
            modelValue: function(value) {
                this.value = value
                this.isFocus = false
                // this.isValid = true
            }
        },
        methods: {
            /**
             * Method xử lí event focusin
             * @author: NMTuan (15/7/2021)
             */
            inputFocusEvent() {
                this.isFocus = true
            },

            /**
             * Method xử lí event focusout
             * @author: NMTuan (15/7/2021)
             */
            inputFocusoutEvent() {
                this.isFocus = false;
                this.tooltipMessage = this.getValidateMessage();
                this.showTooltip();
                this.$emit('setValid', this.isValid);
                this.$emit('update', this.value);
            },

            /**
             * Method xử lý sự kiện khi đang nhập
             * @author: NMTuan (15/7/2021)
             */
            onInputEvent($event) {
                this.value = $event.target.value;

                if (this.inputId == 'salary') {
                    this.$emit('update', $event.target.value);
                    // this.value = formatMoney($event.target.value)
                }
                
                this.showClearIcon();
            },

            /**
             * Method xử lý sự kiện khi click clear button
             * @author: NMTuan (15/7/2021)
             */
            clearInput() {
                this.$emit('update', '');
                this.isEmpty = true;
            },

            /**
             * Method xử lý ẩn hiện clear icon
             * @author: NMTuan (15/7/2021)
             */
            showClearIcon() {
                if(this.value) {
                    this.isEmpty = false;
                } else {
                    this.isEmpty = true;
                }
            },

            /**
             * Method xử lý lấy giá trị message trong tooltip
             * @author: NMTuan (15/7/2021)
             */
            getValidateMessage() {
                //Kiểm tra trường bắt buộc
                if(this.required) {
                    if(!this.value) {                        
                        this.isValid = false;
                        return "Không được để trống";
                    }
                }
                //Kiểm tra email
                if(this.inputType == 'email') {
                    //eslint-disable-next-line
                    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailPattern.test(this.value)) {
                        this.isValid = false;
                        return "Email không đúng định dạng";
                    }
                }
                //Kiểm tra theo pattern
                if(this.pattern) {
                    if(!new RegExp(this.pattern).test(this.value) && this.value) {
                        this.isValid = false;
                        return this.inputLabel + " không đúng định dạng";
                    }
                }
                this.isValid = true;
                return '';
            },

            /**
             * Method hiện tooltip
             * @author: NMTuan (15/7/2021)
             */
            showTooltip() {
                if(this.tooltip){
                    if(!this.isValid) {
                        this.isShowTooltip = true;
                        setTimeout(() => { this.isShowTooltip = false}, 2000);
                    }
                }
            },

            filterInput: function(evt) {
                if (this.filterInputType == "number") {
                    evt = (evt) ? evt : window.event;
                    var charCode = (evt.which) ? evt.which : evt.keyCode;
                    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                        evt.preventDefault();
                    } else {
                        return true;
                    }
                }
            }

        }

    }
</script>

<style scoped>
@import '../../css/base/input.css';

.fade-enter-active, .fade-leave-active {
  transition: all .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(10px);
}

</style>