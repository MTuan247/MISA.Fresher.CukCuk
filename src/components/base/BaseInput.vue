<template>
    <div>
        <div class="label" >{{inputLabel}}</div>
        <input :id="inputId" :class="inputClass" :type="inputType" :maxlength="inputMaxlength" :name="inputName">
        <i v-if="clearIcon" class="fa fa-times icon-right" aria-hidden="true"></i>
    </div>
</template>

<script>
    export default {
        name: 'BaseInput',
        // props: ['inputLabel', 'inputType', 'inputClass', 'inputId', 'inputName', 'inputMaxlength'],
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
            }
        }

    }
</script>

<style scoped>
@import '../../css/base/input.css';
</style>