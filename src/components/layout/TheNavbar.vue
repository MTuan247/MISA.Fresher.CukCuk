<template>
    <div class="navbar">
        <div class="navbar-content">
            <div class="nav-item">
                <div class="nav-item-icon" style="background-image: url('../src/assets/icon/dashboard.png')"></div>
                <div class="nav-item-text">Tổng quan</div>
            </div>
            <div class="nav-item">
                <div class="nav-item-icon" style="background-image: url('./assets/icon/report.png')"></div>
                <div class="nav-item-text">Báo cáo</div>
            </div>
            <div class="nav-item">
                <div class="nav-item-icon" style="background-image: url('./assets/icon/dashboard.png')"></div>
                <div class="nav-item-text">Mua hàng</div>
            </div>
            <a href="/customer.html">
                <div class="nav-item">
                    <div class="nav-item-icon" style="background-image: url('./assets/icon/dic-employee.png')">
                    </div>
                    <div class="nav-item-text">Danh mục khách hàng</div>
                </div>
            </a>
            <a href="/employee.html">
                <div class="nav-item">
                    <div class="nav-item-icon" style="background-image: url('./assets/icon/dic-employee.png')">
                    </div>
                    <div class="nav-item-text">Danh mục nhân viên</div>
                </div>
            </a>
            <div class="nav-item">
                <div class="nav-item-icon" style="background-image: url('./assets/icon/setting.png')"></div>
                <div class="nav-item-text">Thiết lập hệ thống</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TheNavbar'
    }
</script>

<style scoped>
    @import url('../../css/layout/navbar.css');
</style>