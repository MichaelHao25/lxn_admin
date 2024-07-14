import { LabelControllerCreate } from "@/services/swagger/LabelControllerCreate";
import { LabelControllerFindOne } from "@/services/swagger/LabelControllerFindOne";
import { LabelControllerUpdate } from "@/services/swagger/LabelControllerUpdate";
import {
  ModalForm,
  ModalFormProps,
  ProFormText,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useForm } from "antd/es/form/Form";

interface IAdd extends ModalFormProps {
  onFinishCallBack?: () => void;
  _id: string;
}
export default (props: IAdd) => {
  const { onFinishCallBack, _id, ...modalForm } = props;
  const [form] = useForm();
  const onFinish = async (data: unknown) => {
    const { title } = data;
    if (title) {
      const res = await new Promise(async (resolve) => {
        if (_id) {
          const res = await LabelControllerUpdate(
            {
              _id,
            },
            { title }
          );
          resolve(res);
        } else {
          const res = await LabelControllerCreate({
            title,
          });
          resolve(res);
        }
      });
      if (res.success) {
        onFinishCallBack && onFinishCallBack();
        return true;
      }
    }
    message.error("未知错误");
    return false;
  };
  const onOpenChange: ModalFormProps["onOpenChange"] = (visible) => {
    if (visible) {
      form.resetFields();
    }
    if (visible && _id) {
      LabelControllerFindOne({ _id }).then((res) => {
        const {
          data: { title },
        } = res;
        if (title) {
          form.setFields([
            {
              name: "title",
              value: title,
            },
          ]);
        }
      });
    }
  };
  return (
    <ModalForm
      width={300}
      form={form}
      onFinish={onFinish}
      onOpenChange={onOpenChange}
      {...modalForm}
    >
      <ProFormText
        rules={[{ required: true }]}
        label={"标签名称"}
        name={"title"}
        placeholder={"请输入标签名称"}
      />
    </ModalForm>
  );
};
