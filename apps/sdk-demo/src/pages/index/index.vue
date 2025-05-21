<template>
  <view class="content">
    <button @click="handleRemove">退出小程序</button>
    <view class="content-launch">
      启动参数: <br />

      <pre> {{ launchOptions }} </pre>
      <view class="launch-tips" v-if="launchTips">
        {{ launchTips }}
      </view>
    </view>
    <template v-for="(item, index) in events" :key="index">
      <EventModule
        :method="item.method"
        :label="item.label"
        :input="item.input"
        :output="item.output"
        :params="item.params"
        :format="item.format"
      />
    </template>
  </view>
</template>
<script>
import EventModule from "../../components/EventModule.vue";
import events from "./events";
export default {
  components: { EventModule },
  data() {
    return {
      events,

      launchOptions: "",
      launchTips: "",
    };
  },
  onLoad() {
    setTimeout(() => {
      try {
        this.launchOptions = uni.getStorageSync("data");
      } catch (e) {
        console.log(e);
        this.launchTips = "获取客户端信息失败";
      }
    }, 1000);
  },
  methods: {
    handleRemove() {
      // #ifdef APP-PLUS
      plus.runtime.quit();
      // #endif
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
  padding: 0 10px;

  box-sizing: border-box;

  .content-launch {
    width: 100%;
    background-color: aliceblue;
    padding: 10px;
    border-radius: 6px;
    box-sizing: border-box;
  }
}

pre {
  padding: 15px;
  border-radius: 5px;
  font-family: monospace;
  overflow-x: auto;
}
</style>
