import axios from 'axios';
import { v4 } from 'uuid';

const MessagePath = "https://open.feishu.cn/open-apis/im/v1/messages";
const AppAccessTokenPath = "https://open.feishu.cn/open-apis/auth/v3/app_access_token/internal";
const TenantTokenPath = "https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal";
const PrivateMessagePath = "https://open.feishu.cn/open-apis/ephemeral/v1/send";
// 图片相关
const UploadImgPath = "https://open.feishu.cn/open-apis/im/v1/images";

/**
 * 自建应用获取 tenant_access_token
 * tenant_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/tenant_access_token_internal
 */
const getTenantToken = async ({ appId, appSecret }) => {
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
    if (code === 0)
        return { tenant_access_token, expire };
    throw new TypeError(data);
};
/**
 * 自建应用获取 app_access_token
 * app_access_token 的最大有效期是 2 小时
 * https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal
 */
const getAppAccessToken = async ({ appId, appSecret }) => {
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
    if (code === 0)
        return { app_access_token, expire };
    throw new TypeError(data);
};

/**
 * 指定用户或者会话发送消息发送消息
 * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
 */
const sendMessage = async ({ receive_id_type, receive_id, content, msg_type = "text", tenant_access_token, }) => {
    return await axios(`${MessagePath}?receive_id_type=${receive_id_type}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tenant_access_token}`,
        },
        data: {
            receive_id,
            msg_type: msg_type,
            content,
            uuid: v4().slice(0, 50),
        },
    });
};
/**
 * 发送仅特定人可见的消息卡片
 * -- 用于机器人在群会话中发送仅指定用户可见的消息卡片。卡片上将展示"仅对你可见"标识
 * https://open.feishu.cn/document/ukTMukTMukTM/uETOyYjLxkjM24SM5IjN
 */
const sendPrivateMessage = async ({ tenant_access_token, chat_id, open_id, user_id, email, card, }) => {
    await axios(PrivateMessagePath, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tenant_access_token}`,
            "Content-Type": "application/json; charset=utf-8",
        },
        data: {
            msg_type: "interactive",
            chat_id,
            open_id,
            user_id,
            email,
            card,
        },
    });
};

/**
 * 上传图片
 * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create
 */
const uploadImg = async ({ image, image_type = "message", tenant_access_token, }) => {
    return await axios(UploadImgPath, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${tenant_access_token}`,
        },
        data: {
            image_type,
            image,
        },
    });
};

class UseFeishu {
    appId;
    appSecret;
    TenantAccessToken;
    AppAccessToken;
    constructor(appId, appSecret) {
        this.appId = appId;
        this.appSecret = appSecret;
        this.TenantAccessToken = "";
        this.AppAccessToken = "";
    }
    async getTenantAccessToken() {
        const { tenant_access_token, expire } = await getTenantToken({
            appId: this.appId,
            appSecret: this.appSecret,
        });
        this.TenantAccessToken = tenant_access_token;
        return { tenant_access_token, expire };
    }
    async getAppAccessToken() {
        const { app_access_token, expire } = await getAppAccessToken({
            appId: this.appId,
            appSecret: this.appSecret,
        });
        this.AppAccessToken = app_access_token;
        return { app_access_token: this.AppAccessToken, expire };
    }
    async sendMessage({ receive_id_type, receive_id, content, msg_type, }) {
        if (!this.TenantAccessToken) {
            await this.getTenantAccessToken();
        }
        return await sendMessage({
            receive_id_type,
            receive_id,
            content,
            msg_type,
            tenant_access_token: this.TenantAccessToken,
        });
    }
    async sendPrivateMessage({ chat_id, open_id, user_id, email, card, }) {
        if (!this.TenantAccessToken) {
            await this.getTenantAccessToken();
        }
        return await sendPrivateMessage({
            tenant_access_token: this.TenantAccessToken,
            chat_id,
            open_id,
            user_id,
            email,
            card,
        });
    }
    async uploadImg({ image, image_type }) {
        if (!this.TenantAccessToken) {
            await this.getTenantAccessToken();
        }
        return await uploadImg({
            tenant_access_token: this.TenantAccessToken,
            image,
            image_type,
        });
    }
}

export { UseFeishu as default };
