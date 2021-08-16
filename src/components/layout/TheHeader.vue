<template>
    <div class="header">
        <div class="header-left">
            <div class="logo-site">
                <div class="toggle-icon" @click="collapseContent" ></div>
                <div class="site-icon"></div>
            </div>
            <div class="header-title">
                <div class="text-title2">Nhà hàng biển đông</div>
                <div class="dropdown-icon div-icon">
                </div>
            </div>
        </div>
        <div class="account">
            <div class="avatar"></div>
            <div class="username text-title2">Nguyễn Văn Mạnh</div>
            <div class="icon"></div>
        </div>
    </div>
</template>

<script>
    export default {
        /**
         * Layout Header
         */
        name: 'TheHeader',
        methods: {
            collapseContent() {
                this.$parent.isContentCollapsed = !this.$parent.isContentCollapsed
            }
        }
    }
</script>

<style lang="css" scoped>
@import '../../css/layout/header.css';
</style>