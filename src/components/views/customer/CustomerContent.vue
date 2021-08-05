<template>
    <div class="content" :class="{'content--collapse' : isContentCollapse}">
        <div class="content-header">
            <div class="content-title text-title">Danh sách nhân viên</div>
            <BaseButton
                id="add-employee"
                btnClass="content-title-btn btn-icon"
                icon="'./assets/icon/add.png'"
                title="Thêm nhân viên"
                :clickEvent="openModal"
            />
        </div>
        <div class="filter-bar">
            <div class="filter-area">

                <div class="search-field field">
                    <div class="div-icon input-icon search-icon">
                    </div>
                    <input v-model="search" type="search" name="" id="" placeholder="Tìm kiếm">
                    <i class="fa fa-times icon-right" aria-hidden="true"></i>
                </div>

                <BaseCombobox
                    dataType="Department"
                    api="http://cukcuk.manhnv.net/api/Department"
                    id="department-combobox"
                    comboboxClass="filter"
                    fieldName="DepartmentName"
                    fieldId="DepartmentId"
                    placeholder="Tất cả phòng ban"
                    :extraData='[{title: "Tất cả phòng ban", val: ""}]'
                    @updateValue='departmentId=$event'
                />

                <BaseCombobox
                    dataType="Position"
                    api="http://cukcuk.manhnv.net/v1/Positions"
                    id="position-combobox"
                    comboboxClass="filter"
                    fieldName="PositionName"
                    fieldId="PositionId"
                    placeholder="Tất cả vị trí"
                    :extraData="[{title:'Tất cả vị trí', val: ''}]"
                    @updateValue='positionId=$event'
                />

                <!-- <v-combobox
                    solo
                    :height=40
                    :items="[
                        {
                            text: 'Tất cả vị trí',
                            value: 'bbb'
                        },
                        {
                            text: 'Phòng đào tạo',
                            value: '1'
                        }
                    ]"
                ></v-combobox> -->
                <!-- <v-date-picker v-model="date"></v-date-picker>
                <input v-model="date" type="text"> -->
                
            </div>
            <div class="btn-action-area">
                <BaseButton 
                    btnClass="refresh btn-seconds btn-action"
                    background="'./assets/icon/refresh.png'"
                    :clickEvent="this.restore"
                />
                <BaseButton
                    i="far fa-trash-alt"
                    btnClass="delete btn-seconds btn-action"
                    :clickEvent="this.delete"
                />
            </div>
        </div>
        <BaseGridTable 
            :columns="this.columns"
            :rows="this.rows"
            @openModal='openModal'
            @updateSelectRows='updateSelectRows'
        />
        <ThePagination 
            :pageNumber="this.pageNumber"
            :pageSize="this.pageSize"
            :totalPage="this.totalPage"
            :totalRecord="this.totalRecord"
            @switchPage="switchPage($event)"
            @updatePageSize="updatePageSize"
        />
    </div>
</template>

