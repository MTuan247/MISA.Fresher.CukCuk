<template>
    <div 
        :data-type="dataType" 
        :id="id" class="combo-box" 
        :class="comboboxClass" 
        val=''
        tabindex="0"
        @keydown.up="pressUpEvent"
        @keydown.down="pressDownEvent"
        @keydown.enter="pressEnterEvent"
    >
        
        <input 
            type="text" 
            class="value combo-box__text" 
            :value="placeholder" 
            @input="inputEvent"
            @focus="inputFocusEvent"
            @focusout="inputFocusoutEvent"
        />

        <i class="fa fa-angle-down combo-box__icon" @click="iconClickEvent" aria-hidden="true"></i>
        
        <div class="collapse">

            <div 
                v-for="item in extraData" 
                :key='item.title' 
                :val='item.val'
                class="combo-box__item combo-box__item--show"
                @click="itemClickEvent"
            >
                <i class="fa fa-check icon-left" aria-hidden="true"></i>{{ item.title }}
            </div>

            <div
                v-for="item in data" 
                :key='item[fieldId]'
                :val='item[fieldId]'
                class="combo-box__item combo-box__item--show"
                @click="itemClickEvent"
            >
                <i class="fa fa-check icon-left" aria-hidden="true"></i>{{ item[fieldName] }}
            </div>

        </div>
    </div>
</template>

<script>
    import {toggleFade, selectItem, detectItemMatched, checkItemExist, nextItem, prevItem, collapseFadeOut, collapseFadeIn} from '../../js/base/combobox'
    import axios from 'axios'
    var $ = require('jquery')
    export default {
        name: 'BaseCombobox',
        props: ['dataType', 'id', 'comboboxClass', 'placeholder', 'api', 'fieldName', 'fieldId', 'extraData'],
        data() {
            return {
                text: this.placeholder,
                value: '',
                data: [],
            }
        },
        created() {
            if(this.api) {
                axios.get(this.api)
                .then((response) => {
                    this.data = response.data
                })
            }
        },
        mounted: function() {
        },
        methods: {
            iconClickEvent() {
                $(this.$el).find('.combo-box__item').addClass('combo-box__item--show')
                $(this.$el).find('.combo-box__item').removeClass('combo-box__item--hide')
                toggleFade(this.$el)
            },

            itemClickEvent(event) {
                selectItem(event.target)
                collapseFadeOut($(event.target).closest('.combo-box'))
            },

            inputEvent() {
                detectItemMatched(this.$el)
            },

            inputFocusEvent() {
                collapseFadeIn(this.$el)
                $(this.$el).addClass('combo-box--focus')
            },

            inputFocusoutEvent() {
                $(this.$el).removeClass('combo-box--focus')
                checkItemExist(this.$el)
            },

            pressDownEvent() {
                nextItem(this.$el)
            },

            pressUpEvent() {
                prevItem(this.$el)
            },

            pressEnterEvent() {
                let combobox = $(this.$el)
                if (combobox.find('.collapse').css('display') == 'none') {
                    toggleFade(combobox)
                } else {
                    let focusedItem = combobox.find('.combo-box__item--focus')
                    selectItem(focusedItem)
                    toggleFade(combobox)
                }
            },
        }
    }
</script>

<style scoped>
@import '../../css/base/combo-box.css';
</style>