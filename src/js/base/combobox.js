// Xử lý các affect của dropdown
import {removeAccents} from '../../js/common/format'
var $ = require('jquery')

$.fn.getValue = function () {
    let text = $(this).find('input').val()
    $(this).find('.combo-box__item').each((index, item) => {
        if($(item).data('text') == text ) {
            let value = $(item).data('value')
            $(this).data('value', value)
        }
    })
    return $(this).data('value')
}

$.fn.getText = function () {
    let text = $(this).find('input').val()
    $(this).find('.combo-box__item').each((index, item) => {
        if($(item).data('text') == text ) {
            let text = $(item).data('text')
            $(this).data('text', text)
        }
    })
    return $(this).data('text')
}

/**
 * Method ẩn, hiện collapse combo-box
 * Author: NMTuan (07/07/2021)
 * @param {element} el 
 */
export function toggleFade(el) {
    $('.combo-box').not(el).find('.collapse').fadeOut()
    $(el).find('.collapse').fadeToggle()
    $(el).find('.combo-box__icon').toggleClass('rotate')
    // detectSelectDropdownItem()
    firstItem(el)
}

/**
 * Hàm hiện combo-box collaspe
 * Author: NMTuan (07/07/2021)
 * @param {element} el element combobox input
 */
export function collapseFadeIn(el) {
    $('.combo-box').not(el).find('.collapse').fadeOut()
    $(el).find('.collapse').fadeIn()
    $(el).find('.combo-box__icon').addClass('rotate')
    // detectSelectDropdownItem()
    firstItem(el)
}

/**
 * Hàm ẩn collapse
 * @param {element} el element combobox 
 */
export function collapseFadeOut(el) {
    $(el).find('.collapse').fadeOut()
    $(el).find('.combo-box__icon').removeClass('rotate')
}

/**
 * Method lựa chọn dropdown item được chọn
 * Author: NMTuan (07/07/2021)
 * @param {element} el 
 */
export function selectItem(el) {
    let combobox = $(el).closest('.combo-box')
    let itemSelected = $(el).text();
    combobox.find('.value').val(itemSelected)
    addDataToCombobox(el)
}

/**
 * Method xác định dropdown item đã được chọn
 * Author: NMTuan (07/07/2021)
 */
export function detectSelectDropdownItem() {
    let dropdown = $(".combo-box");
    for (let i = 0; i < dropdown.length; i++) {
        let value = $(dropdown[i]).find('.value');
        let items = $(dropdown[i]).find('.combo-box__item');
        for (let j = 0; j < items.length; j++) {
            let item = items[j]
            if ($(item).text().trim() == $(value).val().trim()) {
                $(item).addClass('combo-box__item--selected')
            } else {
                $(item).removeClass('combo-box__item--selected')
            }
        }

    }
}

/**
 * Hàm xác đinh items phù hợp, autocomplete
 * Author: NMTuan (07/07/2021)
 */
export function detectItemMatched(el) {
    let items = $(el).find('.combo-box__item')
    let value = $(el).find('.value').val()
    value = removeAccents(value)
    value = value.toLowerCase()
    $(items).each((index, item) => {
        let text = $(item).text()
        text = removeAccents(text)
        text = text.toLowerCase()
        if (text.includes(value)) {
            $(item).removeClass('combo-box__item--hide')
            $(item).addClass('combo-box__item--show')
        } else {
            $(item).addClass('combo-box__item--hide')
            $(item).removeClass('combo-box__item--show')
        }
    })
}

/**
 * Hàm load dữ liệu vào combobox
 * Author: NMTuan (11/07/2021)
 * @param {json} response dữ liệu load từ api
 * @param {element} target combobox cần load
 * @param {string} name tên trường cần hiển thị lên combobox-item
 * @param {string} id id của item
 */
export function bindCollapse(response, target, name, id){
    response.map((item) => {
        let el = $(`<div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left" aria-hidden="true"></i>${ item[name] }</div>`)
            .appendTo($(target).find('.collapse'))
        for (var key in item) {
            el.data(key, item[key])
        }
    })
    addDataToItem(target, id)

}

