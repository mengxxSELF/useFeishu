import axios from "axios";
import { UploadImgPath } from "../config/feishu";

/**
 * 上传图片
 * https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/im-v1/image/create
 */
export const uploadImg = async ({
  image,
  image_type = "message",
  tenant_access_token,
}: any) => {
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
