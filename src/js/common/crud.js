import axios from 'axios'
import {formatDataInput} from '../../js/common/format'
var $ = require('jquery')

export function getData(callback) {
    axios.get(`http://cukcuk.manhnv.net/v1/Employees`)
    .then((response) => {
        callback(response)
    });
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
    })
}

export function addData(data) {
    axios.post('http://cukcuk.manhnv.net/v1/Employees/', data)
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    })
}

export function updateData(data, id) {
    axios.put('http://cukcuk.manhnv.net/v1/Employees/' + id, data)
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    })
}

export async function getNewCode() {
    let res;
    await axios.get('http://cukcuk.manhnv.net/v1/Employees/NewEmployeeCode')
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        res = response.data
    })
    return res
}