/**
 * Hàm lưu data cho các item
 * Author: NMTuan (11/07/2021)
 * @param {element} el combobox-item
 */
export function addDataToItem(el, id){
    $(el).find('.combo-box__item').each((index, item) => {
        let value = $(item).data(id)
        let text = $(item).text()
        $(item).data('value', value)
        $(item).data('text', text)
    })
}

/**
 * Hàm lưu data cho mọi combobox
 * Author: NMTuan (11/07/2021)
 */
export function addDataToAllItem() {
    $('.combo-box').each((combobox) => {
        $(combobox).find('.combo-box__item').each((index, item) => {
            let value = $(item).attr('itemId')
            let text = $(item).attr('value')
            $(item).data('value', value)
            $(item).data('text', text)
        })
    })
}

/**
 * Hàm lưu data cho combobox khi chọn 1 item
 * Author: NMTuan (11/07/2021)
 * @param {element} el combobox-item
 */
export function addDataToCombobox(el) {
    let combobox = $(el).closest('.combo-box')
    combobox.attr('val', $(el).attr('val'))
    combobox.attr('text', $(el).text())
}

/**
 * Hàm chuyển focus lên combobox-item đầu tiên
 * Author: NMTuan (11/07/2021)
 * @param {element} el combobox
 */
export function firstItem(el){
    $(el).find('.combo-box__item').removeClass('combo-box__item--focus')
    $(el).find('.combo-box__item--show').first().addClass('combo-box__item--focus')
}

/**
 * Hàm chuyển focus xuống combobox item cuối cùng
 * Auhtor: NMTuan (11/07/2021)
 * @param {element} el combobox
 */
export function lastItem(el){
    $(el).find('.combo-box__item--show').removeClass('combo-box__item--focus')
    $(el).find('.combo-box__item--show').last().addClass('combo-box__item--focus')
}

/**
 * Hàm chuyển sang item tiếp theo
 * Author: NMTuan (11/07/2021)
 * @param {element} el combobox
 * @returns 
 */
export function nextItem(el) {
    let current = $(el).find('.combo-box__item--focus').first()
    let next = $(current).nextAll('.combo-box__item--show').first()

    if (next.length == 0) {
        firstItem(el)
        return;
    }
    $(current).removeClass('combo-box__item--focus')
    $(next).addClass('combo-box__item--focus')
}

/**
 * Hàm lùi về combobox item trước
 * Author: NMTuan (11/07/2021)
 * @param {element} el combobox
 * @returns 
 */
export function prevItem(el) {
    let current = $(el).find('.combo-box__item--focus').first()
    let prev = $(current).prevAll('.combo-box__item--show').first()
    if (prev.length == 0) {
        lastItem(el)
        return;
    }
    $(current).removeClass('combo-box__item--focus')
    $(prev).addClass('combo-box__item--focus')
}

/**
 * Hàm kiểm tra giá trị có tồn tại trong combobox
 * @param {element} el combobox
 */
export function checkItemExist(el) {
    let text = $(el).find('input').val().trim()
    let rs = false;
    $(el).find('.combo-box__item').each((index, item) => {
        if ( $(item).text().trim() == text ) {
            rs = true
            $(el).removeClass('combo-box--error')
            $(el).attr('title', '')
        }
    })
    setTimeout(()=>{
        if (rs == false) {
            $(el).addClass('combo-box--error')
            $(el).attr('title', 'Không tồn tại giá trị')
        }
    }, 300)
    
}


/**
 * Hàm ẩn dropdown khi click ra ngoài
 * Author: NMTuan (07/07/2021)
 * @param {event} event 
 */
// document.onclick = function (event) {
//     if ($('.combo-box').has(event.target).length === 0 && !$('.combo-box').is(event.target)) {
//         var comboBoxs = document.querySelectorAll('.combo-box .collapse')
//         var icon = document.querySelectorAll('.combo-box .combo-box__icon')
//         var i;
//         for (i = 0; i < comboBoxs.length; i++) {
//             var openDropdown = comboBoxs[i];
//             if ($(openDropdown).css('display') == 'block') {
//                 $(icon).removeClass('rotate')
//                 $(openDropdown).fadeOut();
//             }
//         }
//     }
// }
