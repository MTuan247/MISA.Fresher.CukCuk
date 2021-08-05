<template>
    <div class="modal">
        <div class="info-form">
            <div class="div-icon close" @click="this.closeForm" style="background-image: url(./assets/icon/x.svg);"></div>
            <div class="form__header">
                <h1 class="text-title">Thông tin nhân viên</h1>
            </div>
            <div action="" class="form__body">
                <div class="avatar">
                    <div class="avatar-image" style="background-image: url('./assets/img/default-avatar.jpg');"></div>
                    <div class="avatar-announce">Vui lòng chọn ảnh có định dạng jpg, png,...</div>
                </div>
                <div class="form__content">
                    <div class="area">
                        <div class="content__header">A.Thông tin chung</div>
                        <div class="form__input">

                            <div fieldName="EmployeeCode" class="field-label form__field-input">
                                <BaseInput 
                                    ref="EmployeeCode"
                                    inputLabel="Mã nhân viên"
                                    inputClass="field__input"
                                    :tooltip="true"
                                    :required="true"
                                    :inputMaxlength="20"
                                    :modelValue="this.data['EmployeeCode'] | formatNull"
                                    @update="setData($event,'EmployeeCode')"
                                    @setValid="setValid($event,'employeeCodeValid')"
                                />
                            </div>

                            <div fieldName="FullName" class="field-label form__field-input">
                                <BaseInput
                                    ref="FullName"
                                    inputLabel="Họ và tên"
                                    inputClass="field__input"
                                    :tooltip="true"
                                    :required="true"
                                    :modelValue="this.data['FullName'] | formatNull"
                                    @update="setData($event,'FullName')"
                                    @setValid="setValid($event,'fullNameValid')"
                                />
                            </div>

                            <div fieldName="DateOfBirth" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    ref="DateOfBirth"
                                    inputLabel="Ngày sinh"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['DateOfBirth'] | formatDate | formatNull"
                                    @update="setData($event,'DateOfBirth')"
                                    @setValid="setValid($event,'dateOfBirthValid')"
                                />
                            </div>

                            <div fieldName="GenderName" class="field-label form__field-input">
                                <div class="label">Giới tính</div>
                                <BaseCombobox 
                                    ref="GenderName"
                                    v-model="data['GenderName']"
                                    fieldName="GenderName"
                                    :extraData="[{ title: 'Nam', val: 1 }, { title: 'Nữ', val: 0 }, { title: 'Không xác định', val: 2 }]"
                                    @updateValue="data['Gender'] = $event"
                                />
                            </div>

                            <div fieldName="IdentityNumber" class="field-label form__field-input">
                                <BaseInput
                                    ref="IdentityNumber"
                                    inputLabel="Số CMTND/ Căn cước"
                                    inputClass="field__input"
                                    inputType="number"
                                    :required="true"
                                    :tooltip="true"
                                    :modelValue="this.data['IdentityNumber'] | formatNull"
                                    @update="setData($event,'IdentityNumber')"
                                    @setValid="setValid($event,'identityNumberValid')" 
                                />

                            </div>

                            <div fieldName="IdentityDate" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    ref="IdentityDate"
                                    inputLabel="Ngày cấp"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['IdentityDate'] | formatDate | formatNull"
                                    @update="setData($event,'IdentityDate')"
                                />
                            </div>

                            <div fieldName="IdentityPlace" class="field-label form__field-input">
                                <BaseInput 
                                    ref="IdentityPlace"
                                    inputLabel="Nơi cấp"
                                    inputClass="field__input"
                                    :modelValue="this.data['IdentityPlace'] | formatNull"
                                    @update="setData($event,'IdentityPlace')" 
                                />
                            </div>

                        </div>
                        <div class="form__input">
                            <div fieldName="Email" class="field-label form__field-input">
                                <BaseInput 
                                    ref="Email"
                                    inputLabel="Email"
                                    inputClass="field__input"
                                    inputType="email"
                                    :tooltip="true"
                                    :required="true"
                                    :modelValue="this.data['Email'] | formatNull"
                                    @update="setData($event,'Email')"
                                    @setValid="setValid($event,'emailValid')" 
                                />
                            </div>
                            <div fieldName="PhoneNumber" class="field-label form__field-input">
                                <BaseInput 
                                    ref="PhoneNumber"
                                    inputLabel="Số điện thoại"
                                    inputClass="field__input"
                                    pattern="^[0-9\-\+]{9,15}$"
                                    inputType="tel"
                                    :required="true"
                                    :tooltip="true"
                                    :modelValue="this.data['PhoneNumber'] | formatNull"
                                    @update="setData($event,'PhoneNumber')"
                                    @setValid="setValid($event,'phoneNumberValid')" 
                                />
                            </div>
                        </div>
                    </div>
                    <div class="area">
                        <div class="content__header">B.Thông tin công việc</div>
                        <div class="form__input">
                            <div fieldName="PositionName" class="field-label form__field-input">
                                <div class="label">Vị trí</div>
                                <BaseCombobox
                                    ref="PositionName"
                                    dataType="Position"
                                    api="http://cukcuk.manhnv.net/v1/Positions"
                                    fieldName="PositionName"
                                    fieldId="PositionId"
                                    v-model="data['PositionName']"
                                    @updateValue="data['PositionId'] = $event"
                                />
                            </div>

                            <div fieldName="DepartmentName" class="field-label form__field-input">
                                <div class="label">Phòng ban</div>
                                <BaseCombobox
                                    ref="DepartmentName"
                                    dataType="Department"
                                    api="http://cukcuk.manhnv.net/api/Department"
                                    id="department-combobox"
                                    fieldName="DepartmentName"
                                    fieldId="DepartmentId"
                                    v-model="data['DepartmentName']"
                                    @updateValue="data['DepartmentId'] = $event"
                                />
                            </div>

                            <div fieldName="PersonalTaxCode" class="field-label form__field-input">
                                <BaseInput 
                                    ref="PersonalTaxCode"
                                    inputLabel="Mã số thuế cá nhân"
                                    inputClass="field__input"
                                    inputType="number"
                                    :modelValue="this.data['PersonalTaxCode'] | formatNull"
                                    @update="setData($event,'PersonalTaxCode')" 
                                />
                            </div>

                            <div fieldName="Salary" fieldType="Money" class="field-label form__field-input">
                                <BaseInput 
                                    ref="Salary"
                                    inputLabel="Mức lương cơ bản"
                                    inputClass="field__input"
                                    inputType="text"
                                    inputId="salary"
                                    :inputMaxlength="20"
                                    :modelValue="this.data['Salary'] | formatMoney"
                                    @update="setData($event,'Salary')" 
                                />
                            </div>

                            <div fieldName="JoinDate" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    ref="JoinDate"
                                    inputLabel="Ngày gia nhập công ty"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['JoinDate'] | formatDate | formatNull"
                                    @update="setData($event,'JoinDate')" 
                                />
                            </div>

                            <div fieldName="WorkStatus" class="field-label form__field-input">
                                <BaseInput 
                                    ref="WorkStatus"
                                    inputLabel="Tình trạng công việc"
                                    inputClass="field__input"
                                    inputType="text"
                                    :modelValue="this.data['WorkStatus'] | formatWorkStatus | formatNull"
                                    @update="setData($event,'WorkStatus')" 
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="form__footer">
                <BaseButton 
                    id="cancel"
                    btnClass="btn-seconds"
                    title="Hủy"
                    :clickEvent="this.closeForm"
                />
                <BaseButton 
                    id="submit"
                    btnClass="btn-icon"
                    title="Lưu"
                    :clickEvent="this.submitForm"
                />
            </div>
        </div>
    </div>
