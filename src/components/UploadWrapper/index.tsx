import { address } from "@/runtime";
import getToken from "@/utils/getToken";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, UploadProps, message } from "antd";
export const getUrl = (item: any) => {
  const url = item?.response?.data?.[0]?.url || item?.url;
  if (url) {
    return url;
  }
  return undefined;
};
export const getUploadProps = (): UploadProps => {
  const props: UploadProps = {
    name: "file",
    action: `${address}/api/v1/upload`,
    headers: {},
    onChange(info) {
      //   if (info.file.status !== "uploading") {
      //     console.log(info.file, info.fileList);
      //   }
      if (info.file.status === "done") {
        message.success(`${info.file.name} 上传成功！`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} 上传失败.`);
      }
    },
  };
  const token = getToken();

  if (props.headers) {
    props.headers[token.key] = token.value;
  }

  return props;
};
export default () => {
  return (
    <Upload {...getUploadProps()}>
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </Upload>
  );
};
