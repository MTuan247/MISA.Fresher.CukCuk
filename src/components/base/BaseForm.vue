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
                                <div class="input-warning">
                                    <span>Định dạng không đúng</span>
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div>
                                <div class="label">Mã nhân viên (<span style="color: red;">*</span>)</div>
                                <input class="field__input" type="text" name="" id="" required>
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>
                            <div fieldName="FullName" class="field-label form__field-input">
                                <div class="input-warning">
                                    <span>Định dạng không đúng</span>
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div>
                                <div class="label">Họ và tên (<span style="color: red;">*</span>)</div>
                                <input class="field__input" type="text" name="" id="" required>
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>
                            <div fieldName="DateOfBirth" fieldType="Date" class="field-label form__field-input">
                                <div class="label">Ngày sinh</div>
                                <input class="field__input" type="date" name="" id="">
                            </div>
                            <div fieldName="GenderName" class="field-label form__field-input">
                                <div class="label">Giới tính</div>
                                <BaseCombobox 
                                    :extraData="[{ title: 'Nam' }, { title: 'Nữ' }, { title: 'Không xác định'}]"
                                />
                            </div>
                            <div fieldName="IdentityNumber" class="field-label form__field-input">
                                <div class="input-warning">
                                    <span>Định dạng không đúng</span>
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div>
                                <div class="label">Số CMTND/ Căn cước (<span style="color: red;">*</span>)</div>
                                <input class="field__input" type="number" name="" id="" required>
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>
                            <div fieldName="IdentityDate" fieldType="Date" class="field-label form__field-input">
                                <div class="label">Ngày cấp</div>
                                <input class="field__input" type="date" name="" id="">
                            </div>
                            <div fieldName="IdentityPlace" class="field-label form__field-input">
                                <div class="label">Nơi cấp</div>
                                <input class="field__input" type="text" name="" id="">
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div class="form__input">
                            <div fieldName="Email" class="field-label form__field-input">
                                <div class="input-warning">
                                    <span>Định dạng không đúng</span>
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div>
                                <div class="label">Email (<span style="color: red;">*</span>)</div>
                                <input class="field__input" type="email" name="" id="" required>
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>
                            <div fieldName="PhoneNumber" class="field-label form__field-input">
                                <div class="input-warning">
                                    <span>Định dạng không đúng</span>
                                    <i class="fa fa-caret-down" aria-hidden="true"></i>
                                </div>
                                <div class="label">Số điện thoại (<span style="color: red;">*</span>)</div>
                                <input class="field__input" type="tel" name="" id="" pattern="^[0-9\-\+]{9,15}$"
                                    required>
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
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
    import axios from 'axios'

    import BaseCombobox from './BaseCombobox.vue'
    import { validateInput } from '../../js/common/validate'
    import { checkFormValid } from '../../js/base/form'
    import BaseButton from './BaseButton.vue'
    import BaseInput from './BaseInput.vue'

    import {showWarningPopup} from '../../js/base/popup'
    import { addData, updateData } from '../../js/common/crud'
    var $ = require('jquery')
    export default {
        name: 'BaseForm',
        components: {
            BaseCombobox, BaseButton,
                BaseInput
        },
        mounted: function() {
            this.initEvents()
        },
        methods: {

            initEvents(){
                $(".field-label").focusout(function () {
                    validateInput(this)
                });
            },

            hideForm() {
                // $('.modal').hide()
                showWarningPopup()
            },

            postForm(data) {
                axios.post(this.baseUrl, data)
                .then((res) => {
                    console.log(res)
                })
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
                    this.$parent.refresh()
                }
                $('.modal').fadeOut()
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/form.css';
</style>