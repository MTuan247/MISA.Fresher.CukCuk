<template>
    <div class="grid">
        <table cellspacing=0>
            <thead>
                <tr>
                    <!-- <th fieldName="Checkbox" style="width: 50px;"></th>
                    <th fieldName="Index" style="width: 50px;">#</th>
                    <th fieldName="EmployeeCode" style="width: 120px;">Mã nhân viên</th>
                    <th fieldName="FullName" style="width: 200px;">Họ tên</th>
                    <th fieldName="GenderName" style="width: 100px;">Giới tính</th>
                    <th fieldName="DateOfBirth" style="width: 150px; text-align: center;">Ngày sinh</th>
                    <th fieldName="PhoneNumber" style="width: 150px;">Điện thoại</th>
                    <th fieldName="Email" style="width: 200px;">Email</th>
                    <th fieldName="Salary" style="width: 180px; text-align: right; padding-right: 20px;">Mức lương cơ bản</th>
                    <th fieldName="PositionName" style="width: 150px;">Vị trí/Chức vụ</th>
                    <th fieldName="DepartmentName" style="width: 180px;">Bộ phận/Phòng ban</th>
                    <th fieldName="WorkStatus" style="width: 200px;">Tình trạng công việc</th> -->
                    <th v-for="col in columns" :fieldName="col.fieldName" :key="col.fieldName" :style="col.style" >
                        {{col.title}}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    @dblclick="dbclickRow(row.EmployeeId)" 
                    @click.ctrl="ctrlClickRow(index)" 
                    @click.right.exact.prevent="rightClickRow($event, row.EmployeeId, index)"
                    :employeeId="row.EmployeeId" 
                    :class="{'selected' : row['isSelected']}" 
                    :key="row.EmployeeId"
                    v-for="(row, index) in records" 
                >
                    <td class="check-box">
                        <div class="custom-checkbox" :class="{'custom-checkbox--selected' : row['isSelected']}">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <input type="checkbox" @change="checkBox(index)" name="" id="">
                    </td>
                    <td>{{index + 1}}</td>
                    <td :style="col.style" v-for="col in columns.slice(2)" :key="col.fieldName" :title="row[col.fieldName] | formatData(col.fieldName)">
                        {{ row[col.fieldName] | formatData(col.fieldName) }}
                    </td>
                </tr>
            </tbody>
        </table>
        <BaseContextMenu 
            :contextMenuX="contextMenuX" 
            :contextMenuY="contextMenuY" 
            :contextMenuItems="[
                {title: 'Chọn', action: checkBox, payload: contextMenuIndex},
                {title: 'Sửa', action: openModal, payload: contextMenuId},
                {title: 'Xóa', action: deleteRow, payload: contextMenuId},
            ]"
        />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { formatData} from '../../js/common/format'
    import BaseContextMenu from './BaseContextMenu.vue'
    import EmployeeApi from '../../js/api/employee/EmployeeApi'

    export default {
        name: 'BaseGridTable',
        props: ['columns', 'rows', 'selectedRows'],

        data() {
            return{
                records : [],
                contextMenuX : null,
                contextMenuY : null,
                contextMenuId: null,
                contextMenuIndex: null,
                isContextMenu : true,
                isLoading: true

            }
        },

        components: {
            BaseContextMenu
        },

        watch: {
            rows: function() {
                this.records = [...this.rows]
                this.records.forEach(record => {
                    let isSelected = false;
                    if (this.selectedRows.includes(record.EmployeeId)) isSelected = true;
                    record['isSelected'] = isSelected;
                })
            }
        },
        
        filters: {
            formatData: function(value, fieldName) {
                return formatData(value, fieldName)
            }
        },

        created() {
        },

        mounted() {
        },
        methods: {

            /** 
             * Hàm xử lý click checkbox
             * Author: NMTuan (20/07/2021)
             * @param {int} index 
             */
            checkBox(index) {
                let row = this.records[index]
                row.isSelected = !row.isSelected
                Vue.set(this.records, index, row)
                this.$emit('updateSelectedRows', row.EmployeeId)
            },

            /**
             * Hàm xử lý dblclick vào hàng
             * @author: NMTuan (20/07/2021)
             */
            dbclickRow(id) {
                this.openModal(id)
            },

            /**
             * Hàm mở form
             * @author: NMTuan (20/07/2021)
             */
            openModal(id) {
                // this.$emit('openModal', id)
                this.$eventBus.$emit('openModal', id);
            },
            
            /**
             * Hàm xử lý ctrl-click vào row
             * @author: NMTuan (09/08/2021)
             */
            ctrlClickRow(index) {
                this.checkBox(index)
            },

            /**
             * Hàm xử lý khi right click vào row
             * @author: NMTuan (11/08/2021)
             */
            rightClickRow(event, id, index) {
                this.contextMenuX = event.pageX - 220
                this.contextMenuY = event.pageY - 48
                this.contextMenuId = id
                this.contextMenuIndex = index
                this.$eventBus.$emit('showContext')
            },

            /**
             * Hàm xóa bản ghi
             * @author: NMTuan (13/08/2021)
             */
            deleteRow(id) {
                EmployeeApi.delete(id, () => {
                    this.$eventBus.$emit('loadData')
                })
            },

        }
    }
</script>

<style scoped>
@import '../../css/base/grid.css';
</style>