import { IGetToken, ISendMessage, IManageImg, ISendMessageParams, ISendPrivateMessageParams, IUploadImgParams } from "./interface";
declare class UseFeishu implements IGetToken, ISendMessage, IManageImg {
    private appId;
    private appSecret;
    private TenantAccessToken;
    private AppAccessToken;
    constructor(appId: string, appSecret: string);
    getTenantAccessToken(): Promise<{
        tenant_access_token: any;
        expire: any;
    }>;
    getAppAccessToken(): Promise<{
        app_access_token: string;
        expire: any;
    }>;
    sendMessage({ receive_id_type, receive_id, content, msg_type, }: ISendMessageParams): Promise<import("axios").AxiosResponse<any, any>>;
    sendPrivateMessage({ chat_id, open_id, user_id, email, card, }: ISendPrivateMessageParams): Promise<void>;
    uploadImg({ image, image_type }: IUploadImgParams): Promise<import("axios").AxiosResponse<any, any>>;
}
export default UseFeishu;
