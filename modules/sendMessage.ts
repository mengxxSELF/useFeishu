import axios from "axios";
import { PrivateMessagePath, MessagePath } from "../config/feishu";
import { v4 as uuidv4 } from "uuid";

/**
 * 指定用户或者会话发送消息发送消息
 * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/message/create
 */
export const sendMessage = async ({
  receive_id_type,
  receive_id,
  content,
  msg_type = "text",
  tenant_access_token,
}: any) => {
  return await axios(`${MessagePath}?receive_id_type=${receive_id_type}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tenant_access_token}`,
    },
    data: {
      receive_id,
      msg_type: msg_type,
      content,
      uuid: uuidv4().slice(0, 50),
    },
  });
};

/**
 * 发送仅特定人可见的消息卡片
 * -- 用于机器人在群会话中发送仅指定用户可见的消息卡片。卡片上将展示"仅对你可见"标识
 * https://open.feishu.cn/document/ukTMukTMukTM/uETOyYjLxkjM24SM5IjN
 */
export const sendPrivateMessage = async ({
  tenant_access_token,
  chat_id,
  open_id,
  user_id,
  email,
  card,
}: any) => {
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
