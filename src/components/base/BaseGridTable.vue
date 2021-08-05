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
                <!-- <tr :key="row.EmployeeCode" v-for="row in this.rows" >
                    <td v-for="col in columns" :key="col.fieldName" >{{row[col.fieldName]}}</td>
                </tr> -->
                <!-- <tr :key="record.EmployeeId" v-for="(record, index) in rows" >
                    <td class="check-box">
                        <div class="custom-checkbox">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <input type="checkbox" name="" id="">
                    </td>
                    <td>{{index + 1}}</td>
                    <td>{{record.EmployeeCode}}</td>
                    <td>{{record.FullName}}</td>
                    <td>{{record.GenderName}}</td>
                    <td class="text-align-center">{{record.DateOfBirth | formatData("DateOfBirth") }}</td>
                    <td>{{record.PhoneNumber}}</td>
                    <td>{{record.Email}}</td>
                    <td class="text-align-right">{{record.Salary | formatData("Salary")}}</td>
                    <td>{{record.PositionName }}</td>
                    <td>{{record.DepartmentName}}</td>
                    <td>{{record.WorkStatus | formatData("WorkStatus")}}</td>
                </tr> -->
                <tr @dblclick="dbclickRow(row.EmployeeId)" :employeeId="row.EmployeeId" :class="{'selected' : row['isSelected']}" v-for="(row, index) in records" :key="row.EmployeeId">
                    <td class="check-box">
                        <div class="custom-checkbox" :class="{'custom-checkbox--selected' : row['isSelected']}">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <input type="checkbox" @change="checkBox(index)" name="" id="">
                    </td>
                    <td>{{index + 1}}</td>
                    <td :style="col.style" v-for="col in columns.slice(2)" :key="col.fieldName">
                        {{ row[col.fieldName] | formatData(col.fieldName) }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { formatData} from '../../js/common/format'

    export default {
        name: 'BaseGridTable',
        props: ['columns', 'rows', 'selectedRows'],

        data() {
            return{
                records : []
            }
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
                this.$emit('openModal', id)
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/grid.css';
</style>