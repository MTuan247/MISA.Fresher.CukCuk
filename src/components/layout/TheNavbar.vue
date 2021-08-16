<template>
    <div class="navbar" :class="{'navbar--collapsed' : isCollapsed}">
        <div class="navbar-content" >
            <div id="overview" class="nav-item">
                <div class="nav-item-icon" style=""></div>
                <div class="nav-item-text">Tổng quan</div>
            </div>
            <div id="report" class="nav-item">
                <div class="nav-item-icon" ></div>
                <div class="nav-item-text">Báo cáo</div>
            </div>
            <div id="shop" class="nav-item">
                <div class="nav-item-icon" ></div>
                <div class="nav-item-text">Mua hàng</div>
            </div>
            <router-link to="Customer" id="customer" class="nav-item">
                <div class="nav-item-icon">
                </div>
                <div class="nav-item-text">Danh mục khách hàng</div>
            </router-link>
            <router-link to="Employee" id="employee" class="nav-item">
                <div class="nav-item-icon">
                </div>
                <div class="nav-item-text">Danh mục nhân viên</div>
            </router-link>
            <div id="setting" class="nav-item">
                <div class="nav-item-icon"></div>
                <div class="nav-item-text">Thiết lập hệ thống</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheNavbar',
        props: ['isCollapsed']
    }
</script>

<style scoped>
    @import url('../../css/layout/navbar.css');
</style>