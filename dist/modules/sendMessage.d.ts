/**
   * 指定用户或者会话发送消息发送消息
   * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
   */
export declare const sendMessage: ({ receive_id_type, receive_id, content, msg_type, tenant_access_token }: any) => Promise<import("axios").AxiosResponse<any, any>>;
/**
 * 发送仅特定人可见的消息卡片
 * -- 用于机器人在群会话中发送仅指定用户可见的消息卡片。卡片上将展示"仅对你可见"标识
 * https://open.feishu.cn/document/ukTMukTMukTM/uETOyYjLxkjM24SM5IjN
 */
export declare const sendPrivateMessage: ({ tenant_access_token, chat_id, open_id, user_id, email, card, }: any) => Promise<void>;
