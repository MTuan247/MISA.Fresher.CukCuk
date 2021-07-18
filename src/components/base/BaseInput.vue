<template>
    <div>
        <div v-if="tooltip" v-show="isShowTooltip" class="input-warning">
            <span>{{ this.tooltipMessage }}</span>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <div class="label" >{{inputLabel}} <span v-if="required" >(<span style="color: red;">*</span>)</span></div>
        <input 
            :id="inputId" 
            :class="{inputClass, 'field--error': !isValid, 'field--focus': isFocus }" 
            :type="inputType" 
            :maxlength="inputMaxlength" 
            :name="inputName"
            :required="required"
            :pattern="pattern"
            :value="this.modelValue"
            @input="onInputEvent"
            @focus="inputFocusEvent"
            @blur="inputFocusoutEvent"
        >
        <i v-if="clearIcon" v-show="!this.isEmpty" class="fa fa-times icon-right" @click="clearInput" aria-hidden="true"></i>
    </div>
</template>

<script>
    export default {
        name: 'BaseInput',
        props: {
            inputLabel: String,
            inputType: {
                type: String,
                default: 'text'
            },
            inputClass: {
                type: String
            },
            inputId: {
                type: String
            },
            inputName: {
                type:String
            },
            inputMaxlength: {
                type: Number,
                default: 100
            },
            clearIcon: {
                default: true,
            },
            tooltip: {
                default: false,
            },
            required: {
                default: false
            },
            pattern: {
                default: ''
            },
            modelValue: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                isFocus: Boolean,
                isEmpty: Boolean,
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
                this.isValid = true
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
                this.isFocus = false
                this.tooltipMessage = this.getValidateMessage()
                this.showTooltip()
                this.$emit('setValid', this.isValid)
            },

            /**
             * Method xử lý sự kiện khi đang nhập
             * @author: NMTuan (15/7/2021)
             */
            onInputEvent($event) {
                this.$emit('update', $event.target.value)
                this.value = $event.target.value
                this.showClearIcon()
            },

            /**
             * Method xử lý sự kiện khi click clear button
             * @author: NMTuan (15/7/2021)
             */
            clearInput() {
                this.$emit('update', '')
                this.isEmpty = true
            },

            showClearIcon() {
                if(this.value) {
                    this.isEmpty = false
                } else {
                    this.isEmpty = true
                }
            },

            getValidateMessage() {
                if(this.required) {
                    if(!this.value) {                        
                        this.isValid = false
                        return "Không được để trống"
                    }
                }
                if(this.inputType == 'email') {
                    //eslint-disable-next-line
                    const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!emailPattern.test(this.value)) {
                        this.isValid = false
                        return "Email k đúng đinh dạng"
                    }
                }
                this.isValid = true
                return ''
            },

            showTooltip() {
                if(this.tooltip){
                    if(!this.isValid) {
                        this.isShowTooltip = true
                        setTimeout(() => { this.isShowTooltip = false}, 3000)
                    }
                }
            }

        }

    }
</script>

<style scoped>
@import '../../css/base/input.css';
</style>