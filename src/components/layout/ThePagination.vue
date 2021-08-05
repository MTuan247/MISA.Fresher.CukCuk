<template>
    <div class="paging-bar">
        <div class="paging-left">
            Hiển thị <span>{{this.range}}</span> nhân viên
        </div>
        <div class="paging-center">

            <div class="paging-item paging-control paging-first"
                style="background-image: url('./assets/icon/btn-firstpage.svg');"
                @click="firstPage"
            ></div>

            <div class="paging-item paging-control paging-prev"
                style="background-image: url('./assets/icon/btn-prev-page.svg');"
                @click="prevPage"
            ></div>
            <!-- <div class="paging-item paging-number paging-number--active">1</div>
            <div class="paging-item paging-number">2</div>
            <div class="paging-item paging-number">3</div>
            <div class="paging-item paging-number">4</div> -->
            <div 
                v-for="number in pagingNumber" 
                :key="number" 
                @click="switchPage(number)" 
                class="paging-item paging-number"
                :class="{'paging-number--active' : number == pageNumber}"
            >{{number}}</div>

            <div class="paging-item paging-control paging-next"
                style="background-image: url('./assets/icon/btn-next-page.svg');"
                @click="nextPage"
            ></div>

            <div class="paging-item paging-control paging-last"
                style="background-image: url('./assets/icon/btn-lastpage.svg');"
                @click="lastPage"
            ></div>
        </div>
        <div class="paging-right">
            <BaseDropdown 
                :items="[
                    {
                        text: '10 nhân viên/trang',
                        val: 10
                    },
                    {
                        text: '20 nhân viên/trang',
                        val: 20
                    }
                ]"
                :dropdownValue="pageSize"
                @getValue="updatePageSize"
            />
        </div>
    </div>
</template>

<script>
    import BaseDropdown from '../base/BaseDropdown.vue'
    export default {
        name: 'ThePagination',
        components: {
            BaseDropdown
        },
        props: {
            pageNumber : {
                default: 1,
            },
            pageSize: {
                default: 10,
            },
            totalPage: {
                type: Number
            },
            totalRecord: {
                type: Number
            }
        },
        data() {
            return {
                pagingNumber: [],
                recordRange: ''
            }
        },
        created() {
            this.pagingNumber = this.getPagingNumber(this.pageNumber)
        },
        mounted() {
        },
        computed: {
            range() {
                return this.getRecordRange()
            }
        },
        watch: {
            /**
             * Kiểm tra sự thay đổi của pageNumber, totalPage thì lấy lại paging number và record range
             * @author: NMTuan (20/07/2021)
             */
            pageNumber: function (value) {
                this.pagingNumber = this.getPagingNumber(value);
            },
            totalPage: function () {
                this.pagingNumber = this.getPagingNumber(this.pageNumber);
            },
        },
        methods: {
            /**
             * Method thay đổi giá trị pageNumber
             * @author: NMTuan(21/07/2021)
             */
            switchPage(number) {
                if (number > this.totalPage) {
                    this.$emit('switchPage', this.totalPage);
                    return;
                }
                this.$emit('switchPage', number);
            },

            /**
             * Hàm sinh list paging number
             * @author: NMTuan(21/07/2021)
             * modified by: NMTuan (03/08/2021)
             */
            getPagingNumber(value) {

                //Lấy danh sách paging trong trường hợp ít hơn 4 trang
                if (this.totalPage < 4) {
                    let paging = [];
                    for (let i = 1; i <= this.totalPage; i++) {
                        paging.push(i);
                    }
                    return paging;
                }

                //Trường hợp ở trang 1
                if (value == 1) {
                    return [1,2,3,4];
                //Trường hơp ở trang gần cuối
                } else if ( this.totalPage - value < 4 ){
                    return [this.totalPage-3, this.totalPage -2, this.totalPage -1, this.totalPage];
                //Trương hợp khác
                } else {
                    return [value - 1, value, value + 1, value + 2];
                }
            },

            /**
             * Hàm sinh ra record range
             * @author: NMTuan(21/07/2021)
             */
            getRecordRange() {
                //numberStart giá trị bắt đầu
                let numberStart = (this.pageNumber - 1) * this.pageSize + 1;
                //numberEnd giá trị kết thúc
                let numberEnd = this.pageNumber * this.pageSize;
                //Xét trường hợp vượt quá giá trị tối đa
                if (numberEnd > this.totalRecord) {
                    numberEnd = this.totalRecord;
                    // numberStart = this.totalRecord - this.pageSize;
                    // if (numberStart < 0) {
                    //     numberStart = 0;
                    // }
                }
                return numberStart + '-' + numberEnd + '/' + this.totalRecord;
            },

            /**
             * Method update lại giá trị page size
             * @author: NMTuan (20/07/2021)
             */
            updatePageSize($event) {
                this.$emit('updatePageSize', $event);
            },

            /**
             * Lùi 1 trang trước đó
             * @author: NMTuan (20/07/2021)
             */
            prevPage() {
                if (this.pageNumber == 1) return;
                this.switchPage(this.pageNumber - 1);
            },

            /**
             * Tiến 1 trang
             * @author: NMTuan (20/07/2021)
             */
            nextPage() {
                if (this.pageNumber == this.totalPage) return;
                this.switchPage(this.pageNumber + 1 );
            },

            /**
             * Đến trang cuối cùng
             * @author: NMTuan (20/07/2021)
             */
            lastPage() {
                this.switchPage(this.totalPage);
            },

            /**
             * Về trang đầu tiên
             * @author: NMTuan (20/07/2021)
             */
            firstPage() {
                this.switchPage(1);
            }

        }
    }
</script>

<style scoped>
@import '../../css/layout/pagination.css';
@import '../../css/base/dropdown.css';
</style>