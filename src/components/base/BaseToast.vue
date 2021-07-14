<template>
    <div class="toast toast--${type}">
        <div class="toast__icon">
            <img :src="'./assets/icon/' + type + '.png'" alt="">
        </div>
        <div class="toast__messenger">${message}</div>
        <i class="fa fa-times toast__close-icon" aria-hidden="true"  onclick="hideToast($(this).parent())" ></i>
    </div>
</template>

<script>
    export default {
        name: "BaseToast",
        props: {
            type: {
                type: String
            },
            message: {
                type: String
            },
            show: {
                default: true
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/toast.css'
</style>