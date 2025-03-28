<script>
import { createUniSdk } from "@cmstops/unisdk";

createUniSdk();

let message;
let plugin;
try {
  globalThis.cmstopSdk.config({
    debug: true,
    jsApiList: [],
  });
} catch (e) {
  message = "UniSdkModule 挂载失败: " + e.message;
}
export default {
  onLaunch: function (options) {
    let data;
    if (typeof options === "object") {
      data = JSON.stringify(
        {
          ...options,
          pluginMount: message,
        },
        null,
        4
      );
    } else {
      data = options;
    }
    uni.setStorageSync("data", data);
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
</style>
