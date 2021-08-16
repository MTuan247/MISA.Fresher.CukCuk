<template>
    <v-combobox
        solo
        clearable
        auto-select-first
        v-model="computedValue"
        :items="data"
    ></v-combobox>
</template>

<script>
import axios from 'axios';
    export default {
        name: "BaseVCombobox",
        props: {
            value: {

            },
            extraData: {
                default() {
                    return []
                }
            },
            api: {
                default: null
            },
            fieldName: {
                default: null,
            },
            fieldValue: {
                default: null,
            },
        },
        computed: {
            computedValue: {
                get: function() {
                    return this.value;
                },
                set: function(value) {
                    this.$emit('input', value)
                },
            }
        },
        data() {
            return {
                data: []
            }
        },
        created() {
            this.data.push(...this.extraData)
            if (this.api) {
                axios.get(this.api)
                .then((response) => {
                    response.data.forEach(item => {
                        let object = {}
                        object['text'] = item[this.fieldName]
                        object['value'] = item[this.fieldValue]
                        this.data.push(object)
                    });
                })
            }
        }
    }
</script>

<style lang="css" scoped>
@import "../../css/base/vcombo-box.css";
</style>