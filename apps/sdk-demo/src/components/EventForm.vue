<template>
    <view class="form">
        <template v-if="method === 'getSystemResource'">
            <view class="form-item">
                max：
                <input type="number" v-model="form.max" />
            </view>
            <view class="form-item">
                type：
                <input v-model="form.type" />
            </view>
        </template>
        <template v-if="method === 'pushContent'">
            <view class="form-item">
                id：
                <input v-model="form.id" />
            </view>
            <view class="form-item">
                series：
                <input v-model="form.series" />
            </view>
            <view class="form-item">
                content_link：
                <input v-model="form.content_link" />
            </view>
        </template>
        <template v-if="method === 'pushMpUser'">
            <view class="form-item">
                mp_user_id：
                <input v-model="form.mp_user_id" />
            </view>
        </template>
        <template v-if="method === 'pushCategoryList'">
            <view class="form-item">
                id：
                <input v-model="form.id" />
            </view>
        </template>
        <template v-if="method === 'pushBuildinApp'">
            <view class="form-item">
                buildin_app_id：
                <input v-model="form.buildin_app_id" />
            </view>
            <view class="form-item">
                app_type：
                <input v-model="form.app_type" />
            </view>
        </template>
        <template v-if="method === 'pushWXMiniApp'">
            <view class="form-item">
                miniapp_id：
                <input v-model="form.miniapp_id" />
            </view>
            <view class="form-item">
                miniapp_origin_id：
                <input v-model="form.miniapp_origin_id" />
            </view>
            <view class="form-item">
                miniapp_url：
                <input v-model="form.miniapp_url" />
            </view>
        </template>
        <template v-if="method === 'share'">
            <view class="form-item">
                url：
                <input v-model="form.url" />
            </view>
            <view class="form-item">
                title：
                <input v-model="form.title" />
            </view>
            <view class="form-item">
                desc：
                <input v-model="form.desc" />
            </view>
            <view class="form-item">
                thumb：
                <input v-model="form.thumb" />
            </view>
        </template>
    </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type PropsType = {
    value: any
    method: string
}

const props = defineProps<PropsType>()
const emits = defineEmits(['update:value'])

const form = computed({
    get() {
        return props.value
    },
    set(value) {
        emits('update:value', value)
    }
})
</script>

<style scoped>
.form {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 10px;
    margin: 10px 0;

    .form-item {
        font-size: 12px;
    }

    input {
        background-color: #fff;
    }
}
</style>
