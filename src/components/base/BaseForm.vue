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
                                <!-- <div class="combo-box" tabindex="0">
                                    <input type="text" class="value combo-box__text" value="" />
                                    <i class="fa fa-angle-down combo-box__icon" aria-hidden="true"></i>
                                    <div class="collapse">
                                        <div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left"
                                                aria-hidden="true"></i>Không xác định</div>
                                        <div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left"
                                                aria-hidden="true"></i>Nam</div>
                                        <div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left"
                                                aria-hidden="true"></i>Nữ</div>
                                    </div>
                                </div> -->
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
                                <div class="label">Mã số thuế cá nhân</div>
                                <input class="field__input" type="number" name="" id="">
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>

                            <div fieldName="Salary" fieldType="Money" class="field-label form__field-input">
                                <div class="label">Mức lương cơ bản</div>
                                <input type="text" id="salary" maxlength="15" name="">
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>

                            <div fieldName="JoinDate" fieldType="Date" class="field-label form__field-input">
                                <div class="label">Ngày gia nhập công ty</div>
                                <input class="field__input" type="date" name="" id="">
                            </div>

                            <div fieldName="WorkStatus" class="field-label form__field-input">
                                <div class="label">Tình trạng công việc</div>
                                <input class="field__input" type="number" name="" id="">
                                <i class="fa fa-times icon-right" aria-hidden="true"></i>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="form__footer">
                <input type="reset" id="cancel" value="Hủy" class="btn-seconds" title="Hủy">
                <input id="submit" type="submit" class="btn-icon" value="Lưu" title="Lưu">
            </div>
        </div>
    </div>
</template>

<script>
    import BaseCombobox from './BaseCombobox.vue'
    import axios from 'axios'
    var $ = require('jquery')
    export default {
        name: 'BaseForm',
        components: {
            BaseCombobox
        },
        props: ['baseUrl'],
        methods: {
            resetForm() {
                $('.info-form').find('.form__field-input').find('input').val("")
            },

            hideForm() {
                $('.modal').hide()
            },

            postForm(data) {
                axios.post(this.baseUrl, data)
                .then((res) => {
                    console.log(res)
                })
            }

        }
    }
</script>

<style scoped>
@import '../../css/base/form.css'
</style>