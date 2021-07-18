<template>
    <div class="modal">
        <div class="info-form">
            <div class="div-icon close" @click="this.hideForm" style="background-image: url(./assets/icon/x.svg);"></div>
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
                                    :modelValue="this.employeeCode | formatNull"
                                    @update="setData($event,'employeeCode')"
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
                                    :modelValue="this.fullName | formatNull"
                                    @update="setData($event,'fullName')"
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
                                    :modelValue="this.dateOfBirth | formatDate | formatNull"
                                    @update="setData($event,'dateOfBirth')"
                                    @setValid="setValid($event,'dateOfBirthValid')"
                                />
                            </div>

                            <div fieldName="GenderName" class="field-label form__field-input">
                                <div class="label">Giới tính</div>
                                <BaseCombobox 
                                    ref="GenderName"
                                    :extraData="[{ title: 'Nam' }, { title: 'Nữ' }, { title: 'Không xác định'}]"
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
                                    :modelValue="this.identityNumber | formatNull"
                                    @update="setData($event,'identityNumber')"
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
                                    :modelValue="this.identityDate | formatDate | formatNull"
                                    @update="setData($event,'identityDate')"
                                />
                            </div>

                            <div fieldName="IdentityPlace" class="field-label form__field-input">
                                <BaseInput 
                                    ref="IdentityPlace"
                                    inputLabel="Nơi cấp"
                                    inputClass="field__input"
                                    :modelValue="this.identityPlace | formatNull"
                                    @update="setData($event,'identityPlace')" 
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
                                    :modelValue="this.email | formatNull"
                                    @update="setData($event,'email')"
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
                                    :modelValue="this.phoneNumber | formatNull"
                                    @update="setData($event,'phoneNumber')"
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
                                    fieldID="PositionId"
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
                                />
                            </div>

                            <div fieldName="PersonalTaxCode" class="field-label form__field-input">
                                <BaseInput 
                                    ref="PersonalTaxCode"
                                    inputLabel="Mã số thuế cá nhân"
                                    inputClass="field__input"
                                    inputType="number"
                                    :modelValue="this.personalTaxCode | formatNull"
                                    @update="setData($event,'personalTaxCode')" 
                                />
                            </div>

                            <div fieldName="Salary" fieldType="Money" class="field-label form__field-input">
                                <BaseInput 
                                    ref="Salary"
                                    inputLabel="Mức lương cơ bản"
                                    inputClass="field__input"
                                    inputType="text"
                                    inputId="salary"
                                    :inputMaxlength="15"
                                    :modelValue="this.salary | formatMoney | formatNull"
                                    @update="setData($event,'salary')" 
                                />
                            </div>

                            <div fieldName="JoinDate" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    ref="JoinDate"
                                    inputLabel="Ngày gia nhập công ty"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.joinDate | formatDate | formatNull"
                                    @update="setData($event,'joinDate')" 
                                />
                            </div>

                            <div fieldName="WorkStatus" class="field-label form__field-input">
                                <BaseInput 
                                    ref="WorkStatus"
                                    inputLabel="Tình trạng công việc"
                                    inputClass="field__input"
                                    inputType="text"
                                    :modelValue="this.workStatus | formatWorkStatus | formatNull"
                                    @update="setData($event,'workStatus')" 
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
                    :clickEvent="this.hideForm"
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
    import { addData, getDataById, getNewCode, updateData } from '../../../js/common/crud'
    var $ = require('jquery')
    export default {
        name: 'BaseForm',
        props: ['entityId'],
        data() {
            return {
                fieldNames: [
                    'employeeCode', 
                    'fullName',
                    'dateOfBirth',
                    'genderName',
                    'identityNumber',
                    'identityDate',
                    'identityPlace',
                    'email',
                    'phoneNumber',
                    'positionName',
                    'departmentName',
                    'personalTaxCode',
                    'salary',
                    'joinDate',
                    'workStatus', 
                ],

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

                valids: [
                    'employeeCodeValid', 
                    'fullNameValid',
                    'dateOfBirthValid',
                    'genderNameValid',
                    'identityNumberValid',
                    'identityDateValid',
                    'identityPlaceValid',
                    'emailValid',
                    'phoneNumberValid',
                    'positionNameValid',
                    'departmentNameValid',
                    'personalTaxCodeValid',
                    'salaryValid',
                    'joinDateValid',
                    'workStatusValid', 
                ],

                employeeCode: null,
                fullName: null,
                dateOfBirth: null,
                genderName: null,
                identityNumber: null,
                identityDate: null,
                identityPlace: null,
                email: null,
                phoneNumber: null,
                positionName: null,
                departmentName: null,
                personalTaxCode: null,
                salary: null,
                joinDate: null,
                workStatus: null,

                fullNameValid: true,
                employeeCodeValid: true,
                dateOfBirthValid: true,
                genderNameValid: true,
                identityNumberValid: true,
                identityDateValid: true,
                identityPlaceValid: true,
                emailValid: true,
                phoneNumberValid: true,
                positionNameValid: true,
                departmentNameValid: true,
                personalTaxCodeValid: true,
                salaryValid: true,
                joinDateValid: true,
                workStatusValid: true,

                isValid: true,
            }
        },

        filters: {

            formatNull: function(value) {
                return formatNull(value)
            },

            formatDate: function(value) {
                return formatDateInput(value);
            },

            formatMoney: function(value) {
                return formatMoney(value)
            },

            formatWorkStatus: function (value) {
                return formatWorkStatus(value)
            },

        },

        components: {
            BaseCombobox, BaseButton,
                BaseInput
        },

        mounted: function() {
            this.initEvents()
        },
            
        watch: {
            entityId: async function (val) {
                if (val) {
                    getDataById(val, (response) => {
                        this.setForm(response)
                    })
                } else {
                    this.resetFrom()
                    this.employeeCode = await getNewCode()
                }
            }
        },

        methods: {

            initEvents(){

                $('#salary').on('input',function() {
                    let value = $(this).val()
                    value = value.replaceAll('.','')
                    value = value.replaceAll(',','')
                    value = Number(value).toLocaleString('it-IT');
                    $(this).val(value)
                })
            },

            hideForm() {
                // showWarningPopup()
                this.$emit('closeModal')
            },

            resetFrom() {
                this.employeeCode= '';
                this.fullName= '';
                this.dateOfBirth= '';
                this.genderName= '';
                this.email = '';
                this.identityNumber= '';
                this.identityDate= '';
                this.identityPlace= '';
                this.phoneNumber= '';
                this.positionName= '';
                this.departmentName= '';
                this.personalTaxCode= '';
                this.salary= '';
                this.soinDate= '';
                this.workStatus= '';
            },

            setForm(response) {
                this.employeeCode= response['EmployeeCode'];
                this.fullName= response['FullName'];
                this.dateOfBirth= response['DateOfBirth'];
                this.genderName= response['GenderName'];
                this.identityNumber= response['IdentityNumber'];
                this.identityDate= response['IdentityDate'];
                this.identityPlace= response['IdentityPlace'];
                this.email= response['Email'];
                this.phoneNumber= response['PhoneNumber'];
                this.positionName= response['PositionName'];
                this.departmentName= response['DepartmentName'];
                this.personalTaxCode= response['PersonalTaxCode'];
                this.salary= response['Salary'];
                this.joinDate= response['JoinDate'];
                this.workStatus= response['WorkStatus'];
            },

            submitForm() {
                this.isValid = true
                this.refs.forEach(item => {
                    this.$refs[item].inputFocusoutEvent()
                })
                this.valids.forEach(item => {
                    this.isValid = this.isValid && this[item]
                })
                if(this.isValid) {
                    let data = {
                    }
                    this.refs.forEach((item, index) => {
                        data[item] = this[this.fieldNames[index]]
                    })
                    if(this.entityId) {
                        data['EmployeeId'] = this.entityId
                        updateData(data, this.entityId)
                    } else {
                        addData(data)
                    }
                    this.hideForm()
                }
                // if (!checkFormValid(this.$el)) return;
                // let data = {}
                // $(this.$el).find('.form__field-input').each((index, item) => {
                //     let fieldName = $(item).attr('fieldName')
                //     let fieldType = $(item).attr('fieldType')
                //     let value = $(item).find('input').val()
                //     if(fieldType == 'Date') value = new Date(value)
                //     else if(fieldType == 'Money') {
                //         value = value.replaceAll('.','')
                //         value = value.replaceAll(',','')
                //         value = parseInt(value)
                //     } else if (fieldName == 'GenderName') {
                //         if (value == 'Nam') data['Gender'] = 1;
                //         else if (value == 'Nữ') data['Gender'] = 0;
                //         else if (value == 'Không xác định') data['Gender'] = 2;
                //     }
                //     data[fieldName] = value;
                // })
                // let employeeId = $('.modal .info-form').attr('employeeId')
                // if (employeeId == '') {
                //     addData(data)
                // } else if (employeeId != '') {
                //     data["employeeId"] = employeeId;
                //     updateData(data, employeeId)
                // }
                // this.hideForm()
            },

            setData($event, fieldName) {
                this[fieldName] = $event
            },

            setValid(valid, fieldName) {
                this[fieldName] = valid
            }
        }
    }
</script>

<style scoped>
@import '../../../css/base/form.css';
</style>