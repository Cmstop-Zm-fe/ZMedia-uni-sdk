import { CmstopCallbackResult } from "./api-types";

// SDK核心类型定义
export type ConfigOptions = {
  ext?: any;
  debug: boolean;
  jsApiList: string[];
};

export interface CmstopUniPlugin {
  // 基础通信(ios & android)
  asyncFunc(
    data: { key: string; params: any },
    callback: (result: any) => void
  ): void;
  // Harmony 通信
  syncFuncHarmony(data: { key: string; params: any }): CmstopCallbackResult;
}
