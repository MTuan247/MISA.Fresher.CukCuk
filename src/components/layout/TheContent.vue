<template>
    <div class="content">
        <div class="content-header">
            <div class="content-title text-title">Danh sách nhân viên</div>
            <BaseButton
                id="add-employee"
                btnClass="content-title-btn btn-icon"
                icon="'./assets/icon/add.png'"
                title="Thêm nhân viên"
                :clickEvent="this.showModal"
            />
        </div>
        <div class="filter-bar">
            <div class="filter-area">

                <div class="search-field field">
                    <div class="div-icon input-icon search-icon">
                    </div>
                    <input type="search" name="" id="" placeholder="Tìm kiếm">
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
                    :extraData='[{title: "Tất cả phòng ban"}]'
                />

                <BaseCombobox
                    dataType="Position"
                    api="http://cukcuk.manhnv.net/v1/Positions"
                    id="position-combobox"
                    comboboxClass="filter"
                    fieldName="PositionName"
                    fieldID="PositionId"
                    placeholder="Tất cả vị trí"
                    :extraData="[{title:'Tất cả vị trí'}]"
                />
                

            </div>
            <div class="btn-action-area">
                <div class="refresh btn-seconds btn-action" >
                </div>
                <div class="delete btn-seconds btn-action">
                    <i class="far fa-trash-alt"></i>
                </div>
            </div>
        </div>
        <BaseGridTable 
            :columns="this.columns"
        />
        <ThePagination />
    </div>
</template>

<script>
    import BaseButton from '../base/BaseButton.vue';
    import BaseCombobox from '../base/BaseCombobox.vue';
    import BaseGridTable from '../base/BaseGridTable.vue' 
    import ThePagination from './ThePagination.vue'
    var $ = require('jquery')

    export default {
        name: "TheContent",
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
                        style: 'width: 150px;',
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
            }
        },
        components: {
            BaseButton, BaseCombobox, BaseGridTable, ThePagination
        },
        methods: {
            showModal() {
                $('.modal').show()
                $('.modal .info-form input').first().focus()
            }
        }
    }
</script>

<style scoped>

@import '../../css/layout/content.css';
@import '../../css/base/input.css';
@import '../../css/base/button.css';

</style>