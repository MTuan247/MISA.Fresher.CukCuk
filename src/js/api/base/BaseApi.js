import axios from 'axios'
import { showErrorToast, showToast } from '../../base/toast'

export default class BaseAPI {

    constructor() {
    }

    static host = null;
    static api = null;

    /**
     * Phương thức lấy tất cả dữ liệu
     */
    static getAll(callback = () => {}) {
        axios.get(this.api)
        .then((response) => {
            callback(response)
        }).catch((error) => {
            console.log(error)
            showErrorToast()
        })
    }

    static getById(id, callback = () => {}) {
        axios.get(this.api+ id)
        .then((response) => {
            console.log(response)
            callback(response)
        }).catch(() => {
            showErrorToast()
        })
    } 

    static getDataFiltered(pageSize, pageNumber, entityFilter, departmentId, positionId, callback= function(){}) {
        let empl = entityFilter
        // if(!empl) empl = `NV`
        axios.get(this.api + `employeeFilter?pageSize=${ pageSize }&pageNumber=${ pageNumber }&employeeFilter=${empl}&departmentId=${departmentId}&positionId=${positionId}`)
        .then((response) => {
            console.log(response)
            callback(response)
        }).catch(() => {
            showErrorToast()
        })
    }

    static get(api, callback = function() {}) {
        axios.get(api)
        .then((response) => {
            callback(response)
        }).catch(() => {
            showErrorToast()
        })
    }

    static saveData(data, callback = function(){}) {
        axios.post(this.api, data)
        .then((response) => {
            callback(response)
            showToast('success', 'Thêm dữ liệu thành công!')
        }).catch((error) => {
            console.log(error)
            showErrorToast()
        })
    }

    /**
     * Hàm cập nhật dữ liệu
     * @param {*} id 
     * @param {*} body 
     */
    static update(data, id, callback = function(){} ) {
        axios.put(this.api + id, data, {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then((response) => {
            console.log(response)
            callback(response)
            showToast('success', 'Sửa đổi dữ liệu thành công!')
        }).catch((error) => {
            console.log(error.response)
            showErrorToast()
        })
    }

    /**
     * Hàm xóa bản ghi
     * @param {*} id 
     */
    static delete(id, callback = function(){}) {
        axios.delete(this.api + id)
        .then((response) => {
            callback(response)
        }).catch(() => {
            showErrorToast()
        })
    }

    static async deleteMultiple(ids, callback= function(){}){
        let requests = []
        ids.map(id => {
            requests.push(axios.delete(this.api + id))
        })
        await axios.all(requests)
        .then(() => {
            callback()
            showToast('success', 'Xóa các bản ghi thành công!')
        }).catch(() => {
            showErrorToast()
        })
    }

    static async getNewCode() {
        let res;
        await axios.get(this.api +  'NewEmployeeCode' )
        .then((response) => {
            res = response.data
        }).catch(() => {
            showErrorToast()
        })
        return res
    }
}