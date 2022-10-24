import { IFeishuKey } from './interface';
/**
 * 自建应用获取 tenant_access_token
 * tenant_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
 */
export declare const getTenantToken: ({ appId, appSecret }: IFeishuKey) => Promise<{
    tenant_access_token: any;
    expire: any;
}>;
/**
 * 自建应用获取 app_access_token
 * app_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
 */
export declare const getAppAccessToken: ({ appId, appSecret }: IFeishuKey) => Promise<{
    app_access_token: any;
    expire: any;
}>;
