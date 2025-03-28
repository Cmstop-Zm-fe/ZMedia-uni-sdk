declare function createUniSdk(): void;

// API接口相关类型定义
type CmstopCallbackResult = {
  code: number;
  message?: string;
  data: any;
};

interface CmstopCallbacks {
  success?: (res: any) => void;
  fail?: (res: any) => void;
  complete?: (res: any) => void;
}

// SDK核心类型定义
type ConfigOptions = {
  ext?: any;
  debug: boolean;
  jsApiList: string[];
};

interface CmstopUniPlugin {
  // 基础通信(ios & android)
  asyncFunc(
    data: { key: string; params: any },
    callback: (result: any) => void
  ): void;
  // Harmony 通信
  syncFuncHarmony(data: { key: string; params: any }): CmstopCallbackResult;
}

declare const SDK_EVENT_KEYS: readonly ["getUserInfo", "getSiteInfo", "getSystemResource", "login", "pushContent", "pushMpHome", "pushMpUser", "pushTaskCenter", "pushUserAgreement", "pushPrivacyNotice", "pushCategoryList", "pushBuildinApp", "pushWXMiniApp", "getLocationInfo", "openRecordAudio", "updateUser", "share"];

export { type CmstopCallbackResult, type CmstopCallbacks, type CmstopUniPlugin, type ConfigOptions, SDK_EVENT_KEYS, createUniSdk };
