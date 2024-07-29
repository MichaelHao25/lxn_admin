import HtmlEditor from "@/components/HtmlEditor";
import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { LabelControllerFindAll } from "@/services/swagger/LabelControllerFindAll";
import { NewsControllerCreate } from "@/services/swagger/NewsControllerCreate";
import { NewsControllerFindOne } from "@/services/swagger/NewsControllerFindOne";
import { NewsControllerUpdate } from "@/services/swagger/NewsControllerUpdate";
import { TypeControllerFindAll } from "@/services/swagger/TypeControllerFindAll";
import {
  ModalForm,
  ModalFormProps,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { Modal, UploadFile, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface IAdd extends ModalFormProps {
  onFinishCallBack?: () => void;
  _id?: string;
  typeList: { _id: string; typeName: string }[];
}
export default (props: IAdd) => {
  const { onFinishCallBack, _id, typeList = [], ...modalForm } = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [initialValues, setInitialValues] = useState({});
  const [form] = useForm();
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
  const onFinish = async (data) => {
    const { mainPictureUrl, type, label, ...attr } = data;

    const res = await new Promise(async (resolve) => {
      const body = {
        ...attr,
        type: typeof type === "object" ? type.value : type,
        label: label?.map((item) => {
          if (typeof item === "string") {
            return item;
          }
          return item.value;
        }),
        mainPictureUrl: mainPictureUrl
          ? getUrl(mainPictureUrl?.[0])
          : undefined,
      };
      if (_id) {
        if (props.readonly !== true) {
          const res = await NewsControllerUpdate({ _id }, body);
          return resolve(res);
        } else {
          return resolve({ success: true });
        }
      } else {
        const res = await NewsControllerCreate(body);
        return resolve(res);
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
    if (_id && visible) {
      NewsControllerFindOne({ _id }).then((res) => {
        console.log(res);
        // {
        //     "_id": "659a71a219a452c2745a6277",
        //     "typeId": "659582e4497348b515cfacb9",
        //     "title": "1111",
        //     "mainPicture": "http://127.0.0.1/api/v1/upload/659a719719a452c2745a6272",
        //     "banner": [
        //         "http://127.0.0.1/api/v1/upload/659a719a19a452c2745a6274"
        //     ],
        //     "description": "1",
        //     "details": "1",
        //     "updatedAt": "2024-01-07T09:40:50.482Z",
        //     "createdAt": "2024-01-07T09:40:50.482Z",
        //     "__v": 0
        // }
        const { success, data } = res;
        if (success && data) {
          const {
            mainPictureUrl,
            title,
            type,
            description,
            details,
            label,
            order,
          } = data;

          form.setFields([
            { name: "title", value: title },
            { name: "order", value: order },
            {
              name: "type",
              value: type ? { label: type.title, value: type._id } : undefined,
            },
            {
              name: "label",
              value: label.map((item) => {
                return { label: item.title, value: item._id };
              }),
            },
            {
              name: "mainPictureUrl",
              value: [
                {
                  uid: "1",
                  name: mainPictureUrl,
                  status: "done",
                  url: mainPictureUrl,
                },
              ],
            },
            { name: "description", value: description },
            { name: "details", value: details },
          ]);
        }
        //   initialValues, setInitialValues
      });
    }
  };
  //   useEffect(() => {
  //     form.resetFields();
  //   }, [initialValues, form]);

  return (
    <ModalForm
      {...modalForm}
      width={1000}
      form={form}
      onOpenChange={onOpenChange}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <ProFormText
        rules={[{ required: true }]}
        required
        label={"名称"}
        name={"title"}
      />
      <ProFormSelect
        rules={[{ required: false }]}
        label={"类型"}
        name={"type"}
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
      />
      <ProFormSelect
        rules={[{ required: false }]}
        label={"标签"}
        name={"label"}
        showSearch
        debounceTime={400}
        fieldProps={{
          mode: "multiple",
        }}
        request={(params) => {
          const { keyWords } = params;
          return LabelControllerFindAll({ title: keyWords }).then((res) => {
            return res?.data?.list?.map((item) => {
              return {
                label: item.title,
                value: item._id,
              };
            });
          });
        }}
      />
      <ProFormUploadButton
        rules={[{ required: false }]}
        name="mainPictureUrl"
        label="主图"
        max={1}
        fieldProps={{
          ...getUploadProps(),
          listType: "picture-card",
          onPreview: handlePreview,
        }}
      />
      <ProFormTextArea
        rules={[{ required: false }]}
        label="描述"
        name="description"
      />

      <ProFormTextArea
        rules={[{ required: false }]}
        label="详情"
        name="details"
      >
        <HtmlEditor key="details" readonly={props.readonly} />
      </ProFormTextArea>
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
