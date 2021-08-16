<template>
    <div>
        <ClipLoader :loading="isLoading" :size="size" :style="{opacity : opacity, backgroundColor: backgroundColor}" />
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
    export default {
        name: 'BaseSpinner',
        props: {
            isLoading: {},
            opacity: {
                default: 1
            },
            size: {
                default: '60px'
            },
            backgroundColor: {
                default: 'rgba(0,0,0,0)'
            }
        },
        components: {
            ClipLoader
        }
    }
</script>

<style scoped>

</style>