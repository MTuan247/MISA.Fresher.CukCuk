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
                                    inputLabel="Mã nhân viên"
                                    inputClass="field__input"
                                    :tooltip="true"
                                    :required="true"
                                    :modelValue="this.employeeCode"
                                    @update="this.employeeCode = $event"
                                />
                            </div>

                            <div fieldName="FullName" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Họ và tên"
                                    inputClass="field__input"
                                    :tooltip="true"
                                    :required="true"
                                    :modelValue="this.fullName"
                                    @update="this.fullName = $event"
                                />
                            </div>

                            <div fieldName="DateOfBirth" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Ngày sinh"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.dateOfBirth | formatDate"
                                    @update="this.dateOfBirth = $event"
                                />
                            </div>

                            <div fieldName="GenderName" class="field-label form__field-input">
                                <div class="label">Giới tính</div>
                                <BaseCombobox 
                                    :extraData="[{ title: 'Nam' }, { title: 'Nữ' }, { title: 'Không xác định'}]"
                                />
                            </div>

                            <div fieldName="IdentityNumber" class="field-label form__field-input">
                                <BaseInput
                                    inputLabel="Số CMTND/ Căn cước"
                                    inputClass="field__input"
                                    inputType="number"
                                    :required="true"
                                    :tooltip="true" 
                                />

                            </div>

                            <div fieldName="IdentityDate" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Ngày cấp"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                />
                            </div>

                            <div fieldName="IdentityPlace" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Nơi cấp"
                                    inputClass="field__input"
                                />
                            </div>

                        </div>
                        <div class="form__input">
                            <div fieldName="Email" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Email"
                                    inputClass="field__input"
                                    inputType="email"
                                    :tooltip="true"
                                    :required="true"
                                />
                            </div>
                            <div fieldName="PhoneNumber" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Số điện thoại"
                                    inputClass="field__input"
                                    pattern="^[0-9\-\+]{9,15}$"
                                    inputType="tel"
                                    :required="true"
                                    :tooltip="true"
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
                                    dataType="Position"
                                    api="http://cukcuk.manhnv.net/v1/Positions"
                                    fieldName="PositionName"
                                    fieldID="PositionId"
                                />
                            </div>

                            <div fieldName="DepartmentName" class="field-label form__field-input">
                                <div class="label">Phòng ban</div>
                                <BaseCombobox
                                    dataType="Department"
                                    api="http://cukcuk.manhnv.net/api/Department"
                                    id="department-combobox"
                                    fieldName="DepartmentName"
                                    fieldId="DepartmentId"
                                />
                            </div>

                            <div fieldName="PersonalTaxCode" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Mã số thuế cá nhân"
                                    inputClass="field__input"
                                    inputType="number"
                                />
                            </div>

                            <div fieldName="Salary" fieldType="Money" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Mức lương cơ bản"
                                    inputClass="field__input"
                                    inputType="text"
                                    inputId="salary"
                                    :inputMaxlength="15"
                                />
                            </div>

                            <div fieldName="JoinDate" fieldType="Date" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Ngày gia nhập công ty"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                />
                            </div>

                            <div fieldName="WorkStatus" class="field-label form__field-input">
                                <BaseInput 
                                    inputLabel="Tình trạng công việc"
                                    inputClass="field__input"
                                    inputType="text"
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

    import BaseCombobox from './BaseCombobox.vue'
    import { validateInput } from '../../js/common/validate'
    import { checkFormValid } from '../../js/base/form'
    import { formatDateInput } from '../../js/common/format'
    import BaseButton from './BaseButton.vue'
    import BaseInput from './BaseInput.vue'

    // import {showWarningPopup} from '../../js/base/popup'
    import { addData, getDataById, getNewCode, updateData } from '../../js/common/crud'
    var $ = require('jquery')
    export default {
        name: 'BaseForm',
        props: ['entityId'],
        data() {
            return {
                employeeCode: null,
                fullName: null,
                dateOfBirth: null,
                genderName: null,
                identityNumber: null,
                identityDate: null,
                identityPlace: null,
                phoneNumber: null,
                positionName: null,
                departmentName: null,
                personalTaxCode: null,
                salary: null,
                joinDate: null,
                workStatus: null,
            }
        },

        filters: {
            formatDate: function(value) {
                return formatDateInput(value);
            }
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
                $(".field-label").focusout(function () {
                    validateInput(this)
                });

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
                this.phoneNumber= response['PhoneNumber'];
                this.positionName= response['PositionName'];
                this.departmentName= response['DepartmentName'];
                this.personalTaxCode= response['PersonalTaxCode'];
                this.salary= response['Salary'];
                this.joinDate= response['JoinDate'];
                this.workStatus= response['WorkStatus'];
            },

            submitForm() {
                if (!checkFormValid(this.$el)) return;
                let data = {}
                $(this.$el).find('.form__field-input').each((index, item) => {
                    let fieldName = $(item).attr('fieldName')
                    let fieldType = $(item).attr('fieldType')
                    let value = $(item).find('input').val()
                    if(fieldType == 'Date') value = new Date(value)
                    else if(fieldType == 'Money') {
                        value = value.replaceAll('.','')
                        value = value.replaceAll(',','')
                        value = parseInt(value)
                    } else if (fieldName == 'GenderName') {
                        if (value == 'Nam') data['Gender'] = 1;
                        else if (value == 'Nữ') data['Gender'] = 0;
                        else if (value == 'Không xác định') data['Gender'] = 2;
                    }
                    data[fieldName] = value;
                })
                let employeeId = $('.modal .info-form').attr('employeeId')
                if (employeeId == '') {
                    addData(data)
                } else if (employeeId != '') {
                    data["employeeId"] = employeeId;
                    updateData(data, employeeId)
                }
                this.hideForm()
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/form.css';
</style>