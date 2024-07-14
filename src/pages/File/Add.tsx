import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { ProductAttachmentControllerCreate } from "@/services/swagger/ProductAttachmentControllerCreate";
import { ProductListControllerFindAll } from "@/services/swagger/ProductListControllerFindAll";
import {
  ModalForm,
  ModalFormProps,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";

interface IAdd extends ModalFormProps {
  onFinishCallBack?: () => void;
}
export default (props: IAdd) => {
  const { onFinishCallBack, ...modalForm } = props;
  const [form] = useForm();
  const onFinish = async (data) => {
    const { name, productList_id, url, order } = data;
    const urlAddress = getUrl(url[0]);
    if (urlAddress && name && productList_id) {
      const res = await ProductAttachmentControllerCreate({
        name,
        productList_id,
        url: urlAddress,
        order,
      });
      if (res.success) {
        onFinishCallBack && onFinishCallBack();
        return true;
      }
    }
    message.error("未知错误");
    return false;
  };
  //   useEffect(() => {
  //     form.resetFields();
  //   }, [form]);

  return (
    <ModalForm {...modalForm} width={1000} form={form} onFinish={onFinish}>
      <ProFormUploadButton
        rules={[{ required: true }]}
        name="url"
        label="资料上传"
        max={1}
        fieldProps={{
          ...getUploadProps(),
        }}
        onChange={({ file }) => {
          form.setFieldValue(["name"], file.name);
        }}
      />
      <ProFormText
        rules={[{ required: true }]}
        label={"资料名称"}
        name={"name"}
        placeholder={"上传文件后会自动识别文件名称"}
      />
      <ProFormDigit label={"顺序(越大越靠前)"} name={"order"} />
      <ProFormSelect
        rules={[{ required: true }]}
        label={"资料所属产品"}
        name={"productList_id"}
        showSearch={true}
        request={async ({ keyWords }) => {
          const res = await ProductListControllerFindAll({
            title: keyWords,
          });
          if (res?.data?.list) {
            return res?.data?.list.map(({ title, _id }) => {
              return {
                label: title,
                value: _id,
              };
            });
          }

          return [];
        }}
      />
    </ModalForm>
  );
};
