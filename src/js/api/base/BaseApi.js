import axios from 'axios'
import { showErrorToast, showToast } from '../../base/toast'

export default class BaseAPI {

    constructor() {
    }

    static host = null;
    static api = null;

    /**
     * Hàm lấy toàn bộ dữ liệu
     * @param {function} callback Callback
     */
    static getAll(callback = () => { }) {
        axios.get(this.api)
            .then((response) => {
                callback(response)
            }).catch((error) => {
                console.log(error.response)
                showToast('error', error.response.data.UserMsg)
            })
    }

    /**
     * Hàm lấy bản ghi theo id
     * @param {string} id id của bản ghi
     * @param {function} callback Hàm truyền vao
     */
    static getById(id, callback = () => { }) {
        axios.get(this.api + id)
            .then((response) => {
                console.log(response)
                callback(response)
            }).catch((error) => {
                console.log(error.response)
                showToast('error', error.response.data.UserMsg)
            })
    }

    /**
     * Hàm lấy bản ghi theo tiêu chí
     * @param {int} pageSize Số bản ghi trong 1 trang
     * @param {int} pageNumber Số trang
     * @param {string} entityFilter Giá trị filter
     * @param {string} departmentId Id phòng ban
     * @param {string} positionId Id vị trí
     * @param {function} callback Hàm gọi sau khi load
     */
    static getDataFiltered(pageSize, pageNumber, entityFilter, departmentId, positionId, callback = function(){}, failCallback = function(){}) {
        let empl = entityFilter
        // if(!empl) empl = `NV`
        axios.get(this.api + `employeeFilter?pageSize=${pageSize}&pageNumber=${pageNumber}&employeeFilter=${empl}&departmentId=${departmentId}&positionId=${positionId}`)
            .then((response) => {
                console.log(response)
                callback(response)
                if (response.data.TotalRecord == 0 || response.status == 204) {
                    showToast('error', 'Không có dữ liệu trả về!')
                }
            }).catch((error) => {
                if (error.response.data) {
                    failCallback(error.response.data);
                    showToast('error', error.response.data.UserMsg);
                } else {
                    failCallback(error.response);
                    showErrorToast();
                }
            })
    }

    /**
     * Hàm lấy dữ liệu từ api
     * @param {url} api api cần gọi
     * @param {function} callback Hàm callback
     */
    static get(api, callback = function () { }) {
        axios.get(api)
            .then((response) => {
                callback(response)
                if (response.data.TotalRecord == 0) {
                    showToast('error', 'Không có dữ liệu trả về!')
                }
            }).catch((error) => {
                console.log(error.response)
                showToast('error', error.response.data.UserMsg)
            })
    }

    /**
     * Hàm post data
     * @param {object} data data cần post
     * @param {function} successCallback Hàm callback
     */
    static saveData(data, successCallback = function () { }, failCallback = function () { }) {
        axios.post(this.api, data)
        .then((response) => {
            if (response.data.Success) {
                successCallback(response);
                showToast('success', response.data.UserMsg);
            } else {
                failCallback(response)
                showToast('error', response.data.UserMsg);
            }
        }).catch((error) => {
            if (error.response) {
                failCallback(error.response);
                showToast('error', error.response.data.UserMsg);
            } else {
                failCallback(error.response);
                showErrorToast();
            }
        })
    }

    /**
     * Hàm cập nhật dữ liệu
     * @param {*} id 
     * @param {*} body 
     */
    static update(data, id, successCallback = function () { }, failCallback = function () { }) {
        axios.put(this.api + id, data, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            if (response.data.Success) {
                successCallback(response);
                showToast('success', response.data.UserMsg);
            } else {
                failCallback(response)
                showToast('error', response.data.UserMsg);
            }
        }).catch((error) => {
            if (error.response) {
                failCallback(error.response);
                showToast('error', error.response.data.UserMsg);
            } else {
                failCallback(error.response);
                showErrorToast();
            }
        })
    }

    /**
     * Hàm xóa bản ghi
     * @param {*} id 
     */
    static delete(id, callback = function () { }) {
        axios.delete(this.api + id)
            .then((response) => {
                if (response.data.Success) {
                    callback(response);
                    showToast('success', response.data.UserMsg);
                } else {
                    showToast('error', response.data.UserMsg);
                }
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response);
                    showToast('error', error.response.data.UserMsg);
                } else {
                    showErrorToast();
                }
            })
    }

    /**
     * Hàm xóa nhiều bản ghi
     * @param {array} ids danh sách id
     * @param {function} callback Callback
     */
    static async deleteMultiple(ids, callback = function(){}, failCallback = function(){}) {
        // axios({
        //     method: 'delete',
        //     url: this.api + 'multiple',
        //     data: ids,
        // })
        axios.delete(this.api + 'multiple', {
            data: ids
        })
        .then((response) => {
            callback()
            showToast('success', response.data.UserMsg)
        }).catch((error) => {
            if (error.response.data.UserMsg) {
                failCallback(error.response.data);
                showToast('error', error.response.data.UserMsg);
            } else {
                failCallback(error.response);
                showErrorToast();
            }
        })
    }

    /**
     * Hàm lấy mã mới
     * @returns string
     */
    static async getNewCode() {
        let res;
        await axios.get(this.api + 'NewEmployeeCode')
            .then((response) => {
                res = response.data
            }).catch((error) => {
                console.log(error.response)
                showToast('error', error.response.data.UserMsg)
            })
        return res
    }
}