</template>

<script>

    import BaseCombobox from '../../base/BaseCombobox.vue'
    import { formatDateInput, formatMoney, formatNull, formatWorkStatus } from '../../../js/common/format'
    import BaseButton from '../../base/BaseButton.vue'
    import BaseInput from '../../base/BaseInput.vue'

    // import {showWarningPopup} from '../../js/base/popup'
    import { addData, getDataById, getNewCode, loadData, updateData } from '../../../js/common/crud'
    import Vue from 'vue'
    export default {
        name: 'BaseForm',
        props: ['entityId'],
        data() {
            return {

                /**
                 * List các ref input trong form
                 */
                refs: [
                    'EmployeeCode', 
                    'FullName',
                    'DateOfBirth',
                    'GenderName',
                    'IdentityNumber',
                    'IdentityDate',
                    'IdentityPlace',
                    'Email',
                    'PhoneNumber',
                    'PositionName',
                    'DepartmentName',
                    'PersonalTaxCode',
                    'Salary',
                    'JoinDate',
                    'WorkStatus', 
                ],

                departments: [],

                positions: [],

                data: {},
                valids: [],

                isValid: true,
            }
        },

        //#region Filters
        filters: {
            /**
             * Filter các giá trị null
             * @author: NMTuan (20/07/2021)
             */
            formatNull: function(value) {
                return formatNull(value)
            },

            /**
             * Filter các giá trị date
             * @author: NMTuan (20/07/2021)
             */
            formatDate: function(value) {
                return formatDateInput(value);
            },

            /**
             * Filter các giá trị tiền tệ
             * @author: NMTuan (20/07/2021)
             */
            formatMoney: function (value) {
                return formatMoney(value)
            },

            /**
             * Filter chuyển workstatus sang text
             * @author: NMTuan (20/07/2021)
             */
            formatWorkStatus: function (value) {
                return formatWorkStatus(value)
            },

        },
        //#endregion

        components: {
            BaseCombobox, BaseButton,
                BaseInput
        },

        /**
         * Hàm xử lý khi khởi tạo lấy dữ liệu từ api
         * @author: NMTuan (20/07/2021)
         */
        async created() {

            loadData('http://cukcuk.manhnv.net/v1/Positions', (response) => {
                this.positions = response.data
            })

            loadData('http://cukcuk.manhnv.net/api/Department', (response) => {
                this.departments = response.data
            })

            if (this.entityId) {
                getDataById(this.entityId, (response) => {
                    this.setForm(response)
                })
            } else {
                let emCode = await getNewCode()
                Vue.set(this.data,'EmployeeCode', emCode)
            }
        },

        /**
         * Hàm xử khi khởi tạo xong, autofocus vào trường employeeCode
         * @author: NMTuan (20/07/2021)
         */
        mounted: function() {
            this.$refs.EmployeeCode.$refs.Input.focus()
        },
            
        watch: {
        },

        methods: {

            /**
             * Hàm ẩn form
             * @author: NMTuan(20/07/2021)
             */
            hideForm() {
                this.$emit('closeModal')
            },

            /**
             * Hàm đóng form
             * @author: NMTuan (21/07/2021)
             */
            closeForm() {
                let popup = {
                    type: 'warning',
                    title : "Đóng hộp thoại",
                    message : 'Bạn có muốn đóng hộp thoại nhập "Thông tin nhân viên không" hay không?',
                    isShow: true,
                    confirm: 'Đóng',
                    callback: () => {
                        this.hideForm()
                    }
                }
                this.$parent.popup = popup
            },

            /**
             * Hàm reset lại form
             * @author: NMTuan (20/07/2021)
             */
            resetFrom() {
                this.data.forEach(field => {
                    this.data[field] = ''
                })
            },

            /**
             * Hàm xét các giá trị của form
             * @author: NMTuan (20/07/2021)
             */
            setForm(response) {
                for (let field in response) {
                    let val = response[field]
                    if(val == null) val = ''
                    Vue.set(this.data, field, val)
                }
                this.convertData()
            },

            /**
             * Submit form
             * @author: NMTuan (20/07/2021)
             */
            submitForm() {
                this.isValid = true
                this.refs.forEach(item => {
                    this.$refs[item].inputFocusoutEvent()
                })
                
                for (let i in this.valids) {
                    this.isValid = this.isValid && this.valids[i]
                }

                if (this.isValid) {
                    this.standardizedData(this.data)
                    console.log(this.data)
                    if(this.entityId) {
                        updateData(this.data, this.entityId, () => this.$parent.$refs.EmployeeContent.restore() )
                    } else {
                        addData(this.data, () => this.$parent.$refs.EmployeeContent.restore())
                    }
                    this.hideForm()
                }
                
            },

            /**
             * Gán các giá trị từ các trường tương ứng
             * @author: NMTuan (20/07/2021)
             */
            setData($event, fieldName) {
                Vue.set(this.data, fieldName, $event)
            },

            /**
             * Lấy giá trị hợp lệ từ các trường
             * @author: NMTuan (20/07/2021)
             */
            setValid(valid, fieldName) {
                this.valids[fieldName] = valid
            },

            /**
             * Hàm chuẩn hóa các giá trị từ form trước khi gửi
             * @author: NMTuan (20/07/2021)
             */
            standardizedData(data) {
                data['Salary'] = data['Salary'].toString().replaceAll(',','').replaceAll('.','')
                data['Salary'] = parseInt(data['Salary'])

            },

            /**
             * Hàm chuyển các giá trị id sang text
             * @author: NMTuan (20/07/2021)
             */
            convertData() {
                let department = this.departments.find(item => item.DepartmentId == this.data.DepartmentId)
                if (department) this.data['DepartmentName'] = department.DepartmentName
                let position = this.positions.find(item => item.PositionId == this.data.PositionId)
                if (position) this.data['PositionName'] = position.PositionName
            }

        }
    }
</script>

<style scoped>
@import '../../../css/base/form.css';
</style>