var $ = require('jquery')

/**
 * Hàm kiểm tra input và trả về thông báo
 * Author: NMTuan (06/07/2021)
 * Update: (09/07/2021)
 * @param {element} el 
 * @returns 
 */
export function validateMessage(el) {
    
    let input = $(el).find('input');
    let value = $(el).find('input').val()
    if($(input).attr('required')) {
        if(!value) {
            $(input).addClass('field--error')
            return "Không được để trống"
        }
    }
    if($(input).attr('type') == 'email') {
        //eslint-disable-next-line
        const emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailPattern.test(value)) {
            $(input).addClass('field--error')
            return "Email k đúng đinh dạng"
        }
    }

    $(input).removeClass('field--error')
    return ""
    
}


/**
 * Hàm xử lý khi có thông báo
 * Author: NMTuan (06/07/2021)
 * @param {element} el 
 */
export function validateInput(el) {
    let message = validateMessage(el);
    if (message != "") {
        let inputWarning = $(el).find('.input-warning')
        fadeInMessage(inputWarning, message)
    }
}


/**
 * Hàm xử lý hiện message
 * Author: NMTuan (06/07/2021)
 * @param {element} el 
 * @param {string} message 
 */
export function fadeInMessage(el, message) {
    $(el).find('span').text(message)
    $(el).css('display', 'flex')
    $(el).fadeOut(3000)
}

/**
 * Hàm kiểm tra kí tự vừa nhập có phải là số
 * Author: NMTuan (08/07/2021)
 * @param {event} e 
 * @returns 
 */
export function isNumber(e) {
    var charCode = (e.which) ? (e.which) : (e.keyCode)
    if ( charCode > 31 && (charCode > 57 || charCode < 48)) {
        return false;
    }
    return true;
}