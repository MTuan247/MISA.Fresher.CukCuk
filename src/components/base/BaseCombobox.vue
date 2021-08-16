<template>
    <div 
        :data-type="dataType" 
        :id="id" class="combo-box" 
        :class="[comboboxClass, {'combo-box--focus' : isFocus, 'combo-box--error' : !isValid,  'combo-box--up' : direction == 'up'}]" 
        @keydown.up="pressUpEvent"
        @keydown.down="pressDownEvent"
        @keydown.enter="pressEnterEvent"
        @keydown.tab="pressTabEvent"
    >
        
        <input 
            ref="input"
            type="text" 
            class="value combo-box__text" 
            v-model="text"
            :placeholder="placeholder" 
            :disabled="isDisabled"
            @input="inputEvent"
            @focus="inputFocusEvent"
            @focusout="inputFocusoutEvent"
        />

        <i :class="{rotate: isShow}" class="fa fa-angle-down combo-box__icon" @click="iconClickEvent" aria-hidden="true"></i>
        
        <div class="collapse" ref="collapse" v-show="isShow" >

            <div
                v-for="(item, index) in data" 
                :key='item[fieldId]'
                :ref='index'
                :class="{ 'combo-box__item--selected' : index == selectedIndex, 'combo-box__item--focus' : index == focusIndex }"
                v-show="item['isShow']"
                class="combo-box__item"
                @click="itemClickEvent(item[fieldId], item[fieldName], index)"
            >
                <i class="fa fa-check icon-left" aria-hidden="true"></i>{{ item[fieldName] }}
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import { removeAccents } from '../../js/common/format'

    export default {
        name: 'BaseCombobox',
        props: {
            dataType: {
                default: ''
            },
            id: {
                default: ''
            },
            comboboxClass: {
                default: ''
            },
            placeholder: {
                default: ''
            },
            api: {
                default: null
            },
            fieldName: {
                default: null,
            },
            fieldId: {
                default: null,
            },
            extraData: {
                default() {
                    return []
                }
            },
            defaultSelect: {
                default: -1,
            },
            value: {
                default: ''
            },
            isDisabled: {
                default: false
            },
            direction: {
                default: 'down'
            }
        },

        data() {
            return {
                text: this.value,
                val: '',
                isShow: false,
                isFocus: false,
                isValid: true,
                data: [],
                focusIndex: 0,
                selectedIndex: this.defaultSelect,
                showIndexs: [],

            }
        },
        watch:{
            value: function(value) {
                this.text = value
            },
        },
        created() {
            this.extraData.forEach(item => {
                let object = []
                object[this.fieldName] = item.title
                object[this.fieldId] = item.val
                object['isShow'] = true
                this.data.push(object)
            });

            if(this.api) {
                axios.get(this.api)
                .then((response) => {
                    this.data.push(...response.data)
                }).then(() => {
                    this.data.forEach(item => {
                        item['isShow'] = true
                    })
                })
            }
        },
        mounted () {
            document.addEventListener('click', this.clickOutside)
        },
        beforeDestroy () {
            document.removeEventListener('click',this.clickOutside)
        },
        methods: {

            /**
             * Method xử lý khi click vào dropdown icon
             * @author: NMTuan (21/7/2021)
             */
            iconClickEvent() {
                if(this.isShow) {
                    this.isShow = false;
                    return;
                }

                this.data.forEach(item => {
                    item['isShow'] = true
                })
                this.$refs.input.focus()
            },

            /**
             * Method xử lý khi click vào item trong dropdown
             * @author: NMTuan (21/7/2021)
             */
            itemClickEvent(val, text, index) {
                this.val = val
                this.text = text
                this.isShow = false
                this.selectedIndex = index
                this.inputEvent()
            },

            /**
             * Method xử lý khi nhập
             * @author: NMTuan (21/7/2021)
             */
            inputEvent() {
                let text = this.text.trim().toLowerCase()
                text = removeAccents(text)
                this.data.forEach(item => {
                    let itemText = item[this.fieldName].trim().toLowerCase()
                    itemText = removeAccents(itemText)
                    if(!itemText.includes(text)){
                        item['isShow'] = false
                    } else {
                        item['isShow'] = true
                    }
                })
                this.firstItem()
                this.$emit('input', this.text)
                this.$emit('updateValue', this.val)
            },

            /**
             * Method xử lý khi focus vào input
             * @author: NMTuan (21/7/2021)
             */
            inputFocusEvent() {
                this.data.forEach(item => {
                    item['isShow'] = true
                })
                this.isShow = true
                this.isFocus = true
                this.firstItem()
            },

            /**
             * Method khi blur khỏi input
             * @author: NMTuan (21/7/2021)
             */
            inputFocusoutEvent() {
                this.isFocus = false;
                setTimeout(() => {
                    this.checkItemExist(this.text)
                }, 500)
                
            },

            /**
             * Lấy list các item phù hợp giá trị nhập
             * @author: NMTuan (21/7/2021)
             */
            getShowIndexs() {
                this.showIndexs = []
                this.data.forEach((item, index) => {
                    if (item.isShow) {
                        this.showIndexs.push(index)
                    }
                })
            },

            /**
             * Method xử lý khi nhấn xuống
             * @author: NMTuan (21/7/2021)
             */
            pressDownEvent() {
                this.nextItem()
            },

            /**
             * Method xử lý khi nhấn lên
             */
            pressUpEvent() {
                this.prevItem()
            },

            /**
             * Method xử lý khi nhấn enter
             * @author: NMTuan (21/7/2021)
             */
            pressEnterEvent() {
                //Nếu đang đóng dropdown thì show
                if(!this.isShow) {
                    this.inputFocusEvent()
                //Nếu đang mở dropdown
                } else {
                    //Lấy index của item đang focus
                    let index = this.focusIndex
                    //Lấy giá trị item đang focus
                    let val = this.data[index][this.fieldId]
                    //Lấy text của item
                    let text = this.data[index][this.fieldName]
                    //Chọn item
                    this.itemClickEvent(val, text, index)
                }
            },

            /**
             * Method focus vào item đầu tiên
             * @author: NMTuan (21/7/2021)
             */
            firstItem() {
                //Lấy những item đã lọc
                this.getShowIndexs();
                this.focusIndex = this.showIndexs[0];
                this.$nextTick(() => {
                    //Scroll lên đầu
                    this.$refs.collapse.scrollTop = 0;
                })
            },

            /**
             * Method xử lý chuyển đến item tiếp theo
             * @author: NMTuan (21/7/2021)
             */
            nextItem() {
                let index = this.showIndexs.find( number => number > this.focusIndex)
                if(!index) {
                    this.focusIndex = this.showIndexs[0]
                    this.$refs.collapse.scrollTop = 0
                    return
                }
                if (index > 2) {
                    this.$refs.collapse.scrollTop += 40
                }
                this.focusIndex = index
            },

            /**
             * method lùi về item trước
             * @author: NMTuan (21/7/2021)
             */
            prevItem() {
                let index = this.showIndexs.reverse().find( number => number < this.focusIndex);
                this.showIndexs.reverse();
                if(index != undefined) {
                    if (index < this.showIndexs.length - 2) this.$refs.collapse.scrollTop -= 40;
                    this.focusIndex = index;
                    return;
                }
                this.$refs.collapse.scrollTop = this.$refs.collapse.scrollHeight;
                this.focusIndex = this.showIndexs[this.showIndexs.length - 1];
            },
            
            /**
             * Method click ra ngoài component
             * @author: NMTuan (29/07/2021)
             */
            clickOutside (e) {
                if (!this.$el.contains(e.target)) {
                    this.isShow = false
                }
            },

            /**
             * Method xử lý khi nhấn tab
             * @author: NMTuan (29/07/2021)
             */
            pressTabEvent() {
                this.isShow = false
            },

            /**
             * Hàm kiểm tra giá trị trong text có tồn tại k
             * @author: NMTuan (12/08/2021)
             */
            checkItemExist(text) {
                if (!text) return;
                let findItem = this.data.find(item => item[this.fieldName] == text);
                if(!findItem) {
                    this.isValid = false;
                } else {
                    this.isValid = true;
                }
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/combo-box.css';
</style>