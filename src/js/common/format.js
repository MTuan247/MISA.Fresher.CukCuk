var $ = require('jquery')

/**
 * Hàm format cell của table tùy theo loại dữ liệu
 * Author: NMTuan (05/07/2021)
 * @param {*} td 
 * @param {*} fieldName 
 * @param {*} index 
 * @returns 
 */
function formatCell(td, fieldName, index) {

    let cell = td

    if (fieldName == "Checkbox") {
        $(cell).addClass('check-box')
        $(cell).append(`
            <div class="custom-checkbox">
                <i class="fa fa-check" aria-hidden="true"></i>
            </div>
            <input type="checkbox" name="" id="">
        `)
    }

    if (fieldName == "Index") {
        $(cell).append(index + 1)
    }

    if (fieldName == "Salary") {
        $(cell).addClass("text-align-right")
    }
    if (fieldName == "DateOfBirth") {
        $(cell).addClass("text-align-center")
    }
    return cell;
}

/* 
* Hàm format các giá trị null
* Author: NMTuan (05/07/2021)
*/
function formatNull(value) {
    if (!value) return "";
    return value;
}

/**
 * Hàm format các giá trị date
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatDate(value) {
    if (!value) return null;
    // let year = value.substring(0,4)
    // let month = value.substring(5,7)
    // let day = value.substring(8,10)
    // return day + "/" + month + "/" + year;
    let rs = new Date(value)
    // rs = rs.toLocaleDateString()
    let day = rs.getDate()
    let month = rs.getMonth() + 1
    let year = rs.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    rs = day + '/' + month + '/' + year
    return rs;
}

/**
 * Hàm format date cho input type date
 * Author: NMTuan (07/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatDateInput(value) {
    if (!value) return null;
    let rs = new Date(value)
    let day = rs.getDate()
    let month = rs.getMonth() + 1
    let year = rs.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;

    rs = year + '-' + month + '-' + day
    return rs;
}

/**
 * Hàm format tình trạng làm việc (WorkStatus)
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatWorkStatus(value) {
    if (value == 1) return "Đang làm việc"
    else if (value == 0) return "Đã nghỉ việc"
    return null;
}

/**
 * Hàm format giá trị tiền tệ
 * Author: NMTuan (05/07/2021)
 * @param {*} value 
 * @returns 
 */
function formatMoney(value) {
    if (!value) return null;
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
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
 * Hàm format các giá trị bind vào form
 * @param {*} value 
 * @param {*} fieldType 
 */
function formatDataInput(value, fieldType) {
    if (fieldType == "Date") {
        value = formatDateInput(value)
    } else if (fieldType == "Money") {
        value = formatMoney(value)
    }
    return value
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

export {formatCell, formatData, formatDataInput, removeAccents}
