<template>
    <div class="paging-bar">
        <div class="paging-left">
            Hiển thị 1-10/1000 nhân viên
        </div>
        <div class="paging-center">
            <div class="paging-item paging-control paging-first"
                style="background-image: url('./assets/icon/btn-firstpage.svg');"></div>
            <div class="paging-item paging-control paging-prev"
                style="background-image: url('./assets/icon/btn-prev-page.svg');"></div>
            <div class="paging-item paging-number paging-number--active">1</div>
            <div class="paging-item paging-number">2</div>
            <div class="paging-item paging-number">3</div>
            <div class="paging-item paging-number">4</div>
            <div class="paging-item paging-control paging-next"
                style="background-image: url('./assets/icon/btn-next-page.svg');"></div>
            <div class="paging-item paging-control paging-last"
                style="background-image: url('./assets/icon/btn-lastpage.svg');"></div>
        </div>
        <div class="paging-right">
            10 nhân viên/trang
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ThePagination'
    }
</script>

<style scoped>
@import '../../css/layout/pagination.css'
</style>