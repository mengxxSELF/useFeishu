import axios from "axios";
import { TenantTokenPath, AppAccessTokenPath } from "../config/feishu";
import { IFeishuKey } from './interface'

/**
 * 自建应用获取 tenant_access_token
 * tenant_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
 */
export const getTenantToken = async ({ appId, appSecret }: IFeishuKey) => {
  const { data } = await axios(TenantTokenPath, {
    method: "POST",
    data: {
      app_id: appId,
      app_secret: appSecret,
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const { code, tenant_access_token, expire } = data;
  if (code === 0) return { tenant_access_token, expire };
  throw new TypeError(data);
};

/**
 * 自建应用获取 app_access_token
 * app_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
 */
export const getAppAccessToken = async ({ appId, appSecret }: IFeishuKey) => {
  const { data } = await axios(AppAccessTokenPath, {
    method: "POST",
    data: {
      app_id: appId,
      app_secret: appSecret,
    },
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
  const { code, app_access_token, expire } = data;
  if (code === 0) return { app_access_token, expire };
  throw new TypeError(data);
};
