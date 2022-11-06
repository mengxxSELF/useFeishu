import { AxiosResponse } from "axios";

export interface IToken {
  tenant_access_token?: string;
  app_access_token?: string;
  expire: string;
}

export interface IFeishuKey {
  appId: string;
  appSecret: string;
}

export interface IGetToken {
  getTenantAccessToken: ({ appId, appSecret }: IFeishuKey) => Promise<IToken>;
  getAppAccessToken: ({ appId, appSecret }: IFeishuKey) => Promise<IToken>;
}

export interface ISendMessageParams {
  receive_id_type: string;
  receive_id: string;
  content: string;
  msg_type?: string;
}

export interface ISendPrivateMessageParams {
  chat_id: string;
  open_id: string;
  user_id?: string;
  email?: string;
  card?: string;
}

export interface ISendMessage {
  sendMessage: (params: ISendMessageParams) => Promise<AxiosResponse<any, any>>;
  sendPrivateMessage: (params: ISendPrivateMessageParams) => Promise<any>;
}

export interface IUploadImgParams {
  image: string;
  image_type?: string;
}

export interface IManageImg {
  uploadImg: (params: IUploadImgParams) => Promise<AxiosResponse<any, any>>;
}
