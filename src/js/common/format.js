/* 
* Hàm format các giá trị null
* Author: NMTuan (05/07/2021)
*/
export function formatNull(value) {
    if (!value) return "";
    return value;
}

/**
 * Hàm format các giá trị date
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
export function formatDate(value) {
    if (!value) return null;

    let result = new Date(value)

    let day = result.getDate()
    let month = result.getMonth() + 1
    let year = result.getFullYear()

    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    result = day + '/' + month + '/' + year
    return result;
}

/**
 * Hàm format date cho input type date
 * Author: NMTuan (07/07/2021)
 * @param {*} value 
 * @returns 
 */
export function formatDateInput(value) {
    if (!value) return null;
    let result = new Date(value)
    let day = result.getDate()
    let month = result.getMonth() + 1
    let year = result.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    result = year + '-' + month + '-' + day
    return result;
}

/**
 * Hàm format tình trạng làm việc (WorkStatus)
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
export function formatWorkStatus(value) {
    if (value == 1) return "Đang làm việc"
    else if (value === 0) return "Đã nghỉ việc"
    return null;
}

/**
 * Hàm format workstatus từ string sang int
 * @author: (NMTuan) (17/07/2021)
 * @param {String} value Giá trị string
 * @returns giá trị int
 */
export function reverseFormatWorkStatus(value) {
    if (value == "Đang làm việc") return 1
    else if (value == "Đã nghỉ việc") return 0
    return null;
}

/**
 * Hàm format giá trị tiền tệ
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
export function formatMoney(value) {
    if (!value) return '';
    value = value.toString()
    value = value.replaceAll('.','')
    value = value.replaceAll(',','')
    return Number(value).toLocaleString('it-IT');
    // return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

/**
 * Hàm format tổng hợp
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @param {*} fieldName 
 * @returns 
 */
function formatData(value, fieldName) {
    let rs = value
    if (fieldName == "WorkStatus") {
        rs = formatWorkStatus(rs)
    }
    if (fieldName == "Salary") {
        rs = formatMoney(rs)
    }
    if (fieldName == "DateOfBirth") {
        rs = formatDate(rs)
    }
    rs = formatNull(rs)
    return rs;
}

/**
 * Hàm loại bỏ dấu
 * @param {string} str string cần loại bỏ dấu
 * @returns string đã được loại bỏ dấu
 */
function removeAccents(str) {
    var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ", "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ"
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
    }
    return str;
}

export { formatData, removeAccents}
