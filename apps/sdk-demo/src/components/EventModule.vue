<template>
    <view class="module">
        <view class="module-header">
            <view class="title"> {{ label }} </view>
            <button @click="handleClick">触发</button>
        </view>
        <view class="message">
            <view>方法名：{{ method }}</view>
            <view class="input" v-if="input">输入：{{ input }}</view>
            <view class="output" v-if="output">期望输出：{{ output }}</view>
        </view>
        <EventForm v-if="params" :method="method" v-model:value="paramsValue" />
        <view v-if="params"> 发送：{{ paramsPreview }} </view>
        <view class="tips">
            <view class="complete" v-if="complete">
                完整返回：
                <pre> {{ complete }} </pre>
            </view>
            <view class="error" v-if="error"> 异常：{{ error.message }} </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import EventForm from './EventForm.vue'

type PropsType = {
    label: string
    method: string
    input: string // 输入
    output: string // 期望输出
    params?: any
    format?: any
}

const props = defineProps<PropsType>()

const success = ref<string>('')
const error = ref<any>('')
const complete = ref<string>('')
const paramsValue = ref<any>(props.params ? JSON.parse(JSON.stringify(props.params)) : {})

const paramsPreview = computed(() => {
    return JSON.stringify(paramsValue.value)
})

function handleClick() {
    const key = props.method

    try {
        const params = props.format ? props.format(paramsValue.value) : paramsValue.value
        globalThis.cmstopSdk[key](params, {
            success: ret => {
                success.value = typeof ret === 'object' ? JSON.stringify(ret, null, 4) : ret
                complete.value = success.value
            },
            fail: err => {
                console.log(err)
            },
            complete: ret => {
                console.log(ret)
            }
        })
    } catch (e) {
        error.value = { message: '异常了' + e.message }
    }
}
</script>

<style scoped>
.module {
    word-break: break-all;

    background-color: aliceblue;
    margin-top: 10px;
    padding: 10px;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;

    .module-header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .title {
            flex: 1;
            font-size: 17px;
            font-weight: bold;
        }

        button {
            font-size: 12px;
            border-radius: 50px;
            border: 1px solid #ccc;
            padding: 0px 20px;
        }
    }

    .message {
        font-size: 14px;
    }

    .tips {
        font-size: 12px;

        pre {
            padding: 15px;
            border-radius: 5px;
            font-family: monospace;
            overflow-x: auto;
        }

        .error {
            color: red;
        }
    }
}
</style>
