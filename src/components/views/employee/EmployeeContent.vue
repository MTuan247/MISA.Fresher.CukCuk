<template>
    <div class="content" :class="{'content--collapsed' : isContentCollapse}">
        <!-- <ClipLoader :loading="isLoading" size="60px" /> -->
        <BaseSpinner :isLoading="isLoading" />
        <div class="content-header">
            <div class="content-title text-title">Danh sách nhân viên</div>
            <BaseButton
                id="add-employee"
                btnClass="content-title-btn btn-icon"
                icon="'./assets/icon/add.png'"
                title="Thêm nhân viên"
                :isDisabled="isLoading"
                :clickEvent="openModal"
            />
        </div>
        <div class="filter-bar">
            <div class="filter-area">

                <div class="search-field field">
                    <div class="div-icon input-icon search-icon">
                    </div>
                    <input 
                        @keydown.enter.exact="refresh"
                        :disabled="isLoading"
                        ref="search" 
                        v-model="search" 
                        type="search" 
                        name="" 
                        id="" 
                        placeholder="Tìm kiếm"
                    >
                    <i class="fa fa-times icon-right" aria-hidden="true"></i>
                </div>

                <BaseCombobox
                    dataType="Department"
                    id="department-combobox"
                    comboboxClass="filter"
                    fieldName="DepartmentName"
                    fieldId="DepartmentId"
                    placeholder="Tất cả phòng ban"
                    v-model="departmentText"
                    :api="departmentApi"
                    :defaultSelect="0"
                    :extraData='[{title: "Tất cả phòng ban", val: ""}]'
                    :isDisabled="isLoading"
                    @updateValue='departmentId=$event'
                />

                <BaseCombobox
                    dataType="Position"
                    id="position-combobox"
                    comboboxClass="filter"
                    fieldName="PositionName"
                    fieldId="PositionId"
                    placeholder="Tất cả vị trí"
                    v-model="positionText"
                    :api="positionApi"
                    :defaultSelect="0"
                    :isDisabled="isLoading"
                    :extraData="[{title:'Tất cả vị trí', val: ''}]"
                    @updateValue='positionId=$event'
                />
                <!-- <BaseVCombobox 
                    fieldName="PositionName"
                    fieldValue="PositionId"
                    :api="positionApi"
                    :extraData="[{text:'Tất cả vị trí', value: ''}]"
                    v-model="position"
                /> -->
                
            </div>
            <div class="btn-action-area">
                <BaseButton
                    i="far fa-trash-alt"
                    btnClass="delete btn-seconds btn-action"
                    :isDisabled="isLoading"
                    :clickEvent="this.delete"
                />
                <BaseButton 
                    btnClass="refresh btn-seconds btn-action"
                    background="'./assets/icon/refresh.png'"
                    :isDisabled="isLoading"
                    :clickEvent="this.refresh"
                />
            </div>
        </div>
        <BaseGridTable 
            :columns="this.columns"
            :rows="this.rows"
            :selectedRows="selectedRows"
            @openModal='openModal'
            @updateSelectedRows='updateSelectedRows'
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

    import EmployeeApi from '../../../js/api/employee/EmployeeApi'

    // import BaseVCombobox from '../../base/BaseVCombobox.vue'
    import BaseSpinner from '../../base/BaseSpinner.vue'

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
                        fieldName: 'WorkStatusName',
                        style: 'width: 160px;',
                    }
                ],
                rows: [],
                selectedRows: [],
                departmentId: '',
                departmentText: 'Tất cả phòng ban',
                departmentApi: EmployeeApi.departmentApi,
                positionId: '',
                positionText: 'Tất cả vị trí',
                positionApi: EmployeeApi.positionApi,
                pageNumber: 1,
                pageSize: 10,
                totalPage: null,
                totalRecord: null,
                search: '',
                isLoading: true,
                position: {
                    text: 'Tất cả vị trí',
                    value: ''
                }
            }
        },
        components: {
            BaseButton, BaseCombobox, BaseGridTable, ThePagination, BaseSpinner
        },
        created() {
            /**
             * Lấy data khi khởi tạo
             * @author: NMTuan (22/07/2021)
             */
            this.loadData()

            this.$eventBus.$on('loadData', this.loadData)
            this.$eventBus.$on('refresh', this.refresh)

        },

        mounted: function(){
        },

        methods: {

            /**
             * Hàm refresh đưa trang về các giá trị mặc định
             * @author: NMTuan (20/07/2021)
             */
            refresh() {
                this.pageNumber = 1
                this.loadData()
            },

            /**
             * Hàm lấy dữ liệu
             * @author: NMTuan (22/7/2021)
             */
            loadData() {
                this.rows= [];
                this.isLoading = true;
                EmployeeApi.getDataFiltered(this.pageSize, this.pageNumber - 1, this.search, this.departmentId, this.positionId, (response) => {
                    this.totalPage = response.data.TotalPage
                    this.totalRecord = response.data.TotalRecord
                    this.rows = response.data.Data
                    this.isLoading = false;
                    if(!this.rows) {
                        this.rows = [];
                    }
                }, () => {
                    this.isLoading = false;
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
                if (this.selectedRows.length != 0) {
                    popup.type = 'alarm'
                    popup.title = `Xóa ${this.selectedRows.length} bản ghi`
                    popup.message = `Bạn có chắc muốn xóa ${this.selectedRows.length} bản ghi hay không?`
                    popup.confirm = 'Xóa'
                    popup.callback = () => {
                        EmployeeApi.deleteMultiple(this.selectedRows, () => {
                            this.selectedRows = [];
                            this.loadData()
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
                this.$eventBus.$emit('openModal', id)
            },

            /**
             * update các row được chọn
             * @author: NMTuan (20/07/2021)
             */
            updateSelectedRows(id) {
                if (!this.selectedRows.includes(id)){
                    this.selectedRows.push(id)
                } else {
                    let index = this.selectedRows.indexOf(id)
                    if ( index > -1 ) {
                        this.selectedRows.splice(index, 1)
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
                this.loadData()
            },

            /**
             * Chuyển trang
             * @author: NMTuan (20/07/2021)
             */
            switchPage(number) {
                this.pageNumber = number
                this.loadData()
            },

        }
    }
</script>

<style scoped>

@import '../../../css/layout/content.css';
@import '../../../css/base/toast.css';
@import '../../../css/base/spinner.css';

</style>