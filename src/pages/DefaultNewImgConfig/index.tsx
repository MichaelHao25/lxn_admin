import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { PageControllerCreate } from "@/services/swagger/PageControllerCreate";
import { PageControllerFindOne } from "@/services/swagger/PageControllerFindOne";
import {
  PageContainer,
  ProForm,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { useModel } from "@umijs/max";
import { Card, Modal, UploadFile } from "antd";
import { useForm } from "antd/es/form/Form";
import { RcFile } from "antd/es/upload";
import React, { useEffect, useState } from "react";
import { IGlobalConfig } from "../interface";
import { getBase64 } from "../Product/Add";

const SortComponent = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
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
  useEffect(() => {
    PageControllerFindOne({ type: IGlobalConfig.defaultNewImgConfig }).then(
      (res) => {
        if (res?.data?.indexShowType) {
          form.setFieldValue("defaultNewImage", [
            {
              uid: "1",
              name: res.data.defaultNewImage,
              status: "done",
              url: res.data.defaultNewImage,
            },
          ]);
        }
      }
    );
  }, []);
  const handleOnFinish = async (data) => {
    const { defaultNewImage } = data;
    if (defaultNewImage) {
      return PageControllerCreate({
        type: IGlobalConfig.defaultNewImgConfig,
        defaultNewImage: getUrl(defaultNewImage?.[0]),
      }).then((res) => {
        form.setFieldValue("defaultNewImgConfig", [
          {
            uid: "1",
            name: res.data.defaultNewImage,
            status: "done",
            url: res.data.defaultNewImage,
          },
        ]);
      });
    }
  };
  return (
    <div>
      <ProForm onFinish={handleOnFinish} form={form}>
        <ProFormUploadButton
          rules={[{ required: true }]}
          name="defaultNewImage"
          label="主图"
          max={1}
          fieldProps={{
            ...getUploadProps(),
            listType: "picture-card",
            onPreview: handlePreview,
          }}
        />
      </ProForm>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { initialState } = useModel("@@initialState");

  return (
    <PageContainer>
      <Card
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundImage:
            initialState?.settings?.navTheme === "realDark"
              ? "background-image: linear-gradient(75deg, #1A1B1F 0%, #191C1F 100%)"
              : "background-image: linear-gradient(75deg, #FBFDFF 0%, #F5F7FF 100%)",
        }}
      >
        <SortComponent />
      </Card>
    </PageContainer>
  );
};

export default Welcome;
