import $ from 'jquery'

export function showErrorToast() {
    $(`
        <div class="toast toast--error">
            <div class="toast__icon">
                <img src="./assets/icon/error.png" alt="">
            </div>
            <div class="toast__messenger">Có lỗi xảy ra</div>
            <i class="fa fa-times toast__close-icon" aria-hidden="true"  onclick="hideToast($(this).parent())" ></i>
        </div>
    `).appendTo('#app').delay(2000).queue(function() { $(this).remove(); });
}

export function showToast(type, message, show = true) {
    if (!show) return;
    $(`
        <div class="toast toast--${type}">
            <div class="toast__icon">
                <img src="./assets/icon/${type}.png" alt="">
            </div>
            <div class="toast__messenger">${message}</div>
            <i class="fa fa-times toast__close-icon" aria-hidden="true"  onclick="hideToast($(this).parent())" ></i>
        </div>
    `).appendTo('#app').delay(2000).queue(function() { $(this).remove(); });
}

export function hideToast(el) {
    $(el).remove()
}