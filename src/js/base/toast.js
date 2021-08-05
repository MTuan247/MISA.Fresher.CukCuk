import $ from 'jquery'
import EventBus from '../../plugins/eventbus';

export function showErrorToastJQ() {
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

export function showToastJQ(type, message, show = true) {
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

export function showErrorToast() {
    EventBus.$emit('appendToast', {
        type: 'error',
        message: 'Có lỗi xảy ra'
    })
}

export function showToast(type, message) {
    EventBus.$emit('appendToast', {
        type: type,
        message: message
    })
}