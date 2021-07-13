<template>
    <div :data-type="dataType" :id="id" class="combo-box" :class="comboboxClass" tabindex="0">
        <input type="text" class="value combo-box__text" :value="placeholder" />
        <i class="fa fa-angle-down combo-box__icon" @click="iconClickEvent" aria-hidden="true"></i>
        <div class="collapse">
            <!-- <div class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left" aria-hidden="true"></i>Tất cả phòng ban</div> -->
            <div v-for="item in extraData" :key='item.title' class="combo-box__item combo-box__item--show"><i class="fa fa-check icon-left" aria-hidden="true"></i>{{ item.title }}</div>
        </div>
    </div>
</template>

<script>
    import {toggleFade, bindCollapse, selectItem, collapseFadeOut, detectItemMatched, collapseFadeIn, checkItemExist, nextItem, prevItem} from '../../js/base/combobox'
    import axios from 'axios'
    var $ = require('jquery')
    export default {
        name: 'BaseCombobox',
        props: ['dataType', 'id', 'comboboxClass', 'placeholder', 'api', 'fieldName', 'fieldId', 'extraData'],
        mounted: function() {
            if(this.api) {
                axios.get(this.api)
                .then((response) => {
                    bindCollapse(response.data, this.$el, this.fieldName, this.fieldId)
                    this.initEvents()
                })
            } else {
                this.initEvents()
            }
        },
        methods: {
            iconClickEvent() {
                $(this.$el).find('.combo-box__item').addClass('combo-box__item--show')
                $(this.$el).find('.combo-box__item').removeClass('combo-box__item--hide')
                toggleFade(this.$el)
            },

            /**
             * Hàm xử lí các event
             * Author: NMTuan (13/07/2021)
             */
            initEvents() {
                $(this.$el).on('click', '.combo-box__item', function () {
                    selectItem(this)
                    collapseFadeOut($(this).closest('.combo-box'))
                });

                $(this.$el).on('input', '.value', function () {
                    detectItemMatched($(this).parent())
                })

                $(this.$el).find('input').focus(function(){
                    collapseFadeIn($(this).parent())
                    $(this).parent().addClass('combo-box--focus')
                })

                $(this.$el).find('input').focusout(function(){
                    $(this).parent().removeClass('combo-box--focus')
                    checkItemExist($(this).parent())
                })

                $(this.$el).keydown(function(e){
                    if (e.which == 38) { //up
                        prevItem(this)
                        return false;
                    }
                    if (e.which == 40) { //down
                        nextItem(this)
                        return false;
                    }
                });

                $(this.$el).keydown(function (e) {
                    let combobox = $(this)
                    if (e.code == "Enter") {
                        if (combobox.find('.collapse').css('display') == 'none') {
                            toggleFade(combobox)
                        } else {
                            let focusedItem = combobox.find('.combo-box__item--focus')
                            selectItem(focusedItem)
                            toggleFade(combobox)
                        }
                    }
                });
            }
        }
    }
</script>

<style scoped>
@import '../../css/base/combo-box.css';
</style>