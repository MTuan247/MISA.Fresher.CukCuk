var $ = require('jquery')

/**
 * Hàm format tiền khi nhập vào input
 * Author: NMTuan (06/07/2021) 
 */
 export function formatMoneyOnChange(){
    $('#salary').on('input',function() {
        let value = $(this).val()
        value = value.replaceAll('.','')
        value = value.replaceAll(',','')
        value = Number(value).toLocaleString('it-IT');
        $(this).val(value)
    })

}

/**
 * Hàm kiểm tra form có trường không hợp lệ k
 * Author: NMTuan (08/07/2021)
 * @returns boolean form có hợp lệ
 */
 export function checkFormValid(el){
    let rs = true
    $(el).find('.form__field-input').each((index, item) => {
        $(item).trigger('focusout')
        if($(item).find('input').hasClass('field--error')){
            rs = false
            return false
        }    
    })
    return rs
}

export function resetForm(el) {
    $(el).find('.form__field-input').find('input').val("")
}