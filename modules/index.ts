import * as getToken from "./getToken";
import * as sendMessage from "./sendMessage";
import { IGetToken, ISendMessage } from './interface'

class UseFeishu implements IGetToken , ISendMessage {
  private appId: string;
  private appSecret: string;
  private TenantAccessToken: string;
  private AppAccessToken: string;

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;

    
    this.TenantAccessToken = ''
    this.AppAccessToken= ''
  }

  async getTenantAccessToken() {
    const { tenant_access_token, expire } = await getToken.getTenantToken({
      appId: this.appId,
      appSecret: this.appSecret,
    });

    this.TenantAccessToken = tenant_access_token;

    return  { tenant_access_token, expire }
  }

  async getAppAccessToken() {
    const { app_access_token, expire } = await getToken.getAppAccessToken({
      appId: this.appId,
      appSecret: this.appSecret,
    });

    this.AppAccessToken = app_access_token;

    return { app_access_token: this.AppAccessToken, expire }
  }

  async sendMessage({ receive_id_type, receive_id, content, msg_type }: any) {
    if (!this.TenantAccessToken) {
      await this.getTenantAccessToken();
    }

    return await sendMessage.sendMessage({
      receive_id_type,
      receive_id,
      content,
      msg_type,
      tenant_access_token: this.TenantAccessToken,
    });
  }

  async sendPrivateMessage({ chat_id, open_id, user_id, email, card }: any) {
    if (!this.TenantAccessToken) {
      await this.getTenantAccessToken();
    }
    return await sendMessage.sendPrivateMessage({
      tenant_access_token: this.TenantAccessToken,
      chat_id,
      open_id,
      user_id,
      email,
      card,
    });
  }
}

export default UseFeishu;
