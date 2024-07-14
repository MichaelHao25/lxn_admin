import HtmlEditor from "@/components/HtmlEditor";
import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { NewsListControllerCreate } from "@/services/swagger/NewsListControllerCreate";
import { NewsListControllerFindOne } from "@/services/swagger/NewsListControllerFindOne";
import { NewsListControllerUpdate } from "@/services/swagger/NewsListControllerUpdate";
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
import { useEffect, useState } from "react";

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
  const onFinish = async (res) => {
    const {
      detailsPicture,
      description,
      details,
      mainPicture,
      title,
      typeId,
      order,
    } = res;
    const mainPictureUrl = getUrl(mainPicture[0]);
    const detailsPictureUrl = getUrl(detailsPicture[0]);
    if (detailsPictureUrl && mainPictureUrl) {
      const res = await new Promise(async (resolve) => {
        const body = {
          description,
          details,
          title,
          typeId,
          mainPicture: mainPictureUrl,
          detailsPicture: detailsPictureUrl,
          order,
        };
        if (_id) {
          if (props.readonly !== true) {
            const res = await NewsListControllerUpdate({ _id }, body);
            return resolve(res);
          } else {
            return resolve({ success: true });
          }
        } else {
          const res = await NewsListControllerCreate(body);
          return resolve(res);
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
    if (_id && visible) {
      NewsListControllerFindOne({ _id }).then((res) => {
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
            detailsPicture,
            mainPicture,
            title,
            typeId,
            description,
            details,
            order,
          } = data;
          console.log("details111", details);

          setInitialValues({
            title,
            typeId,
            detailsPicture: [
              {
                uid: "t1",
                name: detailsPicture,
                status: "done",
                url: detailsPicture,
              },
            ],
            mainPicture: [
              {
                uid: "1",
                name: mainPicture,
                status: "done",
                url: mainPicture,
              },
            ],
            description,
            details,
            order,
          });
        }
        //   initialValues, setInitialValues
      });
    }
  };
  useEffect(() => {
    form.resetFields();
  }, [initialValues, form]);

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
        label={"产品名称"}
        name={"title"}
      />
      <ProFormDigit label={"顺序(越大越靠前)"} name={"order"} />
      <ProFormSelect
        rules={[{ required: true }]}
        label={"产品类型"}
        name={"typeId"}
        showSearch
        options={typeList.map((item) => {
          return { value: item._id, label: item.typeName };
        })}
      />
      <ProFormUploadButton
        rules={[{ required: true }]}
        name="mainPicture"
        label="主图"
        max={1}
        fieldProps={{
          ...getUploadProps(),
          listType: "picture-card",
          onPreview: handlePreview,
        }}
      />
      <ProFormUploadButton
        rules={[{ required: true }]}
        name="detailsPicture"
        label="详情页顶图"
        max={1}
        fieldProps={{
          ...getUploadProps(),
          listType: "picture-card",
          onPreview: handlePreview,
        }}
      />
      <ProFormTextArea
        rules={[{ required: true }]}
        label="产品描述"
        name="description"
      />

      <ProFormTextArea
        rules={[{ required: true }]}
        required
        label="产品详情"
        name="details"
      >
        <HtmlEditor key="details" readonly={props.readonly} />
      </ProFormTextArea>

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
