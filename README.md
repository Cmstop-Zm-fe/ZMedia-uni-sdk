# ZMedia-uni-sdk

[![NPM Version](https://img.shields.io/npm/v/@cmstops/unisdk.svg)](https://www.npmjs.com/package/@cmstops/unisdk)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

基于 UniApp 的原生扩展 SDK，提供与客户端通信的能力，支持 Android、iOS 和鸿蒙平台。

> **注意**：目前因为 UniApp 对于鸿蒙版本的支持度不高，所以鸿蒙端暂时只提供跳转相关的功能，获取信息相关功能暂不提供。

## 📑 目录

- [安装](#安装)
- [快速开始](#快速开始)
- [通信原理](#通信原理)
- [API 支持情况](#api-支持情况)
- [API 详细说明](#api-详细说明)
  - [获取用户信息](#获取用户信息)
  - [更新用户信息](#更新用户信息)
  - [获取当前站点信息](#获取当前站点信息)
  - [获取相册内容](#获取相册内容)
  - [跳转稿件详情页面](#跳转稿件详情页面)
  - [跳转公众号应用主页](#跳转公众号应用主页)
  - [跳转公众号个人主页](#跳转公众号个人主页)
  - [跳转任务中心](#跳转任务中心)
  - [跳转用户协议](#跳转用户协议)
  - [跳转隐私协议](#跳转隐私协议)
  - [跳转频道](#跳转频道)
  - [跳转 APP 应用](#跳转-app-应用)
  - [跳转微信小程序](#跳转微信小程序)
  - [获取地理位置信息](#获取地理位置信息)
  - [录音](#录音)
  - [分享](#分享)
- [启动数据](#启动数据)

## 🚀 安装

```bash
npm install @cmstops/unisdk
```

## 🔰 快速开始

### 1. 挂载 SDK

在 App.vue 或 main.js(ts) 中加入以下代码：

```js
import { createUniSdk } from "@cmstops/unisdk";
createUniSdk();
```

### 2. 使用 SDK 方法

```js
globalThis.cmstopSdk.getUserInfo(
  {
    // 该方法实现需要的参数，具体各个方法所需参数可见下方 API 列表
  },
  {
    success: (res) => {
      console.log(res);
    },
    fail: (err) => {
      console.log(err);
    },
    complete: (res) => {
      console.log(res);
    },
  }
);
```

> **提示**：如果环境原因无法使用 npm 包，可以跳转至 [通信原理](#通信原理) 章节，使用原生的写法进行通信（与 SDK 没有区别）。

## 📡 通信原理

基于 UniApp Native Plugin 能力，实现客户端与 UniApp 小程序之间的通信。

在使用 API 之前需要保证 Native Plugin 已经挂载，可以在 App.vue 或 main.js(ts) 中加入以下代码：

```js
plugin = uni.requireNativePlugin("UniSdkModule");
globalThis.cmsSdkPlugin = plugin;
```

使用时可以在全局任何地方通过 `globalThis.cmsSdkPlugin` 来获取插件实例，并调用插件的方法。
目前客户端已实现 asyncFunc 方法，小程序层面调用示例如下：

```js
globalThis.cmsSdkPlugin.asyncFunc(
  {
    key: "getUserInfo",
    params: {
      // 该方法实现需要的参数，具体各个方法所需参数可见下方 API 列表
    },
  },
  (res) => {
    // callback 回调
    console.log(res);
    // 回调参数，数据结构
    /**
     * {
     *  code: number // 0 成功，其他失败
     *  message: string // 错误信息
     *  data: any // 数据
     * }
     */
  }
);
```

## 📊 API 支持情况

| 方法名            | Android | iOS | Harmony |
| ----------------- | :-----: | :-: | :-----: |
| login             |   ✅    | ✅  |   ❌    |
| getUserInfo       |   ✅    | ✅  |   ✅    |
| getSiteInfo       |   ✅    | ❌  |   ❌    |
| getSystemResource |   ✅    | ❌  |   ❌    |
| pushContent       |   ✅    | ✅  |   ✅    |
| pushMpHome        |   ✅    | ✅  |   ❌    |
| pushMpUser        |   ✅    | ✅  |   ❌    |
| pushTaskCenter    |   ✅    | ✅  |   ❌    |
| pushUserAgreement |   ✅    | ✅  |   ✅    |
| pushPrivacyNotice |   ✅    | ✅  |   ✅    |
| pushCategoryList  |   ✅    | ✅  |   ❌    |
| pushBuildinApp    |   ✅    | ✅  |   ❌    |
| pushWXMiniApp     |   ✅    | ✅  |   ❌    |
| getLocationInfo   |   ✅    | ❌  |   ❌    |
| openRecordAudio   |   ✅    | ❌  |   ❌    |
| share             |   ✅    | ✅  |   ❌    |

## 📘 API 详细说明

### 获取用户信息

- **方法名**：`getUserInfo`
- **参数**：无
- **返回**：用户信息对象

```js
{
  refreshToken: String,     // 刷新令牌
  aliasReviewing: Boolean,  // 是否正在审核别名
  followersNum: Number,     // 粉丝数量
  expAt: Number,           // 过期时间
  mp_user_id: String,      // 公众号用户ID
  is_expired: Boolean,     // 是否已过期
  commentCount: Number,    // 评论数量
  user_id: String,         // 用户ID
  signReviewing: Boolean,  // 是否正在审核签名
  tel: String,            // 电话号码
  area_code: String,      // 区域码
  mp_status: Number,      // 公众号状态
  device_id: String,      // 设备ID
  is_follow: Boolean,     // 是否关注
  avatarReviewing: Boolean, // 是否正在审核头像
  avatar: String,         // 头像
  iPushId: String,        // 推送ID
  theme_color: String,    // 主题色
  is_close: Boolean,      // 是否关闭
  contentsNum: Number,    // 内容数量
  alias: String,          // 别名
  language_code: String,  // 语言码
  integral: Number,       // 积分
  state: Number,         // 状态
  fansNum: Number,       // 粉丝数量
  token: String,         // 令牌
  brandIcon: {           // 品牌图标
    // ... 子图标
  },
  starsNum: Number,      // 收藏数量
  showTaskCenter: Boolean, // 是否显示任务中心
  refresh_token: String,  // 刷新令牌
  mpUserId: String,      // 公众号用户ID
  mpStatus: Number,      // 公众号状态
  showDegree: Boolean,   // 是否显示等级
  statusBarHeight: Number, // 状态栏高度
  collectNum: Number     // 收藏数量
}
```

### 更新用户信息

- **方法名**：`updateUser`
- **参数**：无
- **返回**：无

### 获取当前站点信息

- **方法名**：`getSiteInfo`
- **参数**：无
- **返回**：站点信息对象

```js
{
  site_id: String, // 站点ID
  api_url: String, // 前台 API host
  site_name: String, // 站点名称
}
```

### 获取系统资源

- **方法名**：`getSystemResource`
- **参数**：

```js
{
  type: 'image'/'video', // 资源类型（目前仅支持图片和视频）
  max: Number // 上限数量
}
```

- **返回**：

```js
{
  data: [{ url: "视频/图片本地资源地址" }];
}
```

### 跳转稿件详情页面

- **方法名**：`pushContent`
- **参数**：

```js
{
    id: String, // 内容ID
    series: 'imagetext'/'video'/'svideo', // 内容类型
    content_link: String // 内容链接
}
```

### 跳转公众号应用主页

- **方法名**：`pushMpHome`
- **参数**：无

### 跳转公众号个人主页

- **方法名**：`pushMpUser`
- **参数**：

```js
{
  mp_user_id: String; // 公众号用户ID
}
```

### 跳转任务中心

- **方法名**：`pushTaskCenter`
- **参数**：无

### 跳转用户协议

- **方法名**：`pushUserAgreement`
- **参数**：无

### 跳转隐私协议

- **方法名**：`pushPrivacyNotice`
- **参数**：无

### 跳转频道

- **方法名**：`pushCategoryList`
- **参数**：

```js
{
  content: {
    id: String; // 频道ID
  }
}
```

### 跳转 APP 应用

- **方法名**：`pushBuildinApp`
- **参数**：

```js
{
    content: {
      buildin_app_id: String, // 内置应用ID
      app_type: String // 应用类型
    }
}
```

### 跳转微信小程序

- **方法名**：`pushWXMiniApp`
- **参数**：

```js
{
  miniapp_id: String, // 小程序ID
  miniapp_origin_id: String, // 小程序原始ID
  miniapp_url: String // 小程序URL
}
```

### 获取地理位置信息

- **方法名**：`getLocationInfo`
- **参数**：无
- **返回**：

```js
{
    latitude: String, // 纬度
    longitude: String, // 经度
    state: 'true'/'false' // 获取状态
}
```

### 录音

- **方法名**：`openRecordAudio`
- **参数**：无
- **返回**：

```js
{
  url: String, // 录音文件URL
  state: 'true'/'false' // 录音状态
}
```

### 分享

- **方法名**：`share`
- **参数**：

```js
{
  url: String,
  title: String,
  desc: String,
  thumb: String
}
```

## 🚀 启动数据

小程序启动时，客户端会通过 App.vue 的 onLaunch 方法传递启动数据，可将其保存至 storage 便后续使用，如：

```js
export default {
  onLaunch: function (options) {
    let data;
    if (typeof options === "object") {
      data = JSON.stringify(options);
    } else {
      data = options;
    }
    uni.setStorageSync("data", data);
  },
  // ... 其他
};
```

目前启动参数数据结构如下：

```json
{
  "page": "小程序启动页面",
  "query": "小程序启动参数",
  "scene": "小程序启动场景",
  "referrerInfo": {
    "extraData": {
      "refresh_token": "刷新token",
      "token": "token",
      "device_id": "设备ID，即 x-request-id",
      "user_id": "用户ID",
      "mp_user_id": "公众号用户ID",
      "area_code": "区域码",
      "state": "用户状态",
      "language_code": "语言码",
      "darkmode": "是否为夜间模式",
      "mp_status": "公众号用户状态",
      "api_url": "前台 API host",
      "theme_color": "主题色",
      "brandIcon": "导航 icon"
    }
  },
  "channel": "来自频道",
  "launcher": "小程序启动方式"
}
```
