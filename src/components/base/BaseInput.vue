<template>
    <div>
        <div v-if="tooltip" class="input-warning">
            <span>Định dạng không đúng</span>
            <i class="fa fa-caret-down" aria-hidden="true"></i>
        </div>
        <div class="label" >{{inputLabel}} <span v-if="required" >(<span style="color: red;">*</span>)</span></div>
        <input 
            :id="inputId" 
            :class="inputClass" 
            :type="inputType" 
            :maxlength="inputMaxlength" 
            :name="inputName"
            :required="required"
            :pattern="pattern"
            @input="onInputEvent"
        >
        <i v-if="clearIcon" class="fa fa-times icon-right" @click="clearInput" aria-hidden="true"></i>
    </div>
</template>

<script>
    import $ from 'jquery'
    import { showClearIcon } from '../../js/base/input'
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
            }
        },
        computed: {
        },
        methods: {
            /**
             * Method xử lí event focusin
             * @author: NMTuan (15/7/2021)
             */
            inputFocusEvent() {
                $(this.$el).addClass('field--focus')
            },

            /**
             * Method xử lí event focusout
             * @author: NMTuan (15/7/2021)
             */
            inputFocusoutEvent() {
                $(this.$el).removeClass('field--focus')
            },

            /**
             * Method xử lý sự kiện khi đang nhập
             * @author: NMTuan (15/7/2021)
             */
            onInputEvent() {
                showClearIcon(this.$el)
            },

            /**
             * Method xử lý sự kiện khi click clear button
             * @author: NMTuan (15/7/2021)
             */
            clearInput() {
                $(this.$el).find('input').val('')
                $(this.$el).find('input').trigger('input')
            },

        }

    }
</script>

<style scoped>
@import '../../css/base/input.css';
</style>