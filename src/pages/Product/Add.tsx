import { getUploadProps, getUrl } from "@/components/UploadWrapper";
import { LabelControllerFindAll } from "@/services/swagger/LabelControllerFindAll";
import { ProductControllerCreate } from "@/services/swagger/ProductControllerCreate";
import { ProductControllerFindOne } from "@/services/swagger/ProductControllerFindOne";
import { ProductControllerUpdate } from "@/services/swagger/ProductControllerUpdate";
import { TypeControllerFindAll } from "@/services/swagger/TypeControllerFindAll";
import {
  ModalForm,
  ModalFormProps,
  ProFormDateRangePicker,
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

export const getBase64 = (file: RcFile): Promise<string> =>
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
    const {
      title,
      description,
      mainPictureUrl,
      releaseDate,
      type,
      label,
      totalEpisodes,
      duration,
      videoDirection,
      authorizationInformation_property,
      authorizationInformation_firstLaunchPlatform,
      authorizationInformation_scope,
      authorizationInformation_monetizationMethods,
      pilotVideoAddress,
    } = data;
    const body = {
      mainPictureUrl: getUrl(mainPictureUrl[0]),
      releaseDate_start: releaseDate[0],
      releaseDate_end: releaseDate[1],
      type,
      label,
      totalEpisodes,
      duration,
      videoDirection,
      authorizationInformation_property,
      authorizationInformation_firstLaunchPlatform,
      authorizationInformation_scope,
      authorizationInformation_monetizationMethods,
      pilotVideoAddress,
      title,
      description,
    };

    const res = await new Promise(async (resolve) => {
      if (_id) {
        if (props.readonly !== true) {
          const res = await ProductControllerUpdate({ _id }, body);
          return resolve(res);
        } else {
          return resolve({ success: true });
        }
      } else {
        const res = await ProductControllerCreate(body);
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
    if (_id && visible) {
      ProductControllerFindOne({ _id }).then((res) => {
        console.log(res);
        // {
        //     "_id": "6693f2126a8475f32af36b5f",
        //     "title": "名称",
        //     "type": [
        //         "66937f6d23ac4ad37e09ea11"
        //     ],
        //     "label": [
        //         "6693634f298001d4e33a8740",
        //         "669362bad70d6e55db0abcde"
        //     ],
        //     "mainPictureUrl": "http://tb-service.oss-cn-zhangjiakou.aliyuncs.com/f6c92326b2c58863e867a0fa2046d6ab.png",
        //     "description": "描述",
        //     "totalEpisodes": 11,
        //     "duration": 1,
        //     "videoDirection": "视频方向",
        //     "authorizationInformation_property": "独家",
        //     "authorizationInformation_firstLaunchPlatform": 11,
        //     "authorizationInformation_scope": "中国大陆",
        //     "authorizationInformation_monetizationMethods": "仅用于付费短剧",
        //     "pilotVideoAddress": "http://tb-service.oss-cn-zhangjiakou.aliyuncs.com/f6c92326b2c58863e867a0fa2046d6ab.png",
        //     "updatedAt": "2024-07-14T15:43:14.109Z"
        // }
        const { success, data } = res;
        if (success && data) {
          const {
            mainPictureUrl,
            releaseDate_start,
            releaseDate_end,
            type,
            label,
            totalEpisodes,
            duration,
            videoDirection,
            authorizationInformation_property,
            authorizationInformation_firstLaunchPlatform,
            authorizationInformation_scope,
            authorizationInformation_monetizationMethods,
            pilotVideoAddress,
            title,
            description,
          } = data;

          setInitialValues({
            title,
            releaseDate: [releaseDate_start, releaseDate_end],
            type: type.map((item) => {
              return { label: item.title, value: item._id };
            }),
            label: label.map((item) => {
              return { label: item.title, value: item._id };
            }),
            totalEpisodes,
            duration,
            videoDirection,
            authorizationInformation_property,
            authorizationInformation_firstLaunchPlatform,
            authorizationInformation_scope,
            authorizationInformation_monetizationMethods,
            pilotVideoAddress,
            mainPictureUrl: [
              {
                uid: "1",
                name: mainPictureUrl,
                status: "done",
                url: mainPictureUrl,
              },
            ],
            description,
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
      <ProFormText rules={[{ required: true }]} label={"名称"} name={"title"} />
      <ProFormSelect
        rules={[{ required: true }]}
        label={"类型"}
        name={"type"}
        debounceTime={400}
        showSearch
        fieldProps={{
          mode: "multiple",
        }}
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
        rules={[{ required: true }]}
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
        rules={[{ required: true }]}
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
        rules={[{ required: true }]}
        label="描述"
        name="description"
      />
      {/* <ProFormTextArea
        rules={[{ required: true }]}
        required
        label="详情"
        name="details"
      >
        <HtmlEditor key="details" readonly={props.readonly} />
      </ProFormTextArea> */}
      <ProFormDateRangePicker
        rules={[{ required: true }]}
        required
        label="上线时间"
        name="releaseDate"
      ></ProFormDateRangePicker>
      <ProFormDigit
        rules={[{ required: true }]}
        required
        label="总集数"
        name="totalEpisodes"
        min={0}
        fieldProps={{ precision: 0 }}
      ></ProFormDigit>
      <ProFormDigit
        rules={[{ required: true }]}
        required
        label="时长"
        name="duration"
        min={0}
        fieldProps={{ precision: 0 }}
      ></ProFormDigit>
      <ProFormText
        rules={[{ required: true }]}
        label="视频方向"
        name={"videoDirection"}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        label="授权信息 - 授权性质"
        name={"authorizationInformation_property"}
        valueEnum={{
          独家: "独家",
          非独家: "非独家",
          不限: "不限",
        }}
      />
      <ProFormDigit
        rules={[{ required: true }]}
        min={0}
        fieldProps={{ precision: 0 }}
        label="授权信息 -- 首发平台"
        name={"authorizationInformation_firstLaunchPlatform"}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        label="授权信息 -- 范围"
        name={"authorizationInformation_scope"}
        valueEnum={{
          中国大陆: "中国大陆",
          "海外（含港澳台）": "海外（含港澳台）",
          全球: "全球",
          不限: "不限",
        }}
      />
      <ProFormSelect
        rules={[{ required: true }]}
        label="授权信息 --变现方式"
        name={"authorizationInformation_monetizationMethods"}
        valueEnum={{
          仅用于付费短剧: "仅用于付费短剧",
          仅用于免费短剧: "仅用于免费短剧",
          不限: "不限",
        }}
      />
      <ProFormText
        rules={[{ required: true }]}
        label="试看地址"
        name={"pilotVideoAddress"}
      />

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
