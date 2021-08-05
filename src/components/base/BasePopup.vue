<template>
    <div class="popup__background" v-if="isShow">
        <div class="popup" :class="classType" >
            <div class="popup__header">
                <div class="popup__title">{{title}}</div>
                <div class="popup__close" @click="closePopup" ></div>
            </div>
            <div class="popup__body">
                <div class="popup__icon">
                    <img :src="imgType" alt="">
                </div>
                <div class="popup__content">
                    {{message}}
                </div>
            </div>
            <div class="popup__footer">
                <div class="btn-seconds cancel" @click="closePopup" >Hủy</div>
                <div class="btn-default confirm" @click="confirmPopup" >{{confirm}}</div>
            </div>
        </div>
    </div>   
</template>

<script>
    export default {
        name: 'BasePopup',
        props: {
            type: {
                default: 'alarm'
            },

            title: {
                default: ''
            },

            message: {
                default: ''
            },

            callback: {
                type: Function,
                default: function () {
                }
            },

            confirm: {
                default: 'Xác nhận'
            },

            isShow: {
                default: false
            }
        },
        computed: {
            classType() {
                let classType = 'popup--' + this.type
                return classType
            },

            imgType() {
                let src = '/assets/icon/' + this.type + '.png'
                return src
            }
        },
        methods: {
            closePopup() {
                this.$parent.popup = { isShow: false }
            },

            confirmPopup() {
                this.callback()
                this.closePopup()
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/popup.css'
</style>