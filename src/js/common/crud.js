import axios from 'axios'
import {formatDataInput} from '../../js/common/format'
import { showErrorToast, showToast } from '../../js/base/toast'
var $ = require('jquery')

export function getData(callback = function(){}) {
    axios.get(`http://cukcuk.manhnv.net/v1/Employees`)
    .then((response) => {
        callback(response)
    }).catch(() => {
        showErrorToast()
    })
}

export function getDataById(id) {
    axios.get('http://cukcuk.manhnv.net/v1/Employees/' + id )
    .then((response) => {
        let res = response.data
        $('.info-form .field-label').each((index, item) => {
            let fieldName = $(item).attr('fieldName')
            let fieldType = $(item).attr('fieldType')
            let value =res[fieldName]
            value = formatDataInput(value, fieldType)
            
            $(item).find('input').val(value)
            $(item).trigger('focusout')
        })
    }).catch(() => {
        showErrorToast()
    })
}

export function getDataFilterd(pageSize, pageNumber, departmentId, positionId, callback= function(){}) {
    axios.get(`http://cukcuk.manhnv.net/v1/Employees/` + `employeeFilter?pageSize=${ pageSize }&pageNumber=${ pageNumber }&employeeFilter=NV&departmentId=${departmentId}&positionId=${positionId}`)
    .then((response) => {
        callback(response)
    }).catch(() => {
        showErrorToast()
    })
}

export function addData(data, callback = function(){}) {
    axios.post('http://cukcuk.manhnv.net/v1/Employees/', data)
    .then((response) => {
        callback(response)
        showToast('success', 'Thêm dữ liệu thành công!')
    })
}

export function updateData(data, id, callback = function(){}) {
    axios.put('http://cukcuk.manhnv.net/v1/Employees/' + id, data)
    .then((response) => {
        callback(response)
        showToast('success', 'Sửa đổi dữ liệu thành công!')
    }).catch(() => {
        showErrorToast()
    })
}

export function deleteData(id, callback = function(){}, show) {
    axios.delete('http://cukcuk.manhnv.net/v1/Employees/' + id)
    .then((response) => {
        callback(response)
        showToast('success', 'Xóa dữ liệu thành công!', show)
    }).catch(() => {
        showErrorToast()
    })
}

export async function deleteMultiple(ids, callback= function(){}){
    let requests = []
    await ids.map(id => {
        requests.push(deleteData(id, function(){}, false ))
    })
    axios.all(requests)
    .then((response) => {
        callback(response)
        showToast('success', 'Xóa các bản ghi thành công!')
    })
}

export async function getNewCode() {
    let res;
    await axios.get('http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode')
    .then((response) => {
        res = response.data
    }).catch(() => {
        showErrorToast()
    })
    return res
}