import { TypeControllerCreate } from "@/services/swagger/TypeControllerCreate";
import { TypeControllerFindAll } from "@/services/swagger/TypeControllerFindAll";
import { TypeControllerFindOne } from "@/services/swagger/TypeControllerFindOne";
import { TypeControllerUpdate } from "@/services/swagger/TypeControllerUpdate";
import {
  ModalForm,
  ModalFormProps,
  ProFormDigit,
  ProFormSelect,
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
    const { title, parent, order } = data;
    const body = {
      ...(title ? { title } : {}),
      ...(parent ? { parent } : {}),
      ...(order ? { order } : {}),
    };
    if (title || parent) {
      const res = await new Promise(async (resolve) => {
        if (_id) {
          const res = await TypeControllerUpdate(
            {
              _id,
            },
            body
          );
          resolve(res);
        } else {
          const res = await TypeControllerCreate(body);
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
      TypeControllerFindOne({ _id }).then((res) => {
        const {
          data: { title, parent, order },
        } = res;
        if (title) {
          if (parent) {
            form.setFieldValue("parent", parent._id);
          }
          form.setFields([
            {
              name: "title",
              value: title,
            },
            {
              name: "order",
              value: order,
            },
          ]);
        }
      });
    }
  };
  return (
    <ModalForm
      width={500}
      form={form}
      onFinish={onFinish}
      onOpenChange={onOpenChange}
      {...modalForm}
    >
      <ProFormSelect
        rules={[{ required: false }]}
        label={"父级类型"}
        name={"parent"}
        showSearch
        debounceTime={400}
        request={(params) => {
          const { keyWords } = params;
          return TypeControllerFindAll({ title: keyWords }).then((res) => {
            return res?.data?.list?.map((item) => {
              return {
                label: item.title,
                value: item._id,
              };
            });
          });
        }}
        placeholder={"请搜索父级类型"}
      />
      <ProFormText
        rules={[{ required: true }]}
        label={"类型名称"}
        name={"title"}
        placeholder={"请输入类型名称"}
      />
      <ProFormDigit
        rules={[{ required: false }]}
        label="顺序"
        name="order"
        tooltip="越大越靠前"
        min={0}
        fieldProps={{ precision: 0 }}
      ></ProFormDigit>
    </ModalForm>
  );
};