<script>
    import BaseButton from '../../base/BaseButton.vue';
    import BaseCombobox from '../../base/BaseCombobox.vue';
    import BaseGridTable from '../../base/BaseGridTable.vue' 
    import ThePagination from '../../layout/ThePagination.vue'

    import {deleteMultiple, getDataFilterd} from '../../../js/common/crud'

    import { showAlarmPopup, showPopup } from '../../../js/base/popup';

    export default {
        name: "TheContent",
        props: {
            isContentCollapse: {
                default: false
            }
        },
        data() {
            return {
                columns: [
                    {
                        title: '',
                        fieldName: 'Checkbox',
                        style: 'width: 50px;',
                    },
                    {
                        title: '#',
                        fieldName: 'Index',
                        style: 'width: 50px;',
                    },
                    {
                        title: 'Mã nhân viên',
                        fieldName: 'EmployeeCode',
                        style: 'width: 120px;',
                    },
                    {
                        title: 'Họ tên',
                        fieldName: 'FullName',
                        style: 'width: 200px;',
                    },
                    {
                        title: 'Giới tính',
                        fieldName: 'GenderName',
                        style: 'width: 100px;',
                    },
                    {
                        title: 'Ngày sinh',
                        fieldName: 'DateOfBirth',
                        style: 'width: 150px; text-align: center',
                    },
                    {
                        title: 'Điện thoại',
                        fieldName: 'PhoneNumber',
                        style: 'width: 150px;',
                    },
                    {
                        title: 'Email',
                        fieldName: 'Email',
                        style: 'width: 200px;',
                    },
                    {
                        title: 'Mức lương cơ bản',
                        fieldName: 'Salary',
                        style: 'width: 180px; text-align: right; padding-right: 20px;',
                    },
                    {
                        title: 'Vị trí/Chức vụ',
                        fieldName: 'PositionName',
                        style: 'width: 180px;',
                    },
                    {
                        title: 'Bộ phận/Phòng ban',
                        fieldName: 'DepartmentName',
                        style: 'width: 180px;',
                    },
                    {
                        title: 'Tình trạng công việc',
                        fieldName: 'WorkStatus',
                        style: 'width: 200px;',
                    }
                ],
                rows: [],
                selectRows: [],
                departmentId: '',
                positionId: '',
                pageNumber: 1,
                pageSize: 10,
                totalPage: null,
                totalRecord: null,
                search: '',
            }
        },
        components: {
            BaseButton, BaseCombobox, BaseGridTable, ThePagination
        },
        created() {
            /**
             * Lấy data khi khởi tạo
             * @author: NMTuan (22/07/2021)
             */
            this.loadData()
        },

        mounted: function(){
        },

        methods: {
            
            /**
             * Hàm refresh lại trang
             * @author: NMTuan (20/07/2021)
             */
            refresh() {
                this.loadData()
            },

            /**
             * Hàm restore đưa trang về các giá trị mặc định
             * @author: NMTuan (20/07/2021)
             */
            restore() {
                this.pageNumber = 1
                this.pageSize = 10
                this.loadData()
            },

            /**
             * Hàm lấy dữ liệu
             * @author: NMTuan (22/7/2021)
             */
            loadData() {
                getDataFilterd(this.pageSize, this.pageNumber, this.search, this.departmentId, this.positionId, (response) => {
                    this.totalPage = response.data.TotalPage
                    this.totalRecord = response.data.TotalRecord
                    this.rows = response.data.Data
                })
            },

            /**
             * Hàm xóa các giá trị đã chọn
             * Hàm cũ không còn sử dụng
             * @author: NMTuan (20/07/2021)
             */
            deleteOld() {
                if (this.selectRows.length == 0) {
                    showPopup('warning', 'Xóa bản ghi', 'Bạn chưa chọn bản ghi cần xóa!', function(){}, 'Đóng')
                } else showAlarmPopup(() => {
                    deleteMultiple(this.selectRows, () => {
                        this.refresh()
                    })
                })
            },

            /**
             * Hàm xóa các giá trị đã chọn
             * @author: NMTuan (21/07/2021)
             */
            delete() {
                let popup = {
                    type: 'warning',
                    title : "Xóa bản ghi",
                    message : 'Bạn chưa chọn bản ghi cần xóa!',
                    isShow: true,
                    confirm: 'Đóng'
                }
                if (this.selectRows.length != 0) {
                    popup.type = 'alarm'
                    popup.title = `Xóa ${this.selectRows.length} bản ghi`
                    popup.message = `Bạn có chắc muốn xóa ${this.selectRows.length} bản ghi hay không?`
                    popup.confirm = 'Xóa'
                    popup.callback = () => {
                        deleteMultiple(this.selectRows, () => {
                            this.refresh()
                        })
                    }
                }
                this.$parent.popup = popup
            },

            /**
             * Gọi Hàm mở form ở component cha
             * @author: NMTuan (20/07/2021)
             */
            openModal(id) {
                this.$emit('openModal', id)
            },

            /**
             * update các row được chọn
             * @author: NMTuan (20/07/2021)
             */
            updateSelectRows(id) {
                if (!this.selectRows.includes(id)){
                    this.selectRows.push(id)
                } else {
                    let index = this.selectRows.indexOf(id)
                    if ( index > -1 ) {
                        this.selectRows.splice(index, 1)
                    }
                }
            },

            /**
             * update giá trị pageSize
             * @author: NMTuan (20/07/2021)
             */
            updatePageSize(pageSize) {
                this.pageSize = pageSize
                this.pageNumber = 1
                this.refresh()
            },

            /**
             * Chuyển trang
             * @author: NMTuan (20/07/2021)
             */
            switchPage(number) {
                this.pageNumber = number
                this.refresh()
            }

        }
    }
</script>

<style scoped>

@import '../../../css/layout/content.css';
@import '../../../css/base/toast.css';

</style>