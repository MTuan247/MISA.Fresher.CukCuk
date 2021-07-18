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
                <tr :employeeId="row.EmployeeId" v-for="(row, index) in rows" :key="row.EmployeeId">
                    <td class="check-box">
                        <div class="custom-checkbox">
                            <i class="fa fa-check" aria-hidden="true"></i>
                        </div>
                        <input type="checkbox" name="" id="">
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
    import { formatData} from '../../js/common/format'
    // import { getDataById } from '../../js/common/crud'

    var $ = require('jquery')
    export default {
        name: 'BaseGridTable',
        props: ['columns', 'rows'],
        
        filters: {
            formatData: function(value, fieldName) {
                return formatData(value, fieldName)
            }
        },

        mounted() {
            this.initEvents()
        },
        methods: {
            
            /**
             * Hàm xử lý các sự kiện
             * Author: NMTuan (13/07/2021)
             */
            initEvents() {
                let me = this
                $("table").on('change', '.check-box input', function () {
                    me.checkBox(this)
                })

                $("table").on('dblclick', 'tbody tr', function () {
                    // me.showModal()
                    let employeeId = $(this).attr('employeeId')
                    // $('.modal .info-form').attr('employeeId', employeeId)
                    // getDataById(employeeId)
                    me.openModal(employeeId)
                })
            },

            /** 
             * Hàm xử lý click checkbox
             * Author: NMTuan (05/07/2021)
             * @param {element} el 
             */
            checkBox(el) {
                $(el).parent().parent().toggleClass('selected')
                $(el).prev().toggleClass('custom-checkbox--selected')
                this.$emit('updateSelectRows',$(el).parent().parent().attr('employeeId'))
            },

            // showModal() {
            //     $('.modal').show()
            //     $('.modal .info-form input').first().focus()
            // },

            /**
             * Hàm mở form
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