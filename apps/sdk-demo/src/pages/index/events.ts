export default [
  {
    label: "获取用户信息",
    method: "getUserInfo",
  },
  {
    label: "获取当前站点信息",
    method: "getSiteInfo",
  },
  {
    label: "获取系统资源",
    method: "getSystemResource",
    input: "{ type: image/video, max: 上限 }",
    output: "{ data: [{ url: 视频/图片本地资源地址 }] }",
    params: { max: 1, type: "image" },
  },
  {
    label: "跳转登录页",
    method: "login",
  },
  {
    label: "跳转稿件详情页面",
    method: "pushContent",
    input: "{ id: xxx, series: imagetext/video/svideo, content_link: xxx }",
    params: { id: "", series: "imagetext", content_link: "" },
  },
  {
    label: "跳转公众号应用主页",
    method: "pushMpHome",
  },
  {
    label: "跳转公众号个人主页",
    method: "pushMpUser",
    input: "{ mp_user_id: xxx }",
    params: { mp_user_id: "" },
  },
  {
    label: "跳转任务中心",
    method: "pushTaskCenter",
  },
  {
    label: "打开用户协议",
    method: "pushUserAgreement",
  },
  {
    label: "打开隐私协议",
    method: "pushPrivacyNotice",
  },
  {
    label: "跳转频道",
    method: "pushCategoryList",
    input: "{ id: xxx }",
    params: { id: "" },
    format: (res: any) => ({ content: res }),
  },
  {
    label: "跳转 APP 应用",
    method: "pushBuildinApp",
    input: '{ buildin_app_id: "naoce", app_type: "buildin_app" }',
    params: { buildin_app_id: "naoce", app_type: "buildin_app" },
    format: (res: any) => ({ content: res }),
  },
  {
    label: "跳转微信小程序",
    method: "pushWXMiniApp",
    input: '{ miniapp_id: "", miniapp_origin_id: "", miniapp_url: "" }',
    params: { miniapp_id: "", miniapp_origin_id: "", miniapp_url: "" },
  },
  {
    label: "获取地理位置信息",
    method: "getLocationInfo",
    output:
      '{ latitude: "xxx.xxx", state: "true/false", longitude: "xxx.xxx" }',
  },
  {
    label: "录音",
    method: "openRecordAudio",
    output: '{ url: "xxx", state: "true/false" }',
  },
  {
    label: "更新用户信息",
    method: "updateUser",
  },
  {
    label: "第三方分享",
    method: "share",
    input:
      '{ url: "分享链接", title: "标题", description: "描述", thumb: "封面" }',
    params: {
      url: "",
      title: "",
      desc: "",
      thumb: "",
    },
  },
];
