<template>
    <div class="toast" :class="classType">
        <div class="toast__icon">
            <img :src="imgType" alt="">
        </div>
        <div class="toast__messenger">{{message}}</div>
        <i class="fa fa-times toast__close-icon" aria-hidden="true"></i>
    </div>
</template>

<script>
    export default {
        name: 'BaseToast',
        props: {
            type: {
                default: 'success'
            },
            message: {
                type: String,
                default: ''
            }
        },
        computed: {
            classType() {
                return 'toast--' + this.type
            },

            imgType() {
                return '/assets/icon/' + this.type + '.png'
            }
        },
        created() {

        }
    }
</script>

<style scoped>
@import '../../css/base/toast.css';
</style>