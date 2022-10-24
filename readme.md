# 飞书应用SDK封装


## 这是什么

基于飞书接口API基础上，进行封装的SDK，帮助开发者专注单一功能，免于各种token的前置处理

## 安装

```
npm i useFeishu 
```

## 使用

```
import UseFeishu from 'usefeishu';

const useFeishu = new UseFeishu(AppID, AppSecret);

const token = await useFeishu.getTenantAccessToken();

```

## 获取 tenant_access_token

getTenantAccessToken

## 获取 app_access_token

getAppAccessToken

## 发送消息

sendMessage

## 在群聊中私发消息 - 仅接受人可见

sendPrivateMessage