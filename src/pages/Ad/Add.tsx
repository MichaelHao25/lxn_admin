import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { AdControllerCreate } from "@/services/swagger/AdControllerCreate";
import { AdControllerFindOne } from "@/services/swagger/AdControllerFindOne";
import { AdControllerUpdate } from "@/services/swagger/AdControllerUpdate";
import {
  ModalForm,
  ModalFormProps,
  ProFormColorPicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { message, Modal, UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useState } from "react";
import { getBase64 } from "../Product/Add";
import { IAdType } from "./interface";

interface IAdd extends ModalFormProps {
  onFinishCallBack?: () => void;
  _id: string;
}
export default (props: IAdd) => {
  const { onFinishCallBack, _id, ...modalForm } = props;
  const [form] = useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleCancel = () => setPreviewOpen(false);

  const onFinish = async (data: unknown) => {
    const { pictureUrl, ...attr } = data;
    const body: Partial<API.CreateAdDto> = { ...attr };
    if (pictureUrl) {
      body.pictureUrl = getUrl(pictureUrl[0]);
    }

    const res = await new Promise(async (resolve) => {
      if (_id) {
        const res = await AdControllerUpdate(
          {
            _id,
          },
          body
        );
        resolve(res);
      } else {
        const res = await AdControllerCreate(body);
        resolve(res);
      }
    });
    if (res.success) {
      onFinishCallBack && onFinishCallBack();
      return true;
    }

    message.error("未知错误");
    return false;
  };
  const onOpenChange: ModalFormProps["onOpenChange"] = (visible) => {
    if (visible) {
      form.resetFields();
    }
    if (visible && _id) {
      AdControllerFindOne({ _id }).then((res) => {
        const {
          data: {
            backgroundColor,
            description,
            gotoUrl,
            pictureUrl,
            title,
            type,
            order,
          },
        } = res;
        form.setFields([
          {
            name: "description",
            value: description,
          },
          {
            name: "order",
            value: order,
          },
          {
            name: "type",
            value: type,
          },
          {
            name: "title",
            value: title,
          },
          {
            name: "backgroundColor",
            value: backgroundColor,
          },
          {
            name: "gotoUrl",
            value: gotoUrl,
          },
          {
            name: "pictureUrl",
            value: [
              {
                uid: "1",
                name: pictureUrl,
                status: "done",
                url: pictureUrl,
              },
            ],
          },
        ]);
      });
    }
  };
  return (
    <ModalForm
      width={1000}
      form={form}
      onFinish={onFinish}
      onOpenChange={onOpenChange}
      {...modalForm}
    >
      <ProFormSelect
        rules={[{ required: true }]}
        label={"类型"}
        name={"type"}
        placeholder={"请选择位置"}
        valueEnum={IAdType}
      />
      <ProFormUploadButton
        rules={[{ required: true }]}
        name="pictureUrl"
        label="主图"
        max={1}
        fieldProps={{
          ...getUploadProps(),
          listType: "picture-card",
          onPreview: handlePreview,
        }}
      />
      <ProFormText
        rules={[{ required: true }]}
        label={"标题"}
        name={"title"}
        placeholder={"请输入标题"}
      />
      <ProFormText
        rules={[{ required: true }]}
        label={"描述"}
        name={"description"}
        placeholder={"请输入描述"}
      />
      <ProFormText
        rules={[{ required: true }]}
        label={"跳转页面"}
        name={"gotoUrl"}
        placeholder={"跳转页面"}
      />
      <ProFormColorPicker
        rules={[{ required: true }]}
        name="backgroundColor"
        label="背景颜色"
      />
      <ProFormDigit
        rules={[{ required: false }]}
        label="顺序"
        name="order"
        tooltip="越大越靠前"
        min={0}
        fieldProps={{ precision: 0 }}
      ></ProFormDigit>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </ModalForm>
  );
};
