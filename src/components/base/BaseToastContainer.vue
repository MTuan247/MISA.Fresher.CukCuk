<template>
    <transition-group name="list">
        <BaseToast v-for="toast in toasts" :key="toast.message"
            :type="toast.type"
            :message="toast.message"
        />
    </transition-group>
</template>

<script>
    import EventBus from '../../plugins/eventbus';
    import BaseToast from './BaseToast.vue'
    export default {
        name: 'BaseToastContainer',
        components: {
            BaseToast
        },
        data() {
            return {
                toasts: []
            }
        },
        created() {
            EventBus.$on('appendToast', this.appendToast)
        },
        destroyed() {
            // Stop listening the event hello with handler
            EventBus.$off('appendToast', this.appendToast);
        },
        methods: {
            appendToast(toast) {
                this.toasts.push(toast)
                setTimeout(() => {
                    this.toasts = this.toasts.filter((item) => {
                    return item != toast
                    })
                }, 2000)
            }
        }
    }
</script>

<style lang="css" scoped>

.list-enter-active, .list-leave-active {
  transition: all 1s;
}

.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.list-enter {
  opacity: 0;
  transform: translateY(-30px);
}

</style>