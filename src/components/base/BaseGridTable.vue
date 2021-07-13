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
            </tbody>
        </table>
    </div>
</template>

<script>
    import axios from 'axios'
    import {formatCell, formatData} from '../../js/common/format'
    import { getDataById } from '../../js/common/crud'

    var $ = require('jquery')
    export default {
        name: 'BaseGridTable',
        props: ['columns'],
        data() {
            return {
                rows: []
            }
        },
        created() {     
            axios.get(`http://cukcuk.manhnv.net/v1/Employees`)
            .then((response) => {
                this.rows = response.data;
                // console.log(response.data);
                // console.log(response.status);
                // console.log(response.statusText);
                // console.log(response.headers);
                // console.log(response.config);
                
                this.bindData(response.data)
                this.initEvents()
            });
        },
        methods: {
            /**
             * Hàm bind data vào table
             * @author: NMTuan (08/07/2021)
             * @param {json} response 
             */
            bindData(response) {
                $(".grid table tbody").empty()
                response.map((item, index) => {

                    let tr = $('<tr></tr>')
                    let employeeId = item.EmployeeId
                    tr = $(tr).attr('employeeId', employeeId)
                    let theads = $('.grid table tr th')
                    $(theads).each((i, thead) => {
                        let td = $(`<td></td>`)
                        let fieldName = $(thead).attr('fieldName');
                        let value = item[fieldName]
                        value = formatData(value, fieldName)
                        td = formatCell(td, fieldName, index)
                        td.append(value)
                        tr.append(td)
                    })

                    $(".grid table tbody").append(tr)
                })
            },

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
                    me.showModal()
                    let employeeId = $(this).attr('employeeId')
                    getDataById(employeeId)
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
            },

            showModal() {
                $('.modal').show()
                $('.modal .info-form input').first().focus()
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/grid.css';
</style>