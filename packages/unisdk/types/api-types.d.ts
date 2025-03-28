// API接口相关类型定义
export type CmstopCallbackResult = {
  code: number;
  message?: string;
  data: any;
};

export interface CmstopCallbacks {
  success?: (res: any) => void;
  fail?: (res: any) => void;
  complete?: (res: any) => void;
}
