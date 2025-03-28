import type { CmstopCallbackResult, CmstopCallbacks } from "../types/api-types";
import type { ConfigOptions, CmstopUniPlugin } from "../types/sdk-types";
import { SDK_EVENT_KEYS } from "./constants/event-keys";

class CmstopUniSdk {
  private c?: ConfigOptions = { debug: false, jsApiList: [] };
  private plugin!: CmstopUniPlugin;
  private state: 0 | 1 | 2 | 3 = 0;

  constructor() {
    try {
      // @ts-ignore
      this.plugin = uni.requireNativePlugin("UniSdkModule");
      this.state = 1;
    } catch (e) {
      this.state = 3;
      // @ts-ignore
      uni.showToast({ title: "挂载失败", duration: 1500 });
    }
  }

  config(options: ConfigOptions) {
    try {
      this.c = options;
      if (this.state === 3) {
        this.log("CmsTopSdk init error", "error");
        return;
      }
      this.state = 2;
      this.log("CmsTopSdk initialized Success");
    } catch (e) {
      this.log("CmsTopSdk initialized failed", "error");
    }
  }

  getState() {
    return this.state;
  }

  invoke(key: string, params: any, callbacks?: CmstopCallbacks) {
    if (this.state !== 2) {
      callbacks?.fail?.("sdk not config success~");
      this.log("CmsTopSdk initialized", "error");
      return;
    }

    try {
      this.plugin.asyncFunc({ key, params }, (res: CmstopCallbackResult) => {
        if (!res.code) {
          callbacks?.success?.(res);
          return;
        }
        res.code === 0
          ? callbacks?.success?.(res.data || `Method ${key} exec success`)
          : callbacks?.fail?.(
              res.message || `Method ${key} exec fail with no reason`
            );
        callbacks?.complete?.(res);
        this.log("CmsTopSdk getMessage");
      });
    } catch (e: any) {
      callbacks?.fail?.(e.message);
      callbacks?.complete?.(e.message);
      this.log("CmsTopSdk initialized", "error");
    }
  }

  private log(msg: string, type: string = "info") {
    if (this.c?.debug) {
      // @ts-ignore
      uni.showModal({
        title: type,
        content: msg,
      });
    }
  }
}

// 事件方法动态注册
SDK_EVENT_KEYS.forEach((key) => {
  // @ts-ignore
  CmstopUniSdk.prototype[key] = function (
    params: any,
    callbacks?: CmstopCallbacks
  ) {
    this.invoke(key, params, callbacks);
  };
});

export function createUniSdk() {
  if ((globalThis as any).cmstopSdk) return;
  (globalThis as any).cmstopSdk = new CmstopUniSdk();
}
