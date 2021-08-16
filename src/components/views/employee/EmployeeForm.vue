<template>
    <div class="modal">
        <BaseSpinner :isLoading="isLoading" backgroundColor="rgba(0,0,0,0.5)" />
        <div class="info-form">
            <div class="form__header">
            <div class="div-icon close" @click="this.closeForm" style="background-image: url(./assets/icon/x.svg);"></div>
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
                                    :modelValue="this.data['EmployeeCode'] | formatNull"
                                    :inputMaxlength="20"
                                    @update="setData($event,'EmployeeCode')"
                                    @setValid="setValid($event,'EmployeeCode')"
                                />
                            </div>

                            <div fieldName="FullName" class="field-label form__field-input">
                                <BaseInput
                                    ref="FullName"
                                    inputLabel="Họ và tên"
                                    inputClass="field__input"
                                    :inputMaxlength="100"
                                    :tooltip="true"
                                    :required="true"
                                    :modelValue="this.data['FullName'] | formatNull"
                                    @update="setData($event,'FullName')"
                                    @setValid="setValid($event,'FullName')"
                                />
                            </div>

                            <div fieldName="DateOfBirth" fieldType="Date" class="field-label form__field-input">
                                <!-- <BaseInput 
                                    ref="DateOfBirth"
                                    inputLabel="Ngày sinh"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['DateOfBirth'] | formatDate | formatNull"
                                    @update="setData($event,'DateOfBirth')"
                                    @setValid="setValid($event,'dateOfBirthValid')"
                                /> -->
                                <div class="label">Ngày sinh</div>
                                <!-- <BaseDatePicker 
                                    ref="DateOfBirth"
                                    inputClass="field__input"
                                    :value="data['DateOfBirth'] | formatDate | formatNull"
                                    @input="setData($event,'DateOfBirth')"
                                    @setValid="setValid($event,'dateOfBirthValid')"
                                /> -->
                                <BaseDatePick 
                                    ref="DateOfBirth"
                                    inputClass="field__input"
                                    :value="data['DateOfBirth']"
                                    @input="setData($event,'DateOfBirth')"
                                    :formatType="formatDate"
                                />
                            </div>

                            <div fieldName="GenderName" class="form__field-input">
                                <div class="label">Giới tính</div>
                                <BaseCombobox 
                                    ref="GenderName"
                                    v-model="data['GenderName']"
                                    fieldName="GenderName"
                                    :extraData="[
                                        { title: 'Chọn/Nhập giới tính', val: null },
                                        { title: 'Nam', val: 0 }, 
                                        { title: 'Nữ', val: 1 }, 
                                        { title: 'Không xác định', val: 2 }
                                    ]"
                                    @updateValue="data['Gender'] = $event"
                                />
                            </div>

                            <div fieldName="IdentityNumber" class="field-label form__field-input">
                                <BaseInput
                                    ref="IdentityNumber"
                                    inputLabel="Số CMTND/ Căn cước"
                                    inputClass="field__input"
                                    pattern="^[0-9]{9,15}$"
                                    filterInputType="number"
                                    :required="true"
                                    :tooltip="true"
                                    :modelValue="this.data['IdentityNumber'] | formatNull"
                                    @update="setData($event,'IdentityNumber')"
                                    @setValid="setValid($event,'IdentityNumber')" 
                                />

                            </div>

                            <div fieldName="IdentityDate" fieldType="Date" class="field-label form__field-input">
                                <!-- <BaseInput 
                                    ref="IdentityDate"
                                    inputLabel="Ngày cấp"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['IdentityDate'] | formatDate | formatNull"
                                    @update="setData($event,'IdentityDate')"
                                /> -->
                                <div class="label">Ngày cấp</div>
                                <!-- <BaseDatePicker 
                                    ref="IdentityDate"
                                    inputClass="field__input"
                                    :value="data['IdentityDate'] | formatDate | formatNull"
                                    @input="setData($event,'IdentityDate')"
                                    @setValid="setValid($event,'identityDateValid')"
                                /> -->
                                <BaseDatePick 
                                    ref="IdentityDate"
                                    inputClass="field__input"
                                    :value="data['IdentityDate']"
                                    @input="setData($event,'IdentityDate')"
                                    :formatType="formatDate"
                                />
                            </div>

                            <div fieldName="IdentityPlace" class="field-label form__field-input">
                                <BaseInput 
                                    ref="IdentityPlace"
                                    inputLabel="Nơi cấp"
                                    inputClass="field__input"
                                    :inputMaxlength="15"
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
                                    @setValid="setValid($event,'Email')" 
                                />
                            </div>
                            <div fieldName="PhoneNumber" class="field-label form__field-input">
                                <BaseInput 
                                    ref="PhoneNumber"
                                    inputLabel="Số điện thoại"
                                    inputClass="field__input"
                                    pattern="^[0-9\-\+]{9,15}$"
                                    inputType="tel"
                                    :inputMaxlength="15"
                                    :required="true"
                                    :tooltip="true"
                                    :modelValue="this.data['PhoneNumber'] | formatNull"
                                    @update="setData($event,'PhoneNumber')"
                                    @setValid="setValid($event,'PhoneNumber')" 
                                />
                            </div>
                        </div>
                    </div>
                    <div class="area">
                        <div class="content__header">B.Thông tin công việc</div>
                        <div class="form__input">
                            <div fieldName="PositionName" class="form__field-input">
                                <div class="label">Vị trí</div>
                                <BaseCombobox
                                    ref="PositionName"
                                    dataType="Position"
                                    fieldName="PositionName"
                                    fieldId="PositionId"
                                    v-model="data['PositionName']"
                                    :api="positionApi"
                                    :extraData="[{ title: 'Chọn/Nhập vị trí', val: null }]"
                                    @updateValue="data['PositionId'] = $event"
                                />
                            </div>

                            <div fieldName="DepartmentName" class="form__field-input">
                                <div class="label">Phòng ban</div>
                                <BaseCombobox
                                    ref="DepartmentName"
                                    dataType="Department"
                                    id="department-combobox"
                                    fieldName="DepartmentName"
                                    fieldId="DepartmentId"
                                    v-model="data['DepartmentName']"
                                    :api="departmentApi"
                                    :extraData="[{ title: 'Chọn/Nhập phòng ban', val: null }]"
                                    @updateValue="data['DepartmentId'] = $event"
                                />
                            </div>

                            <div fieldName="PersonalTaxCode" class="form__field-input">
                                <BaseInput 
                                    ref="PersonalTaxCode"
                                    inputLabel="Mã số thuế cá nhân"
                                    inputClass="field__input"
                                    pattern="^[0-9]{9,12}$"
                                    filterInputType="number"
                                    :inputMaxlength="12"
                                    :tooltip="true"
                                    :modelValue="this.data['PersonalTaxCode'] | formatNull"
                                    @update="setData($event,'PersonalTaxCode')" 
                                    @setValid="setValid($event,'PersonalTaxCode')" 
                                />
                            </div>

                            <div fieldName="Salary" fieldType="Money" class="form__field-input">
                                <BaseInput 
                                    ref="Salary"
                                    inputLabel="Mức lương cơ bản"
                                    inputClass="field__input"
                                    inputType="text"
                                    inputId="salary"
                                    filterInputType="number"
                                    :inputMaxlength="20"
                                    :modelValue="this.data['Salary'] | formatMoney"
                                    @update="setData($event,'Salary')" 
                                />
                            </div>

                            <div fieldName="JoinDate" fieldType="Date" class="form__field-input">
                                <!-- <BaseInput 
                                    ref="JoinDate"
                                    inputLabel="Ngày gia nhập công ty"
                                    inputClass="field__input"
                                    inputType="date"
                                    :clearIcon="false"
                                    :modelValue="this.data['JoinDate'] | formatDate | formatNull"
                                    @update="setData($event,'JoinDate')" 
                                /> -->
                                <div class="label">Ngày gia nhập công ty</div>
                                <!-- <BaseDatePicker 
                                    ref="JoinDate"
                                    inputClass="field__input"
                                    :value="data['JoinDate'] | formatDate | formatNull"
                                    @input="setData($event,'JoinDate')"
                                    position="up"
                                    @setValid="setValid($event,'joinDateValid')"
                                /> -->
                                <BaseDatePick 
                                    ref="JoinDate"
                                    inputClass="field__input"
                                    :value="data['JoinDate']"
                                    @input="setData($event,'JoinDate')"
                                    :formatType="formatDate"
                                />
                            </div>

                            <div fieldName="WorkStatus" class="form__field-input">
                                <!-- <BaseInput 
                                    ref="WorkStatus"
                                    inputLabel="Tình trạng công việc"
                                    inputClass="field__input"
                                    inputType="text"
                                    :modelValue="this.data['WorkStatus'] | formatWorkStatus | formatNull"
                                    @update="setData($event,'WorkStatus')" 
                                /> -->
                                <div class="label">Tình trạng công việc</div>
                                <BaseCombobox 
                                    ref="WorkStatus"
                                    v-model="data['WorkStatusName']"
                                    fieldName="WorkStatusName"
                                    fieldId="WorkStatus"
                                    direction="up"
                                    :extraData="[
                                        {title: 'Chọn/Nhập tình trạng công việc', val: null },
                                        {title: 'Đã nghỉ việc', val: 0 }, 
                                        {title: 'Đang làm việc', val: 1 },
                                        {title: 'Đang học việc', val: 2},
                                        {title: 'Không xác định', val: 3}
                                    ]"
                                    @updateValue="data['WorkStatus'] = $event"
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
                    @keydown.native.tab.exact.prevent="$refs.EmployeeCode.$refs.Input.focus()"
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

    import BaseSpinner from '../../base/BaseSpinner.vue'
    import Vue from 'vue'
    import EmployeeApi from '../../../js/api/employee/EmployeeApi'
    import BaseDatePick from '../../base/BaseDatePick.vue'

    export default {
        name: 'EmployeeForm',
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

                data: {},
                valids: [],
                formatDate: localStorage.formatDate,
                isValid: true,
                departmentApi: EmployeeApi.departmentApi,
                positionApi: EmployeeApi.positionApi,
                oldData: {},
                isLoading: false,
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
            BaseCombobox, BaseButton, BaseInput, BaseDatePick, BaseSpinner
        },

        /**
         * Hàm xử lý khi khởi tạo lấy dữ liệu từ api
         * @author: NMTuan (20/07/2021)
         */
        async created() {
            this.isLoading = true

            if (this.entityId) {
                EmployeeApi.getById(this.entityId, (response) => {
                    this.setForm(response.data)
                    this.convertData()
                    this.oldData = JSON.parse(JSON.stringify(this.data))
                    this.isLoading = false
                })
            } else {
                this.resetForm()
                let emCode = await EmployeeApi.getNewCode()
                Vue.set(this.data,'EmployeeCode', emCode)
                this.oldData = JSON.parse(JSON.stringify(this.data))
                this.isLoading = false
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
                if (this.isChanged()) {
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
                } else {
                    this.hideForm()
                }
                
            },

            /**
             * Hàm reset lại form
             * @author: NMTuan (20/07/2021)
             */
            resetForm() {
                this.data["DepartmentName"] = 'Chọn/Nhập phòng ban';
                this.data["PositionName"] = 'Chọn/Nhập vị trí';
                this.data["GenderName"] = 'Chọn/Nhập giới tính';
                this.data["WorkStatusName"] = "Chọn/Nhập tình trạng công việc";
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
            },

            /**
             * Submit form
             * @author: NMTuan (20/07/2021)
             */
            submitForm() {
                //Blur qua các ô input
                this.isValid = true
                this.refs.forEach(item => {
                    this.$refs[item].inputFocusoutEvent()
                })
                
                //Kiểm tra có trường bị sai
                for (let valid in this.valids) {
                    if (!this.valids[valid]) {
                        this.$refs[valid].$refs.Input.focus()
                        return;
                    }
                    this.isValid = this.isValid && this.valids[valid]
                }

                //Nếu hợp lệ thì submit form
                if (this.isValid) {
                    //Chuẩn hóa dữ liệu salary
                    this.standardizedData(this.data)
                    //Nếu tồn tại id truyền vào thì update không thì thêm mới dữ liệu
                    if(this.entityId) {
                        this.updateData();
                    } else {
                        this.addNewData();
                    }
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
                //Chuyển dữ liệu phòng ban
                if(!this.data["DepartmentId"]) {
                    Vue.set(this.data, 'DepartmentName', 'Chọn/Nhập phòng ban')
                }

                //Chuyển dữ liệu vị trí
                if(!this.data["PositionId"]) {
                    Vue.set(this.data, 'PositionName', 'Chọn/Nhập vị trí');
                }

                if(this.data["Gender"] === "") {
                    Vue.set(this.data, 'GenderName', 'Chọn/Nhập giới tính');
                }

                //Chuyển dữ liệu tình trạng công việc
                if(this.data["WorkStatus"] === "") {
                    Vue.set(this.data, 'WorkStatusName', 'Chọn/Nhập tình trạng công việc');
                }
            },

            /**
             * Hàm thêm mới dữ liệu
             * @author: NMTuan (05/08/2021)
             */
            addNewData() {
                this.isLoading = true
                EmployeeApi.saveData(this.data, () => {
                    this.isLoading = false
                    this.$eventBus.$emit('refresh')
                    this.hideForm()
                }, () => {
                    this.isLoading = false;
                })
            },

            /**
             * Hàm cập nhật thông tin dữ liệu
             * @author: NMTuan (05/08/2021)
             */
            updateData() {
                this.isLoading = true
                EmployeeApi.update(this.data, this.entityId, () => {
                    this.isLoading = false;
                    this.$eventBus.$emit('refresh')
                    this.hideForm()
                }, () => {
                    this.isLoading = false;
                })
            },

            /**
             * Hàm kiểm tra giá trị đã được cập nhật
             * @author: NMTuan (11/08/2021)
             */
            isChanged() {
                return JSON.stringify(this.oldData) !== JSON.stringify(this.data)
            }

        }
    }
</script>

<style scoped>
@import '../../../css/base/form.css';
</style>