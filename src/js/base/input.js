var $ = require('jquery')

/**
 * Hàm xử lí ẩn hiện clear button
 * @param {element} element base input
 */
export function showClearIcon(el) {
    if($(el).find('input').val() != ""){
        $(el).find('.icon-right').show()
    } else {
        $(el).find('.icon-right').hide()
    }